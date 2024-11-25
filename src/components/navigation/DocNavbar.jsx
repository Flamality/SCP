import React from "react";
import { Link } from "react-router-dom";
import scpIcon from "../../images/global/scp-icon.svg";
import "./Navbar.css";
export default function DocNavbar({ currentSCP }) {
  return (
    <div className="nav">
      <div className="docNav">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>Prev SCP</Link>
          </li>
          <li>
            <Link to={"/"}>Next SCP</Link>
          </li>
        </ul>
      </div>
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
