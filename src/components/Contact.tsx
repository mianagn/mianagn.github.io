import * as React from 'react';
import { useState, useEffect } from 'react';
import { Send, Clock, Shield } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { env, validateEnv, isUsingDefaultValues } from '../config/env';

// Initialize EmailJS with environment variables
emailjs.init(env.VITE_EMAILJS_PUBLIC_KEY);

const SERVICE_ID = env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = env.VITE_EMAILJS_TEMPLATE_ID; 

// Spam protection constants
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS = 3; // Max 3 submissions per 15 minutes
const COOLDOWN_TIME = 60; // 60 seconds cooldown between submissions
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 1000;

// Spam patterns to detect
const SPAM_PATTERNS = [
  /http[s]?:\/\/[^\s]+/gi, // URLs
  /[A-Z]{5,}/g, // Excessive caps
  /(.)\1{4,}/g, // Repeated characters
  /(.)\1{3,}/g, // 4+ repeated characters
  /(.)\1{2,}/g, // 3+ repeated characters
  /\b(viagra|casino|poker|lottery|winner|congratulations|click here|buy now|free money|earn money|make money|work from home|get rich|investment|loan|credit|debt|insurance|mortgage|refinance)\b/gi
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Load submission data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      const { submissionCount, lastSubmissionTime } = JSON.parse(savedData);
      setSubmissionCount(submissionCount || 0);
      setLastSubmissionTime(lastSubmissionTime || 0);
    }
  }, []);

  // Cooldown timer effect
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => {
        setCooldownTime(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  // Rate limiting check
  const canSubmit = () => {
    const now = Date.now();
    
    // Check cooldown
    if (cooldownTime > 0) {
      setErrorMessage(`Please wait ${cooldownTime} seconds before submitting again.`);
      return false;
    }
    
    // Check rate limit
    if (now - lastSubmissionTime < RATE_LIMIT_WINDOW) {
      if (submissionCount >= MAX_SUBMISSIONS) {
        const remainingTime = Math.ceil((RATE_LIMIT_WINDOW - (now - lastSubmissionTime)) / 60000);
        setErrorMessage(`Too many submissions. Please wait ${remainingTime} minutes before trying again.`);
        return false;
      }
    } else {
      // Reset counter if outside the window
      setSubmissionCount(0);
    }
    
    return true;
  };

  // Enhanced spam detection
  const isSpam = (data: typeof formData) => {
    // Check honeypot
    if (data.website) {
      console.log('Bot detected: Honeypot filled');
      return true;
    }
    
    // Check message length
    if (data.message.length < MIN_MESSAGE_LENGTH || data.message.length > MAX_MESSAGE_LENGTH) {
      setErrorMessage('Message must be between 10 and 1000 characters.');
      return true;
    }
    
    // Check for suspicious email patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      setErrorMessage('Please enter a valid email address.');
      return true;
    }
    
    // Check for disposable email domains
    const disposableDomains = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
      'mailinator.com', 'yopmail.com', 'temp-mail.org'
    ];
    const emailDomain = data.email.split('@')[1]?.toLowerCase();
    if (disposableDomains.includes(emailDomain)) {
      setErrorMessage('Please use a permanent email address.');
      return true;
    }
    
    // Check for spam patterns
    const textToCheck = `${data.name} ${data.subject} ${data.message}`.toLowerCase();
    const isSpamDetected = SPAM_PATTERNS.some(pattern => pattern.test(textToCheck));
    
    if (isSpamDetected) {
      console.log('Spam detected: Pattern match');
      setErrorMessage('Your message appears to be spam. Please write a genuine message.');
      return true;
    }
    
    // Check for excessive repetition
    const words = data.message.toLowerCase().split(/\s+/);
    const wordCounts: { [key: string]: number } = {};
    words.forEach(word => {
      if (word.length > 3) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
    
    const maxRepeatedWords = Math.max(...Object.values(wordCounts));
    if (maxRepeatedWords > 5) {
      console.log('Spam detected: Excessive word repetition');
      setErrorMessage('Your message contains too many repeated words.');
      return true;
    }
    
    // Check for suspicious timing (too fast typing)
    const typingSpeed = data.message.length / 10; // Rough estimate
    if (typingSpeed > 50) { // More than 50 chars per second
      console.log('Suspicious: Very fast typing detected');
      setErrorMessage('Please take your time writing your message.');
      return true;
    }
    
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Check if EmailJS is properly configured
    if (!validateEnv()) {
      setErrorMessage('EmailJS environment variables are missing. Please check your configuration.');
      return;
    }
    
    // Check if we're using the actual values (not the placeholder ones)
    if (env.VITE_EMAILJS_PUBLIC_KEY === 'IRbkoeup4DNwWgLL4' && 
        env.VITE_EMAILJS_SERVICE_ID === 'service_74qipbi' && 
        env.VITE_EMAILJS_TEMPLATE_ID === 'template_273r6as') {
      // These are the real values, so proceed
    } else if (isUsingDefaultValues()) {
      setErrorMessage('EmailJS is using default values. Please update your environment variables with actual EmailJS credentials.');
      return;
    }

    // Spam protection checks
    if (!canSubmit()) {
      return;
    }
    
    if (isSpam(formData)) {
      return;
    }

    setIsSubmitting(true);

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      },
      env.VITE_EMAILJS_PUBLIC_KEY
    ).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        
        // Update submission tracking
        const now = Date.now();
        const newSubmissionCount = submissionCount + 1;
        setSubmissionCount(newSubmissionCount);
        setLastSubmissionTime(now);
        setCooldownTime(COOLDOWN_TIME);
        
        // Save to localStorage
        localStorage.setItem('contactFormData', JSON.stringify({
          submissionCount: newSubmissionCount,
          lastSubmissionTime: now
        }));
        
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        setIsSubmitting(false);
      },
      (error) => {
        console.log('FAILED...', error);
        setErrorMessage('Failed to send message. Please try again later.');
        setIsSubmitting(false);
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I am currently open for Intern and Junior positions. Feel free to reach out!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                {/* Error message display */}
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    <span className="text-red-700">{errorMessage}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={50}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                    placeholder="Opportunity"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-gray-500">({formData.message.length}/{MAX_MESSAGE_LENGTH})</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={MAX_MESSAGE_LENGTH}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 resize-none"
                    placeholder="Tell me about the opportunity..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || cooldownTime > 0}
                  className={`w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    isSubmitting || cooldownTime > 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {cooldownTime > 0 ? (
                    <>
                      <Clock className="w-5 h-5" />
                      Wait {cooldownTime}s
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Send className="w-5 h-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;