import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import ACS from "../components/ACS/ACS";
import "./CSS/article.css";

export default function SCP() {
  const { scp } = useParams();
  const [scpData, setSCPData] = useState(null);
  const [containmentClass, setContainmentClass] = useState("none");
  const [clearanceLevel, setClearanceLevel] = useState("none");
  const [disruptionClass, setDisruptionClass] = useState("none");
  const [riskClass, setRiskClass] = useState("none");
  const [secondaryClass, setSecondaryClass] = useState("none");

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/scp-data/scp-api/refs/heads/main/docs/data/scp/items/content_series-${Math.floor(
        scp / 1000 + 1
      )}.json`
    )
      .then((response) => response.json())
      .then((data) => setSCPData(data))
      .catch((error) => console.error("Error:", error));
  }, [scp]);

  useEffect(() => {
    document.title = `SCP - ${scp}`;
  }, [scp]);

  useEffect(() => {
    if (scpData) {
      const scpDetails = scpData[`SCP-${scp}`];
      if (scpDetails) {
        const containmentClasses = [
          "safe",
          "euclid",
          "keter",
          "neutralized",
          "pending",
          "explained",
          "esoteric",
        ];
        const secondaryClasses = [
          "apollyon",
          "archon",
          "cernunnosed",
          "decommissioned",
          "hiemal",
          "tiamat",
          "ticonderoga",
          "thaumiel",
          "uncontained",
        ];
        const disruptionClasses = ["dark", "vlam", "keneq", "ekhi", "amida"];
        const riskClasses = [
          "notice",
          "caution",
          "warning",
          "danger",
          "critical",
        ];

        if (scpDetails.tags && scpDetails.tags.length > 0) {
          // Check for containment class
          const foundContainmentClass = containmentClasses.find((tag) =>
            scpDetails.tags.includes(tag)
          );
          if (foundContainmentClass) {
            setContainmentClass(foundContainmentClass);
          }

          // Check for secondary class
          const foundSecondaryClass = secondaryClasses.find((tag) =>
            scpDetails.tags.includes(tag)
          );
          if (foundSecondaryClass) {
            setSecondaryClass(foundSecondaryClass);
          }

          // Check for disruption class
          const foundDisruptionClass = disruptionClasses.find((tag) =>
            scpDetails.tags.includes(tag)
          );
          if (foundDisruptionClass) {
            setDisruptionClass(foundDisruptionClass);
          }

          // Check for risk class
          const foundRiskClass = riskClasses.find((tag) =>
            scpDetails.tags.includes(tag)
          );
          if (foundRiskClass) {
            setRiskClass(foundRiskClass);
          }
        }
      }
    }
  }, [scpData, scp]);

  if (scpData === null) {
    return (
      <div>
        <Navbar />
        <p className="loading-text">Loading SCP details...</p>
      </div>
    );
  }

  const scpDetails = scpData[`SCP-${scp}`];
  if (!scpDetails || !scpDetails.raw_content) {
    return (
      <div>
        <Navbar />
        <p className="page-error">Cannot find SCP article.</p>
        <footer>
          <a
            href={`/scp/${(Number(scp) - 1).toString().padStart(3, "0")}`}
            id="prev-article"
            className="prev-article"
          >
            {`SCP-${(Number(scp) - 1).toString().padStart(3, "0")}`}
          </a>
          <span id="current-article" className="current-article">
            {`SCP-${scp}`}
          </span>
          <a
            href={`/scp/${(Number(scp) + 1).toString().padStart(3, "0")}`}
            id="next-article"
            className="next-article"
          >
            {`SCP-${(Number(scp) + 1).toString().padStart(3, "0")}`}
          </a>
        </footer>
      </div>
    );
  }

  const modifiedContent = scpDetails?.raw_content
    .replace(/<p>.*?<strong>Item #:<\/strong>.*?<\/p>/g, "")
    .replace(/<span>.*?<strong>Item#:<\/strong>.*?<\/span>/g, "")
    .replace(/<p>.*?<strong>Object Class:<\/strong>.*?<\/p>/g, "")
    .replace(
      "<p><strong>Containment Procedures:</strong>",
      "<h2>Containment Procedures</h2>"
    )
    .replace("<p><strong>Description:</strong>", "<h2>Description</h2>")
    .replace(
      "<p><strong>Special Containment Procedures:</strong>",
      "<h2>Special Containment Procedures</h2>"
    )
    .replace("<p><strong>Reference:</strong>", "<h2>Reference</h2>");

  return (
    <div>
      <a
        href={`/scp/${(Number(scp) + 1).toString().padStart(3, "0")}`}
        id="prev-article"
        className="next-article"
      >
        {`SCP-${(Number(scp) + 1).toString().padStart(3, "0")}`}
      </a>
      <Navbar />
      <ACS
        SCP={scp}
        containmentClass={containmentClass}
        clearance={clearanceLevel}
        disruptionClass={disruptionClass}
        riskClass={riskClass}
        secondaryClass={secondaryClass}
      />
      {scpDetails ? (
        <div
          dangerouslySetInnerHTML={{ __html: modifiedContent }}
          className="article"
        ></div>
      ) : (
        <p className="page-error">SCP not found.</p>
      )}
      <p>{scpData[`SCP-${scp}`].tags}</p>
      <footer>
        <a
          href={`/scp/${(Number(scp) - 1).toString().padStart(3, "0")}`}
          id="prev-article"
          className="prev-article"
        >
          {`SCP-${(Number(scp) - 1).toString().padStart(3, "0")}`}
        </a>
        <span id="current-article" className="current-article">
          {`SCP-${scp}`}
        </span>
        <a
          href={`/scp/${(Number(scp) + 1).toString().padStart(3, "0")}`}
          id="next-article"
          className="next-article"
        >
          {`SCP-${(Number(scp) + 1).toString().padStart(3, "0")}`}
        </a>
      </footer>
    </div>
  );
}
