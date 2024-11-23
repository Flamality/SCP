import React from "react";
import { Link } from "react-router-dom";
import scpIcon from "../../images/global/scp-icon.svg";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav">
      <Link to="/">
        <header>
          <img src={scpIcon} alt="SCP Logo" />
          <section>
            <h1>
              SCP Foundation <span class="database-label">DATABASE Y</span>
            </h1>
            <p>Secure, Contain, Protect</p>
          </section>
        </header>
      </Link>
    </div>
  );
}
