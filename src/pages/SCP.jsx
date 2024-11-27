import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DocNavbar from "../components/navigation/DocNavbar";
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
        const rawContent = scpDetails?.raw_content;

        // Match the various ACS attributes
        const containmentClassMatch = rawContent.match(
          /<strong>(?:Object Class:|Containment Class:|Object Class)<\/strong>\s*:?(\s*.*?)<\/p>/
        );
        const clearanceLevelMatch = rawContent.match(
          /<div class="acs-clear"><strong>Clearance Level (\d+):<\/strong>/
        );
        const secondaryClassMatch = rawContent.match(
          /<div class="acs-secondary">\s*<div class="acs-text"><span><strong>Secondary Class:<\/strong><\/span>\s*<span>(.*?)<\/span>/
        );
        const disruptionClassMatch = rawContent.match(
          /<div class="acs-disrupt">\s*<div class="acs-text"><strong>Disruption Class:<\/strong>\s*<span class="disruption-class-number">.*?<\/span>\/(.*?)<\/div>/
        );
        const riskClassMatch = rawContent.match(
          /<div class="acs-risk">\s*<div class="acs-text"><strong>Risk Class:<\/strong>\s*<span class="risk-class-number">.*?<\/span>\/(.*?)<\/div>/
        );

        setContainmentClass(
          containmentClassMatch
            ? containmentClassMatch[1].trim().toLowerCase()
            : "none"
        );
        setClearanceLevel(
          clearanceLevelMatch ? clearanceLevelMatch[1] : "none"
        );
        setSecondaryClass(
          secondaryClassMatch ? secondaryClassMatch[1].toLowerCase() : "none"
        );
        setDisruptionClass(
          disruptionClassMatch ? disruptionClassMatch[1].toLowerCase() : "none"
        );
        setRiskClass(riskClassMatch ? riskClassMatch[1].toLowerCase() : "none");
      }
    }
  }, [scpData, scp]);

  if (scpData === null) {
    return (
      <div>
        <DocNavbar currentSCP={scp} />
        <p className="loading-text">Loading SCP details...</p>
      </div>
    );
  }

  const scpDetails = scpData[`SCP-${scp}`];
  if (!scpDetails || !scpDetails.raw_content) {
    return (
      <div>
        <DocNavbar currentSCP={scp} />
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
    <DocNavbar currentSCP={scp} />
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
