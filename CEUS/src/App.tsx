// src/App.tsx
//import React from 'react';    //error declared but never read therefore commented out
import { Routes, Route , Navigate} from 'react-router-dom'; // Import Routes/Route
import Header from './layouts/Header';
import Footer from './layouts/Footer';
// Import all page components
//import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import PublicationsPage from './pages/PublicationsPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage'
import SponsersPage from './pages/SponsersPage'
import NotFoundPage from './pages/NotFoundPage'
//  Create a NotFoundPage component later




// <Header /> 

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white"> 
     
      <main className="flex-grow"> {/* Let page components handle their own containers now */}
        <Routes> 
          <Route path="/" element={<NotFoundPage />} />  
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Team" element={<TeamPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/Sponsors" element={<SponsersPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* Use '/contact' or '/contactus' based on links */}
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* Optional todo : Catch-all route for 404 */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
}

export default App;