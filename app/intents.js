export default {
  playSong() {
    return {type: 'PLAY_SONG'};
  },

  stopSong() {
    return {type: 'STOP_SONG'};
  },

  pauseSong() {
    return {type: 'PAUSE_SONG'};
  },

  resumeSong() {
    return {type: 'RESUME_SONG'};
  },

  updateSongLoading(loadedPercentage) {
    return {type: 'LOADING_SONG', payload: { loadedPercentage }};
  },

  updateSongPlaying(positionInSecs) {
    return {type: 'PLAYING_SONG', payload: { positionInSecs }};
  },

  finishSongPlaying() {
    return {type: 'FINISH_PLAYING_SONG'};
  },

  seekInSong(percentage) {
    return {type: 'SEEK_IN_SONG', payload: { percentage }};
  },

  viewComment(commentCid) {
    return { type: 'VIEW_COMMENT', payload: {commentCid} };
  },

  newComment(comment) {
    return {type: 'NEW_COMMENT', payload: { comment }};
  }
};
