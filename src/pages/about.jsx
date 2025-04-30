/* About.jsx */

import PageLayout from "../components/pageLayout";
import waving from "/public/waving.png"

function About() {
  return (
    <PageLayout title="About Me">
      <div className="about-header">
        <img src={waving} alt="Waving hello!" className="waving-img" />
      </div>
      <div className="bio-text">
        <p>
          As you may have gathered my name is Ariela, Ariela Yashinsky 
          to be proper. I graduated from Michigan State University in 2024 
          (Go Green!), where I earned my Bachelor of Science in Mathematics 
          with a minor in Computer Science. I came to MSU envisioning myself 
          as a math teacher, but in my academic pursuit developed a passion 
          for complex problem solving. My minor fluctuated from secondary 
          education to chemistry, until I finally decided my true calling: 
          Computer Science.
        </p>
        <p>
          During my time at MSU, I had the chance to fuel my passion for 
          teaching as an Undergraduate Learning Assistant after taking my
          favorite class ever – P-cubed, or Project & Practices in Physics.
          I had the privilege of joining the teaching team, where I not only
          deepened my love for physics but also made some of my best friends.
          In this role, I facilitated students in navigating complex physics
          problems and debugging 3D Python models. Twice a week, I helped my
          students break down challenges into digestible steps and 
          collaboratively develop strategies to solve them. This experience
          reinforced my passion for teaching and provided invaluable lessons
          in teamwork, problem-solving, and communication.
        </p>
        <p>
          I also had the privilege of working as an intern at Fermi National
          Accelerator Laboratory as part of the inaugural class of the URA
          Undergraduate Women in STEM program. Here, I had the opportunity 
          to receive mentorship from scientists and engineers, as well as 
          analyze simulated particle physics data using Python and C++. 
          My research focused on the Higgs Boson, specifically studying the
          self-coupling property of the Di-Higgs Boson by analyzing proton 
          collisions captured at the Large Hadron Collider (LHC) at CERN in 
          Geneva, Switzerland. As part of the program, I had the chance to 
          present my work to my colleagues and participate in a poster 
          symposium at Fermilab. I even had the opportunity to visit 
          Washington D.C. with my cohort and meet with staff from the 
          Department of Energy, the office of Illinois Senator Tammy 
          Duckworth, and the Executive Office of Science and Technology 
          Policy. It was an incredible experience to see firsthand how 
          coding and data analysis play a pivotal role in groundbreaking 
          scientific research.
        </p>
        <p>
          I’ve also delved into web development, where I built digital 
          storefronts using Liferay DXP, learning about Sales Engineering 
          as one of my first non-academic coding experiences. Through this 
          project, I gained hands-on experience using HTML, CSS, and 
          JavaScript to create dynamic and responsive websites that satisfied 
          real customer objectives. I learned how important it is to balance 
          functionality with user experience, and how thoughtful design 
          choices can make a big impact. Working within the Liferay platform 
          also taught me to adapt to new frameworks quickly and approach 
          development with a client-focused mindset. Wanting to deepen my 
          understanding of web development, I set out to build this website 
          as a way to learn React and to showcase my skills. I saw it as the 
          perfect opportunity to strengthen my front-end abilities while 
          creating a platform to market myself as I start my career in software 
          development. Teaching myself React gave me a deeper appreciation for 
          component-based design and state management, and building this 
          portfolio has allowed me to grow both technically and creatively. 
        </p>
        <p>
          Outside of coding, I’m an avid crafter and a proud Metro Detroit 
          native. I can often be found crocheting while watching something, 
          sitting at my desk staring deeply into my sewing machine, or 
          wandering around Downtown Detroit with my best friend. As a kid, 
          I was always drawn to making my own things, first sparking my interest 
          by hand-sewing plushies. I learned to sew and crochet to a more 
          advanced degree during the COVID-19 shutdown, driven by my desire to 
          prove I could create things on my own. During the peak of 2020, I even 
          started a small business selling handmade masks, making over 100 masks 
          for people all around my community. These days, I make all sorts of 
          things for myself, family, and friends — from crocheted hats to satin 
          lined purses — but one day I dream of having my own booth at a 
          farmers market :0).
        </p>
        <p>
          Aside from crafts, I love Detroit sports, playing video games, 
          mallard ducks, tiny trinkets, singing songs, connecting with 
          people, and about a million more things that I suppose I don’t 
          need to list here. I’m excited to find out what the next chapter 
          of life holds and to officially start my career. 
          If you’ve read this far, thank you so much for taking the time!
        </p>
      </div>
      
    </PageLayout>
  );
}

export default About;