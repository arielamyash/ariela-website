/* projects.jsx */

import { useNavigate } from 'react-router-dom';
import './Projects.css'; 
import fake_friends from "/public/fake_followers.jpg";

import higgs from "/public/higgs.jpg";

function Projects() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
      </div>
      <p className="projects-intro">
        Here's a collection of things I've made! I'll be adding more soon, so check back often. 
      </p>

      <div className="project-list">
        <div className="project-card" onClick={() => navigate('/fakefriends')}>
          <div className="project-image-placeholder">
            <img src={fake_friends} alt="Fake Instagram Friends" className="project-image" />
          </div>
          <div className="project-content">
            <h2>Fake Instagram Friends</h2>
            <p>
              Ever wondered who doesn't follow you back on Insta? Check out 
              my project to see for yourself!
            </p>
          </div>
        </div>

        <div className="project-card" onClick={() => navigate('/fermi_poster')}>
          <div className="project-image-placeholder">
            <img src={higgs} alt="Higgs Boson Drawing" className="project-image" />
          </div>
          <div className="project-content">
            <h2>Fermilab Research Poster</h2>
            <p>Learn about my physics research on Higgs Boson self-coupling, 
              presented at Fermilab during my internship.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;

