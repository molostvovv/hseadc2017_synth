import React from "react";
import Knob from "./controlls/Knob";

export default ({ synth, handleOctave, handleWetValue, n, current }) => {
  return (
    <div className="effectsKnobs">
      <Knob
        name="octave"
        min={1}
        max={8}
        increment={1}
        initialDeg={-45}
        overDeg={270}
        value={synth.octave}
        handleValueChange={handleOctave}
        synthN={n}
        current={current}
      />
      <Knob
        name="autopanner"
        min={0}
        max={100}
        increment={100}
        initialDeg={-45}
        overDeg={270}
        value={synth.autopanner.wet.value}
        handleValueChange={handleWetValue}
        synthN={n}
        current={current}
      />
      <Knob
        name="autofilter"
        min={0}
        max={100}
        increment={100}
        initialDeg={-45}
        overDeg={270}
        value={synth.autofilter.wet.value}
        handleValueChange={handleWetValue}
        synthN={n}
        current={current}
      />
      <Knob
        name="freeverb"
        min={0}
        max={100}
        increment={100}
        initialDeg={-45}
        overDeg={270}
        value={synth.freeverb.wet.value}
        handleValueChange={handleWetValue}
        synthN={n}
        current={current}
      />
      <Knob
        name="chebyshev"
        min={0}
        max={100}
        increment={100}
        initialDeg={-45}
        overDeg={270}
        value={synth.chebyshev.wet.value}
        handleValueChange={handleWetValue}
        synthN={n}
        current={current}
      />
    </div>
  );
};
