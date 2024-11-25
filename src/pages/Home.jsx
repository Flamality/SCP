import React from "react";
import Navbar from "../components/navigation/Navbar";
import HomeWarning from "../components/warning/HomeWarning";
import SeriesCard from "../components/cards/series/SeriesCard";

export default function Home() {
  return (
    <div className="homePage">
      <Navbar />
      <HomeWarning />
      <div id="series-cards">
        <SeriesCard series={1} />
        <SeriesCard series={2} />
        <SeriesCard series={3} />
        <SeriesCard series={4} />
        <SeriesCard series={5} />
        <SeriesCard series={6} />
        <SeriesCard series={7} />
        <SeriesCard series={8} />
        <SeriesCard series={9.0} />
        <SeriesCard series={9.5} />
      </div>
    </div>
  );
}
