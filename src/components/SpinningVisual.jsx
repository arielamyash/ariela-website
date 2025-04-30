/* SpinningVisual.jsx */

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SpinningVisual.css';

import center_swivel from "/public/center_swivel.png"
import spinner from "/public/spinner.png"

const SpinningVisual = () => {
  const [rotation, setRotation] = useState(0);
  const lastScrollY = useRef(0);
  const velocity = useRef(0);
  const animationFrame = useRef(null);
  const location = useLocation(); 

  useEffect(() => {
    

    // Handle scroll event
    const handleScroll = () => {
        
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current;
      velocity.current += delta * 0.15;
      lastScrollY.current = currentY;
    };

    // Animation loop for spinning effect
    const animate = () => {
      setRotation(prev => prev + velocity.current);
      velocity.current *= 0.9;
      animationFrame.current = requestAnimationFrame(animate);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    animationFrame.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrame.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Run once on mount

  useEffect(() => {
    // Reset scroll position when route changes
    window.scrollTo(0, 0);
  }, [location]);


  return (
    <div className="spinning-wrapper ${className}">
        <div className="spinning-background" style={{ transform: `rotate(${rotation}deg)` }}>
        <img src={spinner} alt="Spinning background" />
        </div>
        <div className="spinning-foreground">
        <img src={center_swivel} alt="Stationary foreground" />
        </div>
    </div>
  );
};

export default SpinningVisual;
