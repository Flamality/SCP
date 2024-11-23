import React from "react";
import "./seriescard.css";
import { Link } from "react-router-dom";
function romanize(num) {
  var lookup = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    roman = "",
    i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
export default function SeriesCard({ series }) {
  return (
    <Link to={`/series/${series}`} className="series-card-link">
      <div className="series-card">
        <div className="series-card-header">
          <div className="series-card-roman-numeral">{romanize(series)}</div>
        </div>
        <div className="series-card-content">
          <h2 className="series-card-title">SERIES {series}</h2>
          <p className="series-card-description">{`SCP ${
            series == 1 ? "001" : (series - 1) * 1000
          } - ${series * 1000 - 1}`}</p>
        </div>
      </div>
    </Link>
  );
}
