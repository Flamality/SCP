import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import SCPCard from "../components/cards/scp/SCPCard";

export default function Series() {
  const { series } = useParams();
  const [scpData, setSCPData] = useState(null);
  const selectedSeries = series || 1;
  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/scp-data/scp-api/refs/heads/main/docs/data/scp/items/content_series-${selectedSeries}.json`
    )
      .then((response) => response.json())
      .then((data) => setSCPData(data))
      .catch((error) => console.error("Error:", error));
  }, [selectedSeries]);
  useEffect(() => {
    document.title = `Series - ${selectedSeries}`;
  }, []);
  return (
    <div className="seriesPage">
      <Navbar />
      <hr />
      <h1>Series {selectedSeries}</h1>
      <div className="scpCardContainer">
        {scpData ? (
          // Map over the SCP data and render an SCPCard for each SCP
          Object.entries(scpData).map(([scpID, scpDetails]) => (
            <SCPCard key={scpID} scp={scpID} details={scpDetails} />
          ))
        ) : (
          <p>Loading SCPs...</p> // Show a loading message while fetching data
        )}
      </div>
    </div>
  );
}
