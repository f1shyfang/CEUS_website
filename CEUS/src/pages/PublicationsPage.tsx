// src/pages/PublicationsPage.tsx
import React from 'react';

const PublicationsPage: React.FC = () => {
  return (
    // Main container for the page content
    <div className="publications-page">

      {/* --- Publication Header Section --- */}
      {/* Translating .PublicationHeader styles */}
      <section className="PublicationHeader text-center py-12 md:py-16 px-6 bg-gray-50">
        {/* Translating .publicationTitle h1 styles */}
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">
          Publications
        </h1>
        {/* Translating .publicationBlurb p styles */}
        <p className="publicationBlurb text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Dive into the CEUS Student and Career Handbooks—a must for all
          chemical engineering students!<br /> Packed with helpful tips, 
          practical insights, and tons of valuable info, these will 
          guide you throughout <br /> your academic and postgrad careers. 
          Ready to make your journey in chemical engineering a breeze?<br />
        </p>
      </section>

      {/* --- Big Document Container --- */}
      {/* Translating .BigDocContainer styles */}
      <section className="BigDocContainer container mx-auto px-6 py-10 flex flex-wrap justify-center gap-8 lg:gap-12">

        {/* --- Student Handbook Section --- */}
        {/* Translating .StudentHandbookContain */}
        <section id="section1" className="StudentHandbookContain flex flex-col items-center">
           {/* Translating .StuHandTit */}
          <h2 className="StuHandTit text-2xl font-semibold mb-4 text-gray-700">
            Student Handbook
          </h2>
           {/* Translating .download-button */}
          <div className="download-button mb-4">
            <a 
              href="https://drive.google.com/file/d/1hL5kVOKKlCutbcbejMFE8ao5ylMuqWqj/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded transition duration-200"
            >
              Alternate Link
            </a>
          </div>
           {/* Translating .stuhand (adding margin) & PDF embed */}
          <div className="stuhand mt-2">
            {/* NOTE: PDF paths MUST be relative to the public folder */}
            <object
              data='/Student Handbook 2023.pdf' // Path from public folder
              type="application/pdf"
              width="500"
              height="678"
              aria-label="Student Handbook PDF Embed" // Accessibility
            >
              <iframe
                src='/Student Handbook 2023.pdf' // Path from public folder
                width="500"
                height="678"
                title="Student Handbook PDF Viewer" // Accessibility
              >
                <p className="p-4 bg-red-100 text-red-700">This browser does not support PDF embedding!</p>
              </iframe>
            </object>
          </div>
        </section>

        {/* --- Careers Handbook Section --- */}
         {/* Translating .CareerHandbookContain */}
        <section id="section2" className="CareerHandbookContain flex flex-col items-center">
           {/* Translating .CarHandTit */}
          <h2 className="CarHandTit text-2xl font-semibold mb-4 text-gray-700">
            Careers Handbook
          </h2>
           {/* Translating .download-button */}
          <div className="download-button mb-4">
            <a 
              href="https://drive.google.com/file/d/1aD-fqH9IADhLh9yeuZzlnBpjwmNS0Scs/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded transition duration-200"
            >
              Alternate Link
            </a>
          </div>
          {/* Translating .carhand (adding margin) & PDF embed */}
          <div className="carhand mt-2">
             {/* NOTE: PDF paths MUST be relative to the public folder */}
            <object
              data='/Careers Handbook 2023.pdf' // Path from public folder
              type="application/pdf"
              width="500"
              height="678"
              aria-label="Careers Handbook PDF Embed" // Accessibility
            >
              <iframe
                src='/Careers Handbook 2023.pdf' // Path from public folder
                width="500"
                height="678"
                title="Careers Handbook PDF Viewer" // Accessibility
              >
                <p className="p-4 bg-red-100 text-red-700">This browser does not support PDF embedding!</p>
              </iframe>
            </object>
          </div>
        </section>
      </section>

      {/* --- Disclaimer Section --- */}
       {/* Translating .Disclaimer styles */}
      <div className="Disclaimer max-w-4xl mx-auto px-6 py-8 text-gray-600">
         {/* Translating .DisclaimerTitle */}
        <h3 className="DisclaimerTitle text-xl font-medium mb-3">
          Disclaimer
        </h3>
         {/* Translating .DisclaimerBlurb */}
        <div className="DisclaimerBlurb text-xs leading-relaxed"> 
          <p>
            Please note, whilst all due care has been taken in collecting this information and
            ensuring that the material is correct at the time of publishing, it is still based primarily
            on collective experiences and may be biased. Information obtained from public
            websites may change without notice. Course structures for future terms may change
            due to COVID or curriculum edits.
            The Chemical Engineering Undergraduate Society of UNSW takes no responsibility for
            any errors and any such reliance upon them.
            We suggest students planning their degree double check term availabilities and
            prerequisites on the UNSW website
          </p>
        </div>
      </div>

    </div> // End of publications-page div
  );
};

export default PublicationsPage;