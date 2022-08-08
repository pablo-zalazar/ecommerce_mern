import React from "react";
import "../styles/footer.css";

import { Link } from "react-router-dom";
import { RiFacebookFill, RiTwitterFill, RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer>
      <div>
        <h3>Know us</h3>
        <Link to="#">About us</Link>
        <Link to="#">Blog</Link>
        <Link to="#">Work here</Link>
      </div>

      <div>
        <h3>Help</h3>
        <Link to="#">Buy</Link>
        <Link to="#">Sell</Link>
        <Link to="#">Problems</Link>
      </div>

      <div>
        <h3>Social media</h3>
        <Link to="#">
          <RiFacebookFill className="icon" />
          <p>Facebook</p>
        </Link>
        <Link to="#">
          <RiTwitterFill className="icon" />
          <p>Twitter</p>
        </Link>
        <Link to="#">
          <RiInstagramFill className="icon" />
          <p>Instagram</p>
        </Link>
      </div>
    </footer>
  );
}
