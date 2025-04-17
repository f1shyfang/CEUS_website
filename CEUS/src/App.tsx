import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css' // You might not need App.css anymore if all styles are utility classes

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Apply classes using the className attribute */}
      <div className="flex justify-center items-center space-x-4 p-4"> {/* Added flex layout classes too */}
        <a href="https://vite.dev" target="_blank">
          {/* You can add classes to the image too if needed */}
          <img src={viteLogo} className="logo h-24" alt="Vite logo" /> 
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react h-24" alt="React logo" /> 
        </a>
      </div>

      {/* Apply classes using the className attribute */}
      <h1 className="text-3xl font-bold text-center my-4 bg-blue-500 text-white p-4"> 
        Vite + React
      </h1>

      <div className="card text-center"> {/* Added text-center */}
        <button 
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded" // Basic Tailwind button styling
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4"> {/* Added margin-top */}
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-center text-gray-500 mt-8"> {/* Added text-center, color, margin */}
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App