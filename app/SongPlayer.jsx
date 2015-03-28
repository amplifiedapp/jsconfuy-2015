import React from 'react'
import connectStreamsToInput from './connectStreamsToInput'
import Sound from './Sound'
import SongWaveform from './SongWaveform'
import SongWaveformComments from './SongWaveformComments'

class SongPlayer extends React.Component {
  render() {
    const song = this.props.song;
    const playStatus = song.get('playStatus');

    let playerControls = [];
    if (playStatus === 'STOPPED') {
      playerControls.push(<a key="play" href='#' onClick={this.props.plays}>Play</a>);
    }

    if (playStatus === 'PLAYING') {
      playerControls.push(<a key="pause" href='#' onClick={this.props.pauses}>Pause</a>);
      playerControls.push(<a key="stop" href='#' onClick={this.props.stops}>Stop</a>);
    }

    if (playStatus === 'PAUSED') {
      playerControls.push(<a key="resume" href='#' onClick={this.props.resumes}>Resume</a>);
    }

    return <div>
      {playerControls}
      <Sound
        url={song.get('audio')}
        playStatus={playStatus}
        positionInMs={song.get('playedPercentage') * song.get('durationInSecs') * 10 /* 1000 / 100 */}
        onLoading={this.props.loadingEvents}
        onPlaying={this.props.playingEvents}
        onFinishPlaying={this.props.finishPlayingEvents} />
      <div className="waveform-container">
        <SongWaveform
          waveformData={song.get('waveformData')}
          playedPercentage={song.get('playedPercentage')}
          loadedPercentage={song.get('loadedPercentage')}
          onSongSeek={this.props.seeks} />
        <SongWaveformComments />
      </div>
    </div>;
  }
}

function mergeStreams(intents, plays, stops, pauses, resumes, seeks, loadingEvents,
  playingEvents, finishPlayingEvents) {

  return plays
    .doAction('.preventDefault').flatMapLatest(intents.playSong)
    .merge(stops.doAction('.preventDefault').flatMapLatest(intents.stopSong))
    .merge(pauses.doAction('.preventDefault').flatMapLatest(intents.pauseSong))
    .merge(resumes.doAction('.preventDefault').flatMapLatest(intents.resumeSong))
    .merge(loadingEvents.map('.loadedPercentage').flatMapLatest(intents.updateSongLoading))
    .merge(playingEvents.map((ev) => ev.positionInMs / 1000).flatMapLatest(intents.updateSongPlaying))
    .merge(finishPlayingEvents.flatMapLatest(intents.finishSongPlaying))
    .merge(seeks.flatMapLatest(intents.seekInSong));
}

export default connectStreamsToInput(SongPlayer,
  ['plays', 'stops', 'pauses', 'resumes', 'seeks', 'loadingEvents', 'playingEvents', 'finishPlayingEvents'],
  mergeStreams
);
