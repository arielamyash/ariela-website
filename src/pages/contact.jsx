/* contact.jsx */

import PageLayout from "../components/pageLayout";
import "./contact.css";

function Contact() {
  return (
    <PageLayout title="Contact">
      <div className="contact-page">

        <p className="contact-text">
          I’m excited to connect about professional opportunities, collaborations, or projects.
          Feel free to reach out through email or connect with me on LinkedIn — I’m always excited
          to meet new people and chat!
        </p>

        <div className="computer-wrapper">
          <img
            src="/arielas_pc.png"
            alt="Let's Connect"
            className="computer-image"
          />

          <div className="screen-content">
            <a
              href="mailto:arielayashinsky@gmail.com"
              className="contact-card"
            >
              My Email
            </a>

            <a
              href="https://www.linkedin.com/in/ariela-yashinsky"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              My LinkedIn
            </a>
          </div>
        </div>

      </div>
    </PageLayout>
  )
}

export default Contact;
