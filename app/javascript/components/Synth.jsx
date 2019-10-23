import React from "react";
import Tone from "tone";
import _ from "lodash";
import SynthBody from "./SynthBody";
import Knob from "./controlls/Knob";
// import techno from "./techno.mp3";

export default class Synth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      synths: [],
    };

    _.bindAll(
      this,
      "newSynth",
      "changeShowing",
      "changeGain",
      "toggleBeat",
      "handleOctave",
      "handleWetValue",
      "changeVolume",
      "handleBPM",
      "handlePattern",
      "handleDelete"
    );
  }

  componentDidMount() {
    this.newSynth();
    Tone.Transport.scheduleRepeat(time => {
      let index = this.state.index;
      this.state.synths.map(value => {
        if (value.synth.pattern[index])
          value.synth.synth.triggerAttackRelease(
            "C" + value.synth.octave,
            "8n"
          );
        if (value.membrane.pattern[index])
          value.membrane.synth.triggerAttackRelease(
            "C" + value.membrane.octave,
            "8n"
          );
        if (value.metal.pattern[index])
          value.metal.synth.triggerAttackRelease(
            "C" + value.metal.octave,
            "8n"
          );
      });

      if (index < 8) index++;
      if (index == 8) index = 0;
      this.setState({
        index: index,
      });
    }, "8n");
    Tone.Transport.start();
  }

  newSynth() {
    let synth = new Tone.PolySynth();
    let membrane = new Tone.MembraneSynth();
    let metal = new Tone.MonoSynth();

    let wholeGain = new Tone.Gain(1);

    let gain = new Tone.Gain(0.5);
    let gainMem = new Tone.Gain(0.5);
    let gainMet = new Tone.Gain(0.5);

    let pan = new Tone.AutoPanner();
    pan.wet.value = 0;
    pan.depth.value = 1;
    pan.frequency.value = 1;
    pan.start();
    let filter = new Tone.AutoFilter();
    filter.wet.value = 0;
    filter.start();
    let freeverb = new Tone.Freeverb();
    freeverb.wet.value = 0;
    let chebyshev = new Tone.Chebyshev();
    chebyshev.wet.value = 0;

    let panMem = new Tone.AutoPanner();
    panMem.wet.value = 0;
    panMem.depth.value = 1;
    panMem.frequency.value = 1;
    panMem.start();
    let filterMem = new Tone.AutoFilter();
    filterMem.wet.value = 0;
    filterMem.start();
    let freeverbMem = new Tone.Freeverb();
    freeverbMem.wet.value = 0;
    let chebyshevMem = new Tone.Chebyshev();
    chebyshevMem.wet.value = 0;

    let panMet = new Tone.AutoPanner();
    panMet.wet.value = 0;
    panMet.depth.value = 1;
    panMet.frequency.value = 1;
    panMet.start();
    let filterMet = new Tone.AutoFilter();
    filterMet.wet.value = 0;
    filterMet.start();
    let freeverbMet = new Tone.Freeverb();
    freeverbMet.wet.value = 0;
    let chebyshevMet = new Tone.Chebyshev();
    chebyshevMet.wet.value = 0;

    synth.chain(pan, filter, freeverb, chebyshev, gain, wholeGain, Tone.Master);
    membrane.chain(
      panMem,
      filterMem,
      freeverbMem,
      chebyshevMem,
      gainMem,
      wholeGain,
      Tone.Master
    );
    metal.chain(
      panMet,
      filterMet,
      freeverbMet,
      chebyshevMet,
      gainMet,
      wholeGain,
      Tone.Master
    );

    let stateSynth = this.state.synths;
    stateSynth.push({
      current: "metal",
      gain: wholeGain,
      synth: {
        octave: 3,
        synth: synth,
        gain: gain,
        autopanner: pan,
        autofilter: filter,
        freeverb: freeverb,
        chebyshev: chebyshev,
        pattern: [false, false, false, false, false, false, false, false],
      },
      membrane: {
        octave: 1,
        synth: membrane,
        gain: gainMem,
        autopanner: panMem,
        autofilter: filterMem,
        freeverb: freeverbMem,
        chebyshev: chebyshevMem,
        pattern: [false, false, false, false, false, false, false, false],
      },
      metal: {
        octave: 4,
        synth: metal,
        gain: gainMet,
        autopanner: panMet,
        autofilter: filterMet,
        freeverb: freeverbMet,
        chebyshev: chebyshevMet,
        pattern: [false, false, false, false, false, false, false, false],
      },
    });

    this.setState({
      synths: stateSynth,
    });
  }

  changeShowing(n, value) {
    let synth = this.state.synths[n];
    synth.current = value;
    this.forceUpdate();
  }

  changeVolume(n, value) {
    let synth = this.state.synths[n];
    synth.gain.gain.value = value;
    this.forceUpdate();
  }

  changeGain(n, synthType, value) {
    let synth = this.state.synths[n][synthType];
    synth.gain.gain.value = value;
    this.forceUpdate();
  }

  toggleBeat(n, synthType, pattern) {
    let synth = this.state.synths[n][synthType];
    synth.pattern[pattern] = !synth.pattern[pattern];
    this.forceUpdate();
  }

  handleOctave(name, value, n, synthType) {
    let synth = this.state.synths[n][synthType];
    synth.octave = value;
    this.forceUpdate();
  }

  handleWetValue(name, value, n, synthType) {
    let effect = this.state.synths[n][synthType][name];
    effect.wet.value = value;
    this.forceUpdate();
  }

  handleBPM(name, value) {
    Tone.Transport.bpm.value = value;
  }

  handlePattern(n, pattern) {
    let synth = this.state.synths[n][this.state.synths[n].current];
    if (pattern == "techno")
      synth.pattern = [false, true, false, true, false, true, false, true];
    if (pattern == "house")
      synth.pattern = [true, true, false, true, true, false, true, true];
    if (pattern == "jazz")
      synth.pattern = [false, true, false, true, false, false, true, false];
    if (pattern == "acid")
      synth.pattern = [true, true, true, true, true, true, true, true];

    this.forceUpdate();
  }

  handleDelete(n) {
    let synths = this.state.synths;
    synths.splice(n, 1);
    this.setState({
      synths: synths,
    });
  }

  render() {
    return (
      <div>
        <div className="bpmChange">
          <span>BPM</span>
          <Knob
            name=""
            min={80}
            max={220}
            increment={1}
            initialDeg={-165}
            overDeg={375}
            value={Tone.Transport.bpm.value}
            handleValueChange={this.handleBPM}
            synthN={3}
            current={"dsad"}
          />
        </div>
        {this.state.synths.map((val, n) => {
          return (
            <SynthBody
              synth={val}
              n={n}
              changeShowing={this.changeShowing}
              changeGain={this.changeGain}
              toggleBeat={this.toggleBeat}
              handleOctave={this.handleOctave}
              handleWetValue={this.handleWetValue}
              changeVolume={this.changeVolume}
              handlePattern={this.handlePattern}
              handleDelete={this.handleDelete}
            />
          );
        })}
        <div className="createSynth" onClick={this.newSynth}>
          <div className="createSynthIcon"></div>
        </div>
      </div>
    );
  }
}
