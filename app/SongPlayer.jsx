import React from 'react'
import connectStreamsToInput from './connectStreamsToInput'
import Sound from './Sound'
import SongWaveform from './SongWaveform'
import SongWaveformComments from './SongWaveformComments'
import intents from './intents'

class SongPlayer extends React.Component {
  render() {
    const song = this.props.song;
    const playStatus = song.get('playStatus');

    return <div>
      {this.renderPlayerControls()}
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
        <SongWaveformComments currentCommentCid={song.get('currentCommentCid')} comments={song.get('comments')} addingComment={song.get("addingComment")}/>
      </div>
    </div>;
  }

  renderPlayerControls() {
    const playStatus = this.props.song.get('playStatus');
    const playerControls = [];

    if (playStatus === 'STOPPED') {
      playerControls.push(<a key="play" href='#' onClick={this.props.plays}>Play</a>);
    } else if (playStatus === 'PLAYING') {
      playerControls.push(<a key="pause" href='#' onClick={this.props.pauses}>Pause</a>);
      playerControls.push(<a key="stop" href='#' onClick={this.props.stops}>Stop</a>);
    } else if (playStatus === 'PAUSED') {
      playerControls.push(<a key="resume" href='#' onClick={this.props.resumes}>Resume</a>);
      playerControls.push(<a key="stop" href='#' onClick={this.props.stops}>Stop</a>);
    }

    return playerControls;
  }
}

function mergeStreams(plays, stops, pauses, resumes, seeks, loadingEvents,
  playingEvents, finishPlayingEvents) {

  return plays
    .doAction('.preventDefault').map(intents.playSong)
    .merge(stops.doAction('.preventDefault').map(intents.stopSong))
    .merge(pauses.doAction('.preventDefault').map(intents.pauseSong))
    .merge(resumes.doAction('.preventDefault').map(intents.resumeSong))
    .merge(loadingEvents.map('.loadedPercentage').map(intents.updateSongLoading))
    .merge(playingEvents.map((ev) => ev.positionInMs / 1000).map(intents.updateSongPlaying))
    .merge(finishPlayingEvents.map(intents.finishSongPlaying))
    .merge(seeks.map(intents.seekInSong));
}

export default connectStreamsToInput(SongPlayer,
  ['plays', 'stops', 'pauses', 'resumes', 'seeks', 'loadingEvents',
   'playingEvents', 'finishPlayingEvents'],
  mergeStreams
);
