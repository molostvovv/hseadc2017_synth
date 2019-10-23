import React from "react";
import Effects from "./Effects";

export default ({
  synth,
  toggleBeat,
  n,
  current,
  handleOctave,
  handleWetValue,
}) => {
  return (
    <div className="sequenserChanging">
      <div className="effectsWrapper">
        EFFETCS
        {current == "synth" && (
          <Effects
            synth={synth}
            handleOctave={handleOctave}
            handleWetValue={handleWetValue}
            n={n}
            current={current}
          />
        )}
        {current == "membrane" && (
          <Effects
            synth={synth}
            handleOctave={handleOctave}
            handleWetValue={handleWetValue}
            n={n}
            current={current}
          />
        )}
        {current == "metal" && (
          <Effects
            synth={synth}
            handleOctave={handleOctave}
            handleWetValue={handleWetValue}
            n={n}
            current={current}
          />
        )}
      </div>
      <div className="sequenser">
        LOOP
        <div className="sequenserButtonsWrapper">
          {synth.pattern.map((isTrue, i) => {
            return (
              <div
                key={i}
                onClick={() => toggleBeat(n, current, i)}
                className={isTrue ? "sequenserItem active" : "sequenserItem"}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
