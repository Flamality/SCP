import React, { useEffect, useState } from "react";
import "./acs.css";
export default function ACS({
  SCP,
  clearance,
  containmentClass,
  secondaryClass,
  disruptionClass,
  riskClass,
}) {
  const [containmentclass, setcontainmentclass] = useState(containmentClass);
  const [secondaryclass, setsecondaryclass] = useState(secondaryClass);

  useEffect(() => {
    // Check if containmentClass is valid and update the state accordingly
    if (
      containmentClass !== "safe" &&
      containmentClass !== "euclid" &&
      containmentClass !== "keter" &&
      containmentClass !== "neutralized" &&
      containmentClass !== "pending" &&
      containmentClass !== "explained" &&
      containmentClass !== "esoteric" &&
      containmentClass !== "none"
    ) {
      setcontainmentclass("none");
      setsecondaryclass(secondaryClass);
      // Specific rewrites
      if (SCP === "066") {
        setcontainmentclass("euclid");
      }
      if (SCP === "091") {
        setcontainmentclass("safe");
      }
      if (SCP === "174") {
        setcontainmentclass("safe");
      }
      if (SCP === "179") {
        setcontainmentclass("safe");
        setsecondaryclass("thaumiel");
      }
      if (SCP === "196") {
        setcontainmentclass("euclid");
        setsecondaryclass("keter");
      }
      if (SCP === "286") {
        setcontainmentclass("euclid");
      }
      if (SCP === "296") {
        setcontainmentclass("safe");
      }
      if (SCP === "306") {
        setsecondaryclass("none");
      }
    } else {
      setcontainmentclass(containmentClass);
    }
  }, [containmentClass, SCP]);

  useEffect(() => {
    // Set the timeouts when the component mounts
    setTimeout(() => {
      document.getElementById("bar1").classList.add("barAnim");
    }, 0);

    setTimeout(() => {
      document.getElementById("bar2").classList.add("barAnim");
    }, 100);

    setTimeout(() => {
      document.getElementById("bar3").classList.add("barAnim");
    }, 200);

    setTimeout(() => {
      document.getElementById("bar4").classList.add("barAnim");
    }, 300);

    setTimeout(() => {
      document.getElementById("bar5").classList.add("barAnim");
    }, 400);

    setTimeout(() => {
      document.getElementById("bar6").classList.add("barAnim");
    }, 500);
  }, []);
  const getColorFromClass = (status) => {
    const classMap = {
      safe: "light-green",
      euclid: "light-yellow",
      keter: "light-red",
      esoteric: "light-purple",
      dark: "light-green",
      vlam: "light-blue",
      keneq: "light-yellow",
      ekhi: "light-ekhi",
      amida: "light-amida",
      notice: "light-green",
      caution: "light-blue",
      warning: "light-yellow",
      danger: "light-orange",
      critical: "light-red",
    };

    return classMap[status] || "";
  };
  const clearanceLabels = {
    1: "Unrestricted",
    2: "Restricted",
    3: "Confidential",
    4: "Secret",
    5: "Top Secret",
    6: "Cosmic Top Secret",
  };
  const getGridStyles = () => {
    if (
      containmentclass !== "none" &&
      secondaryclass !== "none" &&
      disruptionClass !== "none" &&
      riskClass !== "none"
    ) {
      // Everything is there
      return {};
    } else if (
      containmentclass !== "none" &&
      secondaryclass !== "none" &&
      disruptionClass === "none" &&
      riskClass === "none"
    ) {
      // Only Containment class and extra class
      return {
        containmentClassStyle: { gridArea: "containment / span 2" },
        secondaryClassStyle: { gridArea: "secondary / span 2" },
        classesStyle: {
          gridTemplateRows: "1fr 1fr",
          gridTemplateColumns: "1fr",
        },
      };
    } else if (
      containmentclass !== "none" &&
      secondaryclass === "none" &&
      disruptionClass === "none" &&
      riskClass === "none"
    ) {
      // Only Containment class
      return {
        containmentClassStyle: { gridArea: "containment / span 2" },
        classesStyle: { gridTemplateRows: "1fr" },
      };
    } else if (
      containmentclass !== "none" &&
      secondaryclass === "none" &&
      disruptionClass !== "none" &&
      riskClass !== "none"
    ) {
      // Containment, disruption, and risk classes
      return {
        containmentClassStyle: { gridArea: "containment / span 2" },
        classesStyle: {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        },
      };
    } else {
      console.log("No scenarios fit");
      return {};
    }
  };

  const { containmentClassStyle, secondaryClassStyle, classesStyle } =
    getGridStyles();
  return (
    <div id="acs">
      <div class="top-box">
        <div class="info">
          <h1 class="scpSubtext">SCP</h1>
          <h1 id="number">{SCP}</h1>
        </div>
        <div class="bars">
          <div
            id="bar1"
            style={
              clearance > 0
                ? { display: "block", backgroundColor: `var(--l${clearance})` }
                : { display: "none" }
            }
            class="bar"
          ></div>
          <div
            id="bar2"
            style={
              clearance > 1
                ? { display: "block", backgroundColor: `var(--l${clearance})` }
                : { display: "none" }
            }
            class="bar"
          ></div>
          <div
            id="bar3"
            style={
              clearance > 2
                ? { display: "block", backgroundColor: `var(--l${clearance})` }
                : { display: "none" }
            }
            class="bar"
          ></div>
          <div
            id="bar4"
            style={
              clearance > 3
                ? { display: "block", backgroundColor: `var(--l${clearance})` }
                : { display: "none" }
            }
            class="bar"
          ></div>
          <div
            id="bar5"
            style={
              clearance > 4
                ? { display: "block", backgroundColor: `var(--l${clearance})` }
                : { display: "none" }
            }
            class="bar"
          ></div>
          <div
            id="bar6"
            style={
              clearance > 5
                ? { display: "block", backgroundColor: `var(--l${clearance})` }
                : { display: "none" }
            }
            class="bar"
          ></div>
        </div>
        <div class="clearance">
          <h1
            id="clearance"
            style={clearance == "none" ? { display: "none" } : {}}
          >
            Level {clearance}
          </h1>
          <h2
            id="clearance-label"
            style={clearance == "none" ? { display: "none" } : {}}
            className={`l${clearance}`}
          >
            {clearanceLabels[clearance]}
          </h2>
        </div>
      </div>
      <hr class="thickhr" />
      <div class="classes" style={classesStyle}>
        <div
          id="cc"
          style={
            containmentclass == "none"
              ? { display: "none" }
              : {
                  backgroundColor: `var(--tr-${containmentclass})`,
                  ...containmentClassStyle,
                }
          }
          class="containment-class class"
        >
          <div
            id="ch-cc"
            style={{ backgroundColor: `var(--${containmentclass})` }}
            class="class-header"
          ></div>
          <div class="class-content">
            <h1 class="containment-title title">Containment class:</h1>
            <div class="desc-container">
              <h1 id="containment-desc" class="desc">
                {containmentclass.toUpperCase()}
              </h1>
              <div class={`icon-container ${containmentclass}`}>
                <img
                  id="containment-icon"
                  class="icon"
                  src={require(`../../images/ACS/${containmentclass}-icon.svg`)}
                />
              </div>
            </div>
          </div>
        </div>

        <hr
          id="cshr"
          style={
            containmentclass == "none"
              ? { display: "none" }
              : { display: "none" }
          }
          class="thickhr"
        />
        <div
          id="sc"
          style={
            secondaryclass == "none"
              ? { display: "none" }
              : {
                  backgroundColor: `var(--tr-secondary)`,
                  ...secondaryClassStyle,
                }
          }
          class="secondary-class class"
        >
          <div
            id="ch-sc"
            style={{ backgroundColor: `var(--secondary)` }}
            class="class-header"
          ></div>
          <div class="class-content">
            <h1 class="secondary-title title">Secondary class:</h1>
            <div class="desc-container">
              <h1 id="secondary-desc" class="desc">
                {secondaryclass.toUpperCase()}
              </h1>
              <div class="icon-container secondary">
                <img
                  id="secondary-icon"
                  class="icon"
                  src={require(`../../images/ACS/${secondaryclass}-icon.svg`)}
                />
              </div>
            </div>
          </div>
        </div>

        <hr
          id="schr"
          style={
            secondaryclass == "none" ? { display: "none" } : { display: "none" }
          }
          class="thickhr"
        />
        <div
          id="dc"
          style={
            disruptionClass == "none"
              ? { display: "none" }
              : { backgroundColor: `var(--tr-${disruptionClass})` }
          }
          class="disruption class"
        >
          <div
            id="ch-dc"
            style={{ backgroundColor: `var(--${disruptionClass})` }}
            class="class-header"
          ></div>
          <div class="class-content">
            <h1 class="disruption-title title">Disruption class:</h1>
            <div class="desc-container">
              <h1 id="disruption-desc" class="desc">
                {disruptionClass.toUpperCase()}
              </h1>
              <div class={`icon-container ${disruptionClass}`}>
                <img
                  id="disruption-icon"
                  src={require(`../../images/ACS/${disruptionClass}-icon.svg`)}
                  class="icon"
                />
              </div>
            </div>
          </div>
        </div>
        <hr
          id="dchr"
          style={
            disruptionClass == "none"
              ? { display: "none" }
              : { display: "none" }
          }
          class="thickhr"
        />
        <div
          id="rc"
          style={
            riskClass == "none"
              ? { display: "none" }
              : { backgroundColor: `var(--tr-${riskClass})` }
          }
          class="risk class"
        >
          <div
            id="ch-rc"
            style={{ backgroundColor: `var(--${riskClass})` }}
            class="class-header"
          ></div>
          <div class="class-content">
            <h1 class="risk-title title">Risk class:</h1>
            <div class="desc-container">
              <h1 id="risk-desc" class="desc">
                {riskClass.toUpperCase()}
              </h1>
              <div class={`icon-container ${riskClass}`}>
                <img
                  id="risk-icon"
                  src={require(`../../images/ACS/${riskClass}-icon.svg`)}
                  class="icon"
                />
              </div>
            </div>
          </div>
        </div>
        <hr
          id="rchr"
          style={
            riskClass == "none" ? { display: "none" } : { display: "none" }
          }
          class="thickhr"
        />
      </div>
    </div>
  );
}
