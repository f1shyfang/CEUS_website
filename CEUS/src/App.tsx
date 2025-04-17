import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
// import { Routes, Route } from 'react-router-dom'; // Will be uncommented in Phase 5
// Import page components later when needed

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white"> {/* Using flex to pin footer */}
      <Header />

      <main className="flex-grow container mx-auto p-4"> {/* Added container and padding */}
        {/* Page content will be rendered here by the router later */}
        {/* Placeholder for now: */}
        <h1 className="text-center text-2xl py-10">Page Content Goes Here</h1> 
        <p className="text-center">(This content will be replaced by page components like HomePage, AboutPage, etc. via routing)</p>
        
        {/* Example of using router later (Phase 5):
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* ... other routes ... }
        </Routes>
        */}
      </main>

      <Footer />
    </div>
  );
}

export default App;