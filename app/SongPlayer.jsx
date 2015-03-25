import React from 'react'
import SongWaveform from './SongWaveform'
import SongWaveformComments from './SongWaveformComments'

export default class SongPlayer extends React.Component {
  componentWillMount() {
    this.sound = soundManager.createSound({
      url: this.props.song.get('audio')
    });
  }

  handlePlayClick() {
    this.sound.play();
  }

  handlePauseClick() {
    this.sound.pause();
  }

  handleResumeClick() {
    this.sound.resume();
  }

  handleStopClick() {
    this.sound.stop();
  }

  render() {
    return <div>
      <a href="#" onClick={this.handlePlayClick.bind(this)}>
        Play
      </a>
      <a href="#" onClick={this.handlePauseClick.bind(this)}>
        Pause
      </a>
      <a href="#" onClick={this.handleResumeClick.bind(this)}>
        Resume
      </a>
      <a href="#" onClick={this.handleStopClick.bind(this)}>
        Stop
      </a>
      <div className="waveform-container">
        <SongWaveform waveformData={this.props.song.get('waveformData')}/>
        <SongWaveformComments />
      </div>
    </div>
  }
}
