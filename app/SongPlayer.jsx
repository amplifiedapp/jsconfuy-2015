import React from 'react'
import SongWaveform from './SongWaveform'
import SongWaveformComments from './SongWaveformComments'

const PLAYING = '1';
const PAUSED = '2';
const STOPPED = '3';

export default class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStatus: STOPPED
    };
  }

  componentWillMount() {
    this.sound = soundManager.createSound({
      url: this.props.song.get('audio')
    });
  }

  handlePlayClick() {
    this.sound.play();
    this.setState({
      playerStatus: PLAYING
    });
  }

  handlePauseClick() {
    this.sound.pause();
    this.setState({
      playerStatus: PAUSED
    });
  }

  handleResumeClick() {
    this.sound.resume();
    this.setState({
      playerStatus: PLAYING
    });
  }

  handleStopClick() {
    this.sound.stop();
    this.setState({
      playerStatus: STOPPED
    });
  }

  render() {
    let playerControls = [];
    if (this.state.playerStatus === STOPPED) {
      playerControls.push(<a href='#' onClick={this.handlePlayClick.bind(this)}>Play</a>);
    }

    if (this.state.playerStatus === PLAYING) {
      playerControls.push(<a href='#' onClick={this.handlePauseClick.bind(this)}>Pause</a>);
      playerControls.push(<a href='#' onClick={this.handleStopClick.bind(this)}>Stop</a>);
    }

    if (this.state.playerStatus === PAUSED) {
      playerControls.push(<a href='#' onClick={this.handleResumeClick.bind(this)}>Resume</a>);
    }

    return <div>
      {playerControls}
      <div className="waveform-container">
        <SongWaveform waveformData={this.props.song.get('waveformData')}/>
        <SongWaveformComments />
      </div>
    </div>;
  }
}
