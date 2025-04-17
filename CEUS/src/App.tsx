// src/App.tsx - TEMPORARY CHANGE FOR TESTING
import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import HomePage from './pages/HomePage'; // <-- Import HomePage

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white"> 
      <Header />
      <main className="flex-grow"> {/* Removed container/padding here, let HomePage handle it */}
        <HomePage /> {/* <-- Render HomePage directly */}
      </main>
      <Footer />
    </div>
  );
}
export default App;