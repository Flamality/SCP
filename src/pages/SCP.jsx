import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
export default function SCP() {
  const { scp } = useParams();
  const [scpData, setSCPData] = useState(null);
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
  if (scpData === null) {
    return (
      <div>
        <Navbar />
        <p>Loading SCP details...</p>
      </div>
    );
  }
  const scpDetails = scpData[`SCP-${scp}`];

  return (
    <div>
      <Navbar />

      <h1>SCP {scp}</h1>
      {scpDetails ? (
        <div>
          <h2>{scpDetails.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: scpDetails.raw_content }}></p>
        </div>
      ) : (
        <p>SCP not found.</p>
      )}
      <hr />
      {/* Add links to related SCPs */}
      {/* Add links to related SCP series */}
      {/* Add links to previous and next SCPs */}
      {/* Add comments to explain the code */}
    </div>
  );
}
