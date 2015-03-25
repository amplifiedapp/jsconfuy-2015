import React from 'react'
import SongWaveform from './SongWaveform'
import SongWaveformComments from './SongWaveformComments'

export default class SongPlayer extends React.Component {
  render() {
    return <div>
      <a href="#" onClick={this.handlePlayClick}>
        Play
      </a>
      <a href="#" onClick={this.handlePauseClick}>
        Pause
      </a>
      <a href="#" onClick={this.handleResumeClick}>
        Resume
      </a>
      <a href="#" onClick={this.handleStopClick}>
        Stop
      </a>
      <div className="waveform-container">
        <SongWaveform waveformData={this.props.song.get('waveformData')}/>
        <SongWaveformComments />
      </div>
    </div>
  }
}
