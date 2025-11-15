import * as React from 'react';
import { Code, Palette, Zap, Award, GraduationCap, Globe, Briefcase } from 'lucide-react';
import { 
  FaJava, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaGitAlt, 
  FaFigma
} from 'react-icons/fa';
import { 
  SiTailwindcss, 
  SiSanity, 
  SiAstro,
  SiFirebase,
  SiNetlify,
  SiMysql
} from 'react-icons/si';
import { MdOutlineViewQuilt } from 'react-icons/md';
import { personalInfo } from '../data/portfolioData';

const About: React.FC = () => {
  // Updated skills with specific tech icons
  const allSkills = [
    { name: 'Java', icon: FaJava, color: 'text-orange-600' },
    { name: 'JavaFX', icon: Code, color: 'text-blue-600' },
    { name: 'HTML', icon: FaHtml5, color: 'text-orange-500' },
    { name: 'CSS', icon: FaCss3Alt, color: 'text-blue-500' },
    { name: 'Tailwind', icon: SiTailwindcss, color: 'text-cyan-500' },
    { name: 'JavaScript', icon: FaJs, color: 'text-yellow-500' },
    { name: 'TypeScript', icon: Code, color: 'text-blue-600' },
    { name: 'React', icon: FaReact, color: 'text-blue-400' },
    { name: 'Scene Builder', icon: MdOutlineViewQuilt, color: 'text-green-600' },
    { name: 'Git', icon: FaGitAlt, color: 'text-red-600' },
    { name: 'Sanity', icon: SiSanity, color: 'text-green-600'},
    { name: 'Astro', icon: SiAstro, color: 'text-purple-600' },
    { name: 'Figma', icon: FaFigma, color: 'text-pink-600' },
    { name: 'Firebase', icon: SiFirebase, color: 'text-orange-500' },
    { name: 'Netlify', icon: SiNetlify, color: 'text-teal-500' },
    { name: 'SQL', icon: SiMysql, color: 'text-blue-600' },
  ];

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...allSkills, ...allSkills];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {personalInfo.bio}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100" data-aos="fade-right" data-aos-delay="100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">My Journey</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  As a Computer Science student, I've discovered my passion for front-end development and creating projects that are more of an experience rather than just a product. My academic journey has provided me with a strong foundation in programming principles, computer science, and software development.
                </p>
                <p>
                  I've worked on various projects ranging from desktop applications using JavaFX to modern web applications with React, Astro, and Sanity. Each project has taught me valuable lessons about user interface design, API integration, cost effectiveness, and more.
                </p>
                <p>
                  Currently, I'm seeking intern and junior developer positions as well as freelance work to apply my skills in real-world scenarios and continue learning. I'm particularly interested in front-end development and user experience design.
                </p>
              </div>
            </div>
            

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100" data-aos="fade-left" data-aos-delay="100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What I Do</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Frontend Development</h4>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Desktop Applications</h4>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">UI/UX Design</h4>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Web Development</h4>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Freelance Projects</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seamless Skills Carousel */}
          <div className="mb-16" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h3>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden">
              <div className="w-full overflow-hidden">
                <div className="flex gap-8 animate-scroll min-w-max">
                  {duplicatedSkills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                      <div
                        key={`${skill.name}-${index}`}
                        className="flex flex-col items-center gap-3 min-w-[100px] flex-shrink-0 transition-transform duration-300"
                      >
                        <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center transition-shadow duration-300">
                          <IconComponent className={`w-8 h-8 ${skill.color}`} />
                        </div>
                        <span className="text-sm font-medium text-gray-700 text-center">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Gradient overlays for seamless effect */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/80 to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/80 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Education Section */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Education & Qualifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-100" data-aos="zoom-in" data-aos-delay="350">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Computer Science</h4>
                <p className="text-gray-600 text-sm">Undergraduate Student at DUTH</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-100" data-aos="zoom-in" data-aos-delay="400">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">C2 Proficiency</h4>
                <p className="text-gray-600 text-sm">Advanced English Language Skills</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-100" data-aos="zoom-in" data-aos-delay="450">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">High School Diploma</h4>
                <p className="text-gray-600 text-sm"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;