import Bacon from 'baconjs';
import api from './api';

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

  newComment() {
    return { type: 'NEW_COMMENT' };
  },

  hideNewComment() {
    return { type: 'HIDE_NEW_COMMENT' };
  },

  createComment(commentData) {
    return (state) => {
      const commentCid = state.get('nextCid');
      return Bacon.once({type: 'CREATE_COMMENT', payload: { commentData }})
        .merge(Bacon.fromPromise(api.createComment(commentData))
          .map(response => {
            return {type: 'CREATE_COMMENT_SUCCESS', payload: {commentData: response, cid: commentCid}};
          })
          .mapError(response => {
            return {type: 'CREATE_COMMENT_FAILURE', payload: {failure: response, cid: comentCid}};
          })
        );
    };

  }
};
