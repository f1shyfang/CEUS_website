// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes/Route
import Header from './layouts/Header';
import Footer from './layouts/Footer';
// Import all page components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import PublicationsPage from './pages/PublicationsPage';
import ContactPage from './pages/ContactPage';
// Optional: Create a NotFoundPage component later

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white"> 
      <Header /> {/* Header remains outside Routes */}
      <main className="flex-grow"> {/* Let page components handle their own containers now */}
        <Routes> 
          <Route path="/" element={<HomePage />} /> 
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* Use '/contact' or '/contactus' based on links */}
          {/* Optional: Catch-all route for 404 */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      <Footer /> {/* Footer remains outside Routes */}
    </div>
  );
}

export default App;