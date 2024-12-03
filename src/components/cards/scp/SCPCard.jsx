import React from "react";
import "./scpcard.css";
import { Link } from "react-router-dom";

export default function SCPCard({ scp, details }) {
  const {
    scp_number,
    containment_class,
    secondary_class,
    risk_class,
    disruption_class,
    series,
    object_class,
  } = details;

  return (
    <div className="scp-card-wrapper">
      <Link
        to={`/scp/${scp_number.toString().padStart(3, "0")}`}
        className="scp-card-link"
        aria-label={`View details for SCP ${scp}`}
      >
        <div className="scp-card">
          <h1 className="scp-card-title">{scp}</h1>
          <div className="scp-card-details">
            {containment_class && (
              <p className="scp-card-containment">
                <strong>Containment Class:</strong> {object_class}
              </p>
            )}
            {secondary_class && (
              <p className="scp-card-secondary">
                <strong>Secondary Class:</strong> {secondary_class}
              </p>
            )}
            {risk_class && (
              <p className="scp-card-risk">
                <strong>Risk Class:</strong> {risk_class}
              </p>
            )}
            {disruption_class && (
              <p className="scp-card-disruption">
                <strong>Disruption Class:</strong> {disruption_class}
              </p>
            )}
          </div>
          <p className="scp-card-series">{series}</p>
        </div>
      </Link>
    </div>
  );
}
