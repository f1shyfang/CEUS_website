import React from 'react';
import { Link } from 'react-router-dom';

// ... (rest of the imports and component start) ...

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section (as before) */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-6">
            Welcome to CEUS
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed px-2 sm:px-0">
            The vibrant student-run society nestled within the School of Chemical Engineering at The University of New South Wales (UNSW). Our commitment extends beyond the academic realm, as we strive to mold well-rounded graduates by providing valuable insights into industry. Through collaborations, CEUS has established robust relationships with industry leaders.
          </p>
        </section>

        {/* Our Mission & Vision Section (as before, ensure this is tailored by CEUS) */}
        <section className="bg-white p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center sm:text-left">Our Mission & Vision</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower UNSW Chemical Engineering and Chemical Product Engineering students by bridging the gap between academia and industry, fostering a supportive community, and providing opportunities for professional and personal development.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the cornerstone of the student experience within the School of Chemical Engineering, recognized for cultivating skilled, industry-ready graduates and a connected, engaged student body. We aspire to create a legacy of support, innovation, and excellence.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section - UPDATED WITH SPECIFIC EXAMPLES */}
        <section className="bg-white p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center sm:text-left">What We Do: Experience CEUS</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            CEUS is dedicated to enhancing your university journey through a diverse range of initiatives. We frequently collaborate with other UNSW societies to bring you even bigger and better experiences! Here's a glimpse of what we offer:
          </p>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                <i className="fas fa-briefcase mr-2"></i> {/* Example Font Awesome Icon */}
                Industry Engagement & Careers
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Connecting you with industry professionals and preparing you for your future career:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
                <li><strong>Industry Insights:</strong> "CEUS Speed Networking," "Tooheys Site Tour & Tasting," and expert panel discussions like "What Is My Degree?".</li>
                <li><strong>Professional Development:</strong> "CEUS Professional Photoshoot" to get your perfect LinkedIn picture, plus workshops on resumes and interview skills.</li>
                <li><strong>Career Opportunities:</strong> We actively promote internships and graduate roles from our industry partners.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-green-600 mb-3">
                <i className="fas fa-graduation-cap mr-2"></i>
                Academic & Skill Development
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Supporting your studies and helping you build essential technical skills:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
                <li><strong>Study Support:</strong> Regular "Study With CEUS" sessions and "Revise and Revitalise" events before exams.</li>
                <li><strong>Course-Specific Aid:</strong> Events like "DESN1000 Pizza Wrap-Up" to help you through core subjects.</li>
                
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-yellow-600 mb-3">
                <i className="fas fa-users mr-2"></i>
                Social & Community Building
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Fostering a vibrant and inclusive community through fun and engaging events:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
                <li><strong>Welcome Events:</strong> "Pizza Welcome Lunch" and "O-Week Trivia Night" to kickstart the semester.</li>
                <li><strong>Signature Socials:</strong> The annual "CEUS x MATSOC x FSA x RESOC: The Celestial Bodies Ball," and exciting inter-society collaborations like the "Engineers and the Enchanted Expedition" Camp.</li>
                <li><strong>Casual Hangouts:</strong> "CEUS Goes Bouldering," "Sunset Beach Volleyball," "CEUS x FSA Coffee Crawl," "Coffee and Chill," and "CEUS Karaoke Night."</li>
                <li><strong>Collaborative Fun:</strong> Events like "Roundy Catch Up" and the "Tropical Cocktail Party" with multiple engineering societies.</li>
              </ul>
            </div>

             <div>
              <h3 className="text-2xl font-semibold text-purple-600 mb-3">
                <i className="fas fa-heartbeat mr-2"></i>
                Welfare, Operations & Opportunities
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Supporting your well-being and offering ways to get involved with the society:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
                <li><strong>Community Initiatives:</strong> Participating in events like "CEUS X RED BULL - 2025 Wings For Life World Run" and hosting stalls like the "EWB UNSW x CEUS - Embroidery Patch Stall."</li>
    
                <li><strong>Get Involved:</strong> Opportunities to shape CEUS through "Subcommittee Recruitment" and "Camp Leader EOI."</li>
              </ul>
            </div>
          </div>
        </section>

        
        {/* Optional: Our History Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center sm:text-left">Our Journey</h2>
          <p className="text-gray-600 leading-relaxed">
            Established in 1961, the Chemical Engineering Undergraduate Society (CEUS) has a rich history of serving students at UNSW. We have evolved into a key student body within the School of Chemical Engineering, consistently adapting to meet the changing needs of our members and the industry. We are proud of our alumni and the contributions CEUS has made to the student experience over the decades.
            {/* Add 1-2 specific milestones if known, e.g., "In [Year], we hosted our first major industry fair..." or "CEUS was awarded [Award Name] in [Year] for..." */}
          </p>
        </section>

        {/* Why Join CEUS? Section (already quite good, minor tweaks possible) */}
        <section className="bg-white p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center sm:text-left">Why Join CEUS?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Re-using the benefit cards from before, ensure text aligns with CEUS */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Career Headstart</h3>
              <p className="text-gray-600">
                Gain invaluable industry exposure, network with professionals, and access career development resources.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Academic Excellence</h3>
              <p className="text-gray-600">
                Enhance your understanding and skills through targeted academic support and technical workshops.
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-700 mb-2">Vibrant Community</h3>
              <p className="text-gray-600">
                Become part of a supportive network of Chemical Engineering students, make lasting friendships, and enjoy a balanced university life.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-700 mb-2">Exclusive Opportunities</h3>
              <p className="text-gray-600">
                Access member-only events, resources, merchandise, and potential discounts from our esteemed sponsors.
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Team Link Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Meet Our Dedicated Team</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            CEUS is driven by a passionate team of student volunteers from various year levels, committed to enhancing your experience at UNSW.
          </p>
          <Link
            to="/team" // Adjust this path if your team page URL is different
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            See The 2024/2025 Team
          </Link>
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-600 text-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Be Part of CEUS?</h2>
          <p className="text-lg leading-relaxed mb-6">
            Join CEUS today and make the most of your time at UNSW's School of Chemical Engineering! Connect, learn, grow, and have fun with us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/join" // Path to your membership/join page
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            >
              Become a Member
            </Link>
            <Link
              to="/events" // Path to your events page
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              View Upcoming Events
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;
   