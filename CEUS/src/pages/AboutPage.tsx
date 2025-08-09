'use client'
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRocket, FaUsers, FaGraduationCap, FaHeart, FaIndustry, FaLaptopCode, FaHandshake, FaTrophy } from 'react-icons/fa';

const AboutUsPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef.current, missionRef.current, servicesRef.current].forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/images/assets/Ceus_ball_group_edited.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
              <FaRocket className="text-3xl" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Welcome to CEUS
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              The vibrant student-run society within the School of Chemical Engineering at UNSW. 
              We bridge academia and industry, fostering a community of future engineering leaders.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/team"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Meet Our Team
            </Link>
            <Link
              href="/events"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Mission & Vision
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To empower UNSW Chemical Engineering and Chemical Product Engineering students by bridging the gap between academia and industry, fostering a supportive community, and providing opportunities for professional and personal development.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <FaTrophy className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To be the cornerstone of the student experience within the School of Chemical Engineering, recognized for cultivating skilled, industry-ready graduates and a connected, engaged student body.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section ref={servicesRef} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience CEUS through our diverse range of initiatives designed to enhance your university journey
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Industry Engagement */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FaIndustry className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Engagement</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Speed Networking Events</li>
                <li>• Site Tours & Tastings</li>
                <li>• Professional Photoshoots</li>
                <li>• Career Workshops</li>
              </ul>
            </div>

            {/* Academic Support */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Support</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Study With CEUS Sessions</li>
                <li>• Course-Specific Workshops</li>
                <li>• Exam Preparation Events</li>
                <li>• Peer Mentoring</li>
              </ul>
            </div>

            {/* Social Community */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Social Community</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Welcome Events & Trivia</li>
                <li>• Annual Balls & Parties</li>
                <li>• Outdoor Activities</li>
                <li>• Inter-Society Events</li>
              </ul>
            </div>

            {/* Welfare & Opportunities */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Welfare & Opportunities</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Community Initiatives</li>
                <li>• Leadership Roles</li>
                <li>• Subcommittee Positions</li>
                <li>• Camp Leadership</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Journey
              </h2>
              <div className="w-24 h-1 bg-blue-600 mb-8"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Established in 1961, CEUS has a rich history of serving students at UNSW. We have evolved into a key student body within the School of Chemical Engineering, consistently adapting to meet the changing needs of our members and the industry.
              </p>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">60+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">Events Per Year</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Why Join CEUS?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaHandshake className="text-blue-200 mr-3" />
                    <span>Career Headstart & Industry Exposure</span>
                  </div>
                  <div className="flex items-center">
                    <FaLaptopCode className="text-blue-200 mr-3" />
                    <span>Academic Excellence & Skill Development</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-blue-200 mr-3" />
                    <span>Vibrant Community & Lasting Friendships</span>
                  </div>
                  <div className="flex items-center">
                    <FaTrophy className="text-blue-200 mr-3" />
                    <span>Exclusive Opportunities & Resources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Be Part of CEUS?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join CEUS today and make the most of your time at UNSW's School of Chemical Engineering! 
            Connect, learn, grow, and have fun with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get In Touch
            </Link>
            <Link
              href="/events"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;
   