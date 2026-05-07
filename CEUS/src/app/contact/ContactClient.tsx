'use client'
// src/app/contact/ContactClient.tsx
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { submitContactForm } from '../../lib/supabase';
import { cn } from '@/lib/utils';

const ContactClient: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Get in Touch</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            We&apos;d love to hear from you! Whether you have a question about our events, merch, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 text-2xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-700">Address</h3>
                  <p className="text-gray-600">K-F10, June Griffith, UNSW Sydney, High St, Kensington NSW 2052, Australia</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="text-blue-500 text-2xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-700">Email</h3>
                  <p className="text-gray-600 hover:text-blue-600 transition-colors">
                    <a href="mailto:ceus@unsw.edu.au">ceus@unsw.edu.au</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.9243864439327!2d151.2288773!3d-33.9173456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b18b76295deb%3A0x4a0d0172d71babf0!2sJune%20Griffith%20Building%20(F10)!5e0!3m2!1sen!2sau!4v1754220844152!5m2!1sen!2sau" 
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Google Maps Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <div>
                <button type="submit" disabled={isSubmitting} className={cn("w-full font-bold py-3 px-6 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700')}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                  <p className="font-bold">✓ Message sent successfully!</p>
                  <p className="text-sm">Thank you for contacting us. We&apos;ll get back to you shortly.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  <p className="font-bold">✗ Failed to send message</p>
                  <p className="text-sm">Please try again or email us directly at ceus@unsw.edu.au</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactClient;
