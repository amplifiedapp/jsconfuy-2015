import {once} from 'baconjs'

export default {
  playSong(state) {
    return once({type: 'PLAY_SONG'});
  },

  stopSong(state) {
    return once({type: 'STOP_SONG'});
  },

  pauseSong(state) {
    return once({type: 'PAUSE_SONG'});
  },

  resumeSong(state) {
    return once({type: 'RESUME_SONG'});
  },

  updateSongLoading(state, loadedPercentage) {
    return once({type: 'LOADING_SONG', payload: { loadedPercentage }});
  },

  updateSongPlaying(state, positionInSecs) {
    return once({type: 'PLAYING_SONG', payload: { positionInSecs }});
  },

  finishSongPlaying(state) {
    return once({type: 'FINISH_PLAYING_SONG'});
  },

  seekInSong(state, percentage) {
    return once({type: 'SEEK_IN_SONG', payload: { percentage }})
  }
};
