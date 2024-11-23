import React from "react";

export default function ACS() {
  return (
    <div id="acs">
      <div class="top-box">
        <div class="info">
          <h1 class="scpSubtext">SCP</h1>
          <h1 id="number"></h1>
        </div>
        <div class="bars">
          <div id="bar1" class="bar"></div>
          <div id="bar2" class="bar"></div>
          <div id="bar3" class="bar"></div>
          <div id="bar4" class="bar"></div>
          <div id="bar5" class="bar"></div>
          <div id="bar6" class="bar"></div>
        </div>
        <div class="clearance">
          <h1 id="clearance">Level # Clearance</h1>
          <h2 id="clearance-label">-</h2>
        </div>
      </div>
      <hr class="thickhr" />
      <div class="classes">
        <div id="cs" class="containment-class class">
          <div id="ch-cc" class="class-header"></div>
          <div class="class-content">
            <h1 class="containment-title title">Containment class:</h1>
            <div class="desc-container">
              <h1 id="containment-desc" class="desc">
                containmentclass
              </h1>
              <div class="icon-container">
                <img id="containment-icon" class="icon" />
              </div>
            </div>
          </div>
        </div>
        <hr id="cshr" class="thickhr" />
        <div id="sc" class="secondary-class class">
          <div id="ch-sc" class="class-header"></div>
          <div class="class-content">
            <h1 class="secondary-title title">Secondary class:</h1>
            <div class="desc-container">
              <h1 id="secondary-desc" class="desc">
                secondaryclass
              </h1>
              <div class="icon-container">
                <img id="secondary-icon" class="icon" />
              </div>
            </div>
          </div>
        </div>
        <hr id="schr" class="thickhr" />
        <div id="dc" class="disruption class">
          <div id="ch-dc" class="class-header"></div>
          <div class="class-content">
            <h1 class="disruption-title title">Disruption class:</h1>
            <div class="desc-container">
              <h1 id="disruption-desc" class="desc">
                disruptionclass
              </h1>
              <div class="icon-container">
                <img id="disruption-icon" class="icon" />
              </div>
            </div>
          </div>
        </div>
        <hr id="dchr" class="thickhr" />
        <div id="rc" class="risk class">
          <div id="ch-rc" class="class-header"></div>
          <div class="class-content">
            <h1 class="risk-title title">Risk class:</h1>
            <div class="desc-container">
              <h1 id="risk-desc" class="desc">
                riskclass
              </h1>
              <div class="icon-container">
                <img id="risk-icon" class="icon" />
              </div>
            </div>
          </div>
        </div>
        <hr id="rchr" class="thickhr" />
      </div>
    </div>
  );
}
