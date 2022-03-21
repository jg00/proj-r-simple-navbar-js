import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTwitter } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null); // for the div
  const linksRef = useRef(null); // for the ul

  // Technique - Dynamically adjust DOM element height - Idea is to use height of ul to adjust the height of the container
  // Also remember this is inline CSS and that is why we need to make sure to add set to important height: auto !important; in the CSS file.
  // We add !important in the index.css so that we are able to overwrite this "0px" in this inline settings below.
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    console.log(linksHeight);

    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" />
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>

        {/* 1 - IMPORTANT - this is conditional rendering and is being mounted/unmounted and so we cannot apply animation to slowly show nav list down. */}
        {/* {showLinks && (
          <div className="links-container show-container">
            <ul className="links">
              {links.map((link) => {
                const { id, url, text } = link;
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        )} */}

        {/* 2 - Solution to get animation is to dynamically set the class.  This component is already mounted. */}
        {/* <div
          className={`${
            showLinks ? "links-container show-container" : "links-container"
          }`}
        >
          <ul className="links">
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div> */}

        {/* 3 ISSUE - the height of the links-container does not change depending on the links.  It is hardcoded in CSS.
          .show-container 
            height: 10rem; ISSUE - HARDCODED 

            How do we dynamically update the height?  Well useRef() can give us access to that element.
        */}

        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="social-icons">
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
