/* App.jsx */

import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from "framer-motion"; 
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';
import Contact from './pages/contact';
import './App.css'
import Navbar from './components/Navbar';
import FakeFriendsWidget from './pages/FakeFriendsWidget';
import YouTubePlayer from './components/YoutubePlayer';
import { PlayerProvider } from './PlayerContext';
import SpinnerPage from './pages/SpinnerPage'
import ScrollToTop from "./components/ScrollToTop";
import FermiPoster from './pages/fermi_poster';


function App() {
  const greetings = ["Hi", "Hello", "Hey", "Hi there", "Hola", 
   "Howdy", "Cheers", "Hellooo"];
  const [greeting, setGreeting] = useState("Hi");
  const location = useLocation();

  useEffect(() => {
    const pickNewGreeting = () => {
      const availableGreetings = greetings.filter(g => g !== greeting);
      const randomGreeting = availableGreetings[Math.floor(Math.random() * availableGreetings.length)];
      setGreeting(randomGreeting);
    };
  
    pickNewGreeting();
  }, [location]);


  
  return (
    <PlayerProvider>
      <div className='container'>
        <div className='Navbar'>
          <motion.h1
            key={greeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {greeting}, I'm Ariela!
          </motion.h1>
          <Navbar />
        </div>

        <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/fakefriends" element={<FakeFriendsWidget />} />
            <Route path='/fermi_poster' element={<FermiPoster />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/spinnerpage" element={<SpinnerPage />} />
          </Routes>

        
        <YouTubePlayer />
      </div>

    </PlayerProvider>
    
  );
}

export default App;

