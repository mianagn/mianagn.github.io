import * as React from 'react';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("IRbkoeup4DNwWgLL4"); // Replace with your actual EmailJS public key

const SERVICE_ID = 'service_74qipbi';
const TEMPLATE_ID = 'template_273r6as';
const PUBLIC_KEY = 'IRbkoeup4DNwWgLL4'; 

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if EmailJS is properly configured
    if (TEMPLATE_ID === 'template_273r6as' || PUBLIC_KEY === 'IRbkoeup4DNwWgLL4') {
      alert('EmailJS is not configured. Please update the template ID and public key.');
      setIsSubmitting(false);
      return;
    }

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      },
      PUBLIC_KEY
    ).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
      },
      (error) => {
        console.log('FAILED...', error);
        alert('Failed to send message. Please try again later.');
        setIsSubmitting(false);
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    // You could add a toast notification here
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
              
              <div className="space-y-6 mb-8">
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors duration-300 group w-full text-left"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Email (Click to Copy)</p>
                    <p className="text-sm text-gray-600">{personalInfo.email}</p>
                  </div>
                </button>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-gray-600">{personalInfo.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-sm text-gray-600">{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a
                    href={personalInfo.social.github}
                    className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-900 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={personalInfo.social.linkedin}
                    className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={personalInfo.social.twitter}
                    className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-pink-600 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                    placeholder="Opportunity"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 resize-none"
                    placeholder="Tell me about the opportunity..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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