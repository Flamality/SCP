import React from "react";
import Navbar from "../components/navigation/Navbar";
import HomeWarning from "../components/warning/HomeWarning";
import SeriesCard from "../components/cards/series/SeriesCard";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomeWarning />
      <div id="series-cards">
        <SeriesCard series={1} />
        <SeriesCard series={2} />
        <SeriesCard series={3} />
        <SeriesCard series={4} />
      </div>
    </div>
  );
}
