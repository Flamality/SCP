import React from "react";
import { Link } from "react-router-dom";
import scpIcon from "../../images/global/scp-icon.svg";
import "./Navbar.css";
export default function DocNavbar({ currentSCP }) {
  return (
    <div className="nav-wrapper">
      <div className="docNav">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={`/scp/${(Number(currentSCP) - 1).toString().padStart(3, "0")}`}>{`Prev: SCP-${(Number(currentSCP) - 1).toString().padStart(3, "0")}`}</Link>
          </li>
          <li>
            <Link to={`/scp/${(Number(currentSCP) + 1).toString().padStart(3, "0")}`}>{`Next: SCP-${(Number(currentSCP) + 1).toString().padStart(3, "0")}`}</Link>
          </li>
        </ul>
      </div>
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
    </div>
  );
}
