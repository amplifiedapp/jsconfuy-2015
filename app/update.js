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
    case 'CREATE_COMMENT':
      return state.updateIn(["currentRehearsedSong", "song", "comments"], (comments) => {
        return comments.set(action.payload.comment.get("cid"), action.payload.comment);
      }).setIn(["currentRehearsedSong", "song", "addingComment"], false);
    default:
      return state;
  }
};
