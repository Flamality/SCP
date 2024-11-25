import React from "react";
import "./scpcard.css";
import { Link } from "react-router-dom";

export default function SCPCard({ scp, details }) {
  return (
    <div className="scp-card-wrapper">
      <Link
        to={`/scp/${details.scp_number.toString().padStart(3, "0")}`}
        className="scp-card-link"
      >
        <div className="scp-card">
          <h1 className="scp-card-title">{scp}</h1>
          <div className="scp-card-details">
            {details.containment_class && (
              <p className="scp-card-containment">
                <strong>Containment Class:</strong> {details.object_class}
              </p>
            )}
            {details.secondary_class && (
              <p className="scp-card-secondary">
                <strong>Secondary Class:</strong> {details.secondary_class}
              </p>
            )}
            {details.risk_class && (
              <p className="scp-card-risk">
                <strong>Risk Class:</strong> {details.risk_class}
              </p>
            )}
            {details.disruption_class && (
              <p className="scp-card-disruption">
                <strong>Disruption Class:</strong> {details.disruption_class}
              </p>
            )}
          </div>
          <p className="scp-card-series">Series: {details.series}</p>
        </div>
      </Link>
    </div>
  );
}
