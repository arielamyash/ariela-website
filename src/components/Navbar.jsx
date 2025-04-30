/* Navbar.jsx */

import { Link, useLocation } from 'react-router-dom';

function Navbar () {
    const location = useLocation();
    const currentPath = location.pathname;
  
    const links = [];
  
    if (currentPath !== "/") {
      links.push(<Link key="home" to="/">Home</Link>);
    }
    if (currentPath !== "/about") {
      links.push(<Link key="about" to="/about">About</Link>);
    }
    if (currentPath !== "/projects") {
      links.push(<Link key="projects" to="/projects">Projects</Link>);
    }
    if (currentPath !== "/contact") {
      links.push(<Link key="contact" to="/contact">Contact</Link>);
    }
  
    links.push(
      <a 
        key="resume" 
        href="/ariela-website/Ariela_Yashinsky_Resume_Website.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Resume
      </a>
    );
  
    return (
      <nav>
        {links.map((link, index) => (
          <span key={index}>
            {index > 0 && " | "}
            {link}
          </span>
        ))}
      </nav>
    );
}

export default Navbar;

