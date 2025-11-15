import * as React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { experiences } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My professional journey and key accomplishments
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100" data-aos="fade-up" data-aos-delay={index * 150}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {experience.position}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{experience.period}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {experience.description}
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    
  );
};

export default Experience;