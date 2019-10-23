import React from "react";
import Slider from "react-slider";
import Sequenser from "./Sequenser";

export default class SynthBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="synthBody" key={this.props.n}>
        <div className="instrumentWrapper">
          <h1>INSTRUMENT</h1>
          <div className="instrumentItemsWrapper">
            <div
              key={"metal" + this.props.n}
              className="instrumentItem"
              onMouseDown={() =>
                this.props.changeShowing(this.props.n, "metal")
              }
            >
              <div className="instrumentSwitch">
                <div
                  className={
                    this.props.synth.current == "metal"
                      ? "instrumentButton active"
                      : "instrumentButton"
                  }
                ></div>
                MONO SYNTH
              </div>
              <Slider
                min={0}
                max={1}
                className={
                  this.props.synth.current == "metal"
                    ? "instrumentSlider active"
                    : "instrumentSlider"
                }
                thumbClassName={
                  this.props.synth.current == "metal"
                    ? "instrumentSliderThumb active"
                    : "instrumentSliderThumb"
                }
                trackClassName="instrumentSliderTrack"
                step={0.01}
                orientation="vertical"
                value={this.props.synth.metal.gain.gain.value}
                invert
                onChange={value =>
                  this.props.changeGain(this.props.n, "metal", value)
                }
              />
            </div>
            <div
              key={"membrane" + this.props.n}
              className="instrumentItem"
              onMouseDown={() =>
                this.props.changeShowing(this.props.n, "membrane")
              }
            >
              <div className="instrumentSwitch">
                <div
                  className={
                    this.props.synth.current == "membrane"
                      ? "instrumentButton active"
                      : "instrumentButton"
                  }
                ></div>
                DRUM
              </div>
              <Slider
                min={0}
                max={1}
                className={
                  this.props.synth.current == "membrane"
                    ? "instrumentSlider active"
                    : "instrumentSlider"
                }
                thumbClassName={
                  this.props.synth.current == "membrane"
                    ? "instrumentSliderThumb active"
                    : "instrumentSliderThumb"
                }
                trackClassName="instrumentSliderTrack"
                step={0.01}
                orientation="vertical"
                invert
                value={this.props.synth.membrane.gain.gain.value}
                onChange={value =>
                  this.props.changeGain(this.props.n, "membrane", value)
                }
              />
            </div>
            <div
              key={"synth" + this.props.n}
              className="instrumentItem"
              onMouseDown={() =>
                this.props.changeShowing(this.props.n, "synth")
              }
            >
              <div className="instrumentSwitch">
                <div
                  className={
                    this.props.synth.current == "synth"
                      ? "instrumentButton active"
                      : "instrumentButton"
                  }
                ></div>
                POLY SYNTH
              </div>
              <Slider
                min={0}
                max={1}
                className={
                  this.props.synth.current == "synth"
                    ? "instrumentSlider active"
                    : "instrumentSlider"
                }
                thumbClassName={
                  this.props.synth.current == "synth"
                    ? "instrumentSliderThumb active"
                    : "instrumentSliderThumb"
                }
                trackClassName="instrumentSliderTrack"
                step={0.01}
                orientation="vertical"
                invert
                value={this.props.synth.synth.gain.gain.value}
                onChange={value =>
                  this.props.changeGain(this.props.n, "synth", value)
                }
              />
            </div>
          </div>
        </div>
        <div className="sequenserWrapper">
          <Sequenser
            n={this.props.n}
            current={this.props.synth.current}
            synth={this.props.synth[this.props.synth.current]}
            toggleBeat={this.props.toggleBeat}
            handleOctave={this.props.handleOctave}
            handleWetValue={this.props.handleWetValue}
          />
          <div className="presetsWrapper">
            PATTERN
            <div className="presetsItemsWrapper">
              <div
                className="presetItem"
                onClick={() => this.props.handlePattern(this.props.n, "techno")}
              >
                <div className="presetButton"></div>
                TECHNO
              </div>
              <div
                className="presetItem"
                onClick={() => this.props.handlePattern(this.props.n, "jazz")}
              >
                <div className="presetButton"></div>
                JAZZ
              </div>
              <div
                className="presetItem"
                onClick={() => this.props.handlePattern(this.props.n, "house")}
              >
                <div className="presetButton"></div>
                HOUSE
              </div>
              <div
                className="presetItem"
                onClick={() => this.props.handlePattern(this.props.n, "acid")}
              >
                <div className="presetButton"></div>
                ACID
              </div>
            </div>
          </div>
        </div>
        <div className="gainWrapper">
          <div className="gain">
            <Slider
              min={0}
              max={1}
              className="gainSlider"
              thumbClassName="gainThumbSlider"
              trackClassName="gainTrackSlider"
              step={0.01}
              orientation="vertical"
              value={this.props.synth.gain.gain.value}
              invert
              onChange={value => this.props.changeVolume(this.props.n, value)}
            />
            GAIN
          </div>
        </div>
        <div
          className="delete"
          onClick={() => this.props.handleDelete(this.props.n)}
        ></div>
      </div>
    );
  }
}
