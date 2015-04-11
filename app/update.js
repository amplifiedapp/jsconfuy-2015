import Immutable from "immutable";
import assign from "object-assign";

export default function update(state, action) {
  console.log(action);
  switch (action.type) {
    case 'PLAY_SONG':
      return state.setIn(['currentRehearsedSong', 'song', 'playStatus'],
        'PLAYING'
      );
    case 'STOP_SONG':
      return state.updateIn(['currentRehearsedSong', 'song'], (song) => {
        return song.set('playStatus', 'STOPPED').set('playedPercentage', 0);
      });
    case 'PAUSE_SONG':
      return state.setIn(['currentRehearsedSong', 'song', 'playStatus'],
        'PAUSED'
      );
    case 'RESUME_SONG':
      return state.setIn(['currentRehearsedSong', 'song', 'playStatus'],
        'PLAYING'
      );
    case 'LOADING_SONG':
      return state.setIn(['currentRehearsedSong', 'song', 'loadedPercentage'],
        action.payload.loadedPercentage
      );
    case 'PLAYING_SONG':
      const durationInSecs = state.getIn(['currentRehearsedSong', 'song', 'durationInSecs']);
      return state.setIn(['currentRehearsedSong', 'song', 'playedPercentage'],
        100 * action.payload.positionInSecs / durationInSecs
      );
    case 'FINISH_PLAYING_SONG':
      return state.updateIn(['currentRehearsedSong', 'song'], (song) => {
        return song.set('playStatus', 'STOPPED').set('playedPercentage', 0);
      });
    case 'SEEK_IN_SONG':
      return state.updateIn(['currentRehearsedSong', 'song'], (song) => {
        return song.set('playedPercentage', action.payload.percentage);
      });
    case 'VIEW_COMMENT':
      return state.setIn(['currentRehearsedSong', 'song', 'currentCommentCid'],
        action.payload.commentCid
      );
    case 'NEW_COMMENT':
      return state.setIn(['currentRehearsedSong', 'song', 'addingComment'],
        true
      );
    case 'HIDE_NEW_COMMENT':
      return state.setIn(["currentRehearsedSong", "song", "addingComment"],
        false
      );
    case 'CREATE_COMMENT':
      return state.setIn(["currentRehearsedSong", "song", "addingComment"],
        false
      );
    case 'CREATE_COMMENT_SUCCESS':
      const song = state.getIn(['currentRehearsedSong', 'song']);
      const lastCid = song.getIn(['comments'])
        .keySeq().max();
      const newCid = lastCid + 1;
      return state.updateIn(["currentRehearsedSong", "song", "comments"], (comments) => {
        const comment = assign({}, action.payload.comment, {cid: newCid});
        comment.songMoment = comment.songMomentPercentage * song.get('durationInSecs') / 100;
        return comments.set(newCid, Immutable.fromJS(comment));
      });
    default:
      return state;
  }
};
