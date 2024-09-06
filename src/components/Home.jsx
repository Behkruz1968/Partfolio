import React from "react";
import { useSpring, animated } from "react-spring";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import {
  GITHUB_URL,
  LINKEDIN_URL,
} from "../constants";

export default function Home() {
  const logoSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
  });

  const iconSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 300, friction: 20 },
    delay: 300,
  });

  return (
    <div
      id="home"
      className="container mx-auto bg-lightDesert flex flex-col items-center justify-center min-h-screen"
    >
      <animated.img
        style={logoSpring}
        className="w-fit mb-4"
        src={'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230820/pdfresizer.com-pdf-resize_compressed_d1ofvd.jpg'}
        alt="Trumpet with tentacle logo"
      />

      <animated.div style={iconSpring} className="flex flex-col mt-2 space-x-6">
        <div className="flex mt-2 space-x-6">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={GITHUB_URL}
            className="text-darkDesert hover:text-goldDesert transition-colors duration-300"
          >
            <FaGithub className="w-10 h-10" />
            <span className="sr-only">GitHub account</span>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={LINKEDIN_URL}
            className="text-darkDesert hover:text-goldDesert transition-colors duration-300"
          >
            <FaLinkedin className="w-10 h-10" />
            <span className="sr-only">LinkedIn account</span>
          </a>
        </div>
      </animated.div>
    </div>
  );
}
