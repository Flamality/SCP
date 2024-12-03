import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DocNavbar from "../components/navigation/DocNavbar";
import ACS from "../components/ACS/ACS";
import "./CSS/article.css";

function convertWikidotToHTML(rawSource, filterList = []) {
  if (!rawSource) return "";

  const processNestedFormatting = (text) => {
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    text = text.replace(/__(.*?)__/g, "<u>$1</u>");
    text = text.replace(/\~\~(.*?)\~\~/g, "<del>$1</del>");
    text = text.replace(/\-\-(.*?)\-\-/g, "<del>$1</del>");
    text = text.replace(/\/\/(.*?)\/\//g, "<em>$1</em>");
    text = text.replace(/\=\=(.*?)\=\=/g, "<h3>$1</h3>");
    text = text.replace(/\-\-/, "<hr>");
    return text;
  };

  let lines = rawSource.split("\n");
  let htmlLines = [];
  let inCollapsible = false;
  let inParagraph = false;
  let inList = false;
  let listType = null;

  lines.forEach((line, index) => {
    line = line.trim();

    if (
      filterList.some((filter) =>
        line.toLowerCase().startsWith(filter.toLowerCase())
      )
    ) {
      return;
    }

    if (
      line.includes("[[footnoteblock]]") ||
      line.includes('[[div class="footer-wikiwalk-nav"]]') ||
      line.includes("[[include") ||
      line.includes("[[module Rate]]") ||
      line.startsWith("<<") ||
      line.startsWith(">>") ||
      line.includes("[[=]]") ||
      line === "[[/div]]" ||
      line === "[[/>]]" ||
      line === "[[/=]]" ||
      line === "[[>]]"
    ) {
      return;
    }

    if (line.startsWith("+ ")) {
      if (inParagraph) {
        htmlLines.push("</p>");
        inParagraph = false;
      }
      htmlLines.push(
        `<h2>${processNestedFormatting(line.slice(2).trim())}</h2>`
      );
    } else if (line.startsWith("++ ")) {
      if (inParagraph) {
        htmlLines.push("</p>");
        inParagraph = false;
      }
      htmlLines.push(
        `<h3>${processNestedFormatting(line.slice(3).trim())}</h3>`
      );
    } else if (line.startsWith("[[collapsible")) {
      const hideText = line.match(/hide="(.*?)"/)?.[1] || "Show";
      const showText = line.match(/show="(.*?)"/)?.[1] || "Hide";

      htmlLines.push(`
        <details>
          <summary data-hide="${hideText}" data-show="${showText}">
            ${hideText}
          </summary>
          <div class="collapsible-content">
      `);
      inCollapsible = true;
    } else if (line === "[[/collapsible]]") {
      htmlLines.push(`
          </div>
        </details>
      `);
      inCollapsible = false;
    } else if (line.startsWith("* ")) {
      if (!inList) {
        htmlLines.push("<ul>");
        inList = true;
        listType = "ul";
      }
      htmlLines.push(
        `<li>${processNestedFormatting(line.slice(2).trim())}</li>`
      );
    } else if (line.startsWith("# ")) {
      if (!inList || listType !== "ol") {
        if (inList) htmlLines.push("</ul>");
        htmlLines.push("<ol>");
        inList = true;
        listType = "ol";
      }
      htmlLines.push(
        `<li>${processNestedFormatting(line.slice(2).trim())}</li>`
      );
    } else if (inList && !line.startsWith("* ") && !line.startsWith("# ")) {
      htmlLines.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
      listType = null;
    } else if (line) {
      if (!inParagraph) {
        htmlLines.push("<p>");
        inParagraph = true;
      }
      htmlLines.push(processNestedFormatting(line));
    } else {
      if (inParagraph) {
        htmlLines.push("</p>");
        inParagraph = false;
      }
    }
  });

  if (inParagraph) htmlLines.push("</p>");
  if (inList) htmlLines.push(listType === "ul" ? "</ul>" : "</ol>");

  return htmlLines.join("\n");
}

export default function SCP() {
  const { scp } = useParams();
  const [scpData, setSCPData] = useState(null);
  const [containmentClass, setContainmentClass] = useState("none");
  const [clearanceLevel, setClearanceLevel] = useState("none");
  const [disruptionClass, setDisruptionClass] = useState("none");
  const [riskClass, setRiskClass] = useState("none");
  const [secondaryClass, setSecondaryClass] = useState("none");
  const [convertedContent, setConvertedContent] = useState("");

  useEffect(() => {
    const seriesNumber = Math.floor(scp / 1000) + 1;
    const url = `https://raw.githubusercontent.com/scp-data/scp-api/refs/heads/main/docs/data/scp/items/content_series-${seriesNumber}.json`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch SCP data.");
        return response.json();
      })
      .then((data) => {
        setSCPData(data);

        const filterList = [
          "**Object Class:",
          "**Containment Class:",
          "**Item #:",
        ];

        const scpDetails = data[`SCP-${scp}`];
        if (scpDetails?.raw_source) {
          const htmlContent = convertWikidotToHTML(
            scpDetails.raw_source,
            filterList
          );
          setConvertedContent(htmlContent);
        }
      })
      .catch((error) => console.error("Error fetching SCP data:", error));
  }, [scp]);

  useEffect(() => {
    document.title = `SCP - ${scp}`;
  }, [scp]);

  useEffect(() => {
    if (scpData) {
      const scpDetails = scpData[`SCP-${scp}`];
      if (scpDetails?.tags) {
        const classSets = {
          containmentClass: [
            "safe",
            "euclid",
            "keter",
            "neutralized",
            "pending",
            "explained",
            "esoteric",
          ],
          secondaryClass: [
            "apollyon",
            "archon",
            "cernunnosed",
            "decommissioned",
            "hiemal",
            "tiamat",
            "ticonderoga",
            "thaumiel",
            "uncontained",
          ],
          disruptionClass: ["dark", "vlam", "keneq", "ekhi", "amida"],
          riskClass: ["notice", "caution", "warning", "danger", "critical"],
        };

        const findClass = (classList, tags) =>
          classList.find((classItem) => tags.includes(classItem)) || "none";

        setContainmentClass(
          findClass(classSets.containmentClass, scpDetails.tags)
        );
        setSecondaryClass(findClass(classSets.secondaryClass, scpDetails.tags));
        setDisruptionClass(
          findClass(classSets.disruptionClass, scpDetails.tags)
        );
        setRiskClass(findClass(classSets.riskClass, scpDetails.tags));
      }
    }
  }, [scpData, scp]);

  useEffect(() => {
    const addCollapsibleToggle = () => {
      const summaries = document.querySelectorAll("details > summary");
      summaries.forEach((summary) => {
        summary.removeEventListener("click", handleSummaryClick);
        summary.addEventListener("click", handleSummaryClick);
      });
    };

    const handleSummaryClick = (e) => {
      const summary = e.currentTarget;
      const details = summary.closest("details");
      const hideText = summary.getAttribute("data-hide");
      const showText = summary.getAttribute("data-show");

      if (details.open) {
        summary.textContent = showText;
      } else {
        summary.textContent = hideText;
      }
    };

    if (convertedContent) {
      addCollapsibleToggle();
    }
  }, [convertedContent]);

  if (!scpData) {
    return (
      <div>
        <DocNavbar currentSCP={scp} />
        <p className="loading-text">Loading SCP details...</p>
      </div>
    );
  }

  const scpDetails = scpData[`SCP-${scp}`];
  if (!scpDetails || !scpDetails.raw_source) {
    return (
      <div>
        <DocNavbar currentSCP={scp} />
        <p className="page-error">Cannot find SCP article.</p>
        <FooterLinks scp={scp} />
      </div>
    );
  }

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
      <div
        dangerouslySetInnerHTML={{ __html: convertedContent }}
        className="article"
      ></div>
      <FooterLinks scp={scp} />
    </div>
  );
}

function FooterLinks({ scp }) {
  return (
    <footer>
      <Link
        to={`/scp/${(Number(scp) - 1).toString().padStart(3, "0")}`}
        id="prev-article"
        className="prev-article"
      >
        {`SCP-${(Number(scp) - 1).toString().padStart(3, "0")}`}
      </Link>
      <span id="current-article" className="current-article">
        {`SCP-${scp}`}
      </span>
      <Link
        to={`/scp/${(Number(scp) + 1).toString().padStart(3, "0")}`}
        id="next-article"
        className="next-article"
      >
        {`SCP-${(Number(scp) + 1).toString().padStart(3, "0")}`}
      </Link>
    </footer>
  );
}
