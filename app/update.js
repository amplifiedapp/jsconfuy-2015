import Immutable from "immutable";
import assign from "object-assign";

export default function update(state, action) {
  console.log(action);
  switch (action.type) {
    case "PLAY_SONG":
      return state.setIn(["currentRehearsedSong", "playStatus"],
        "PLAYING"
      );
    case "STOP_SONG":
      return state.updateIn(["currentRehearsedSong"], (song) => {
        return song.set("playStatus", "STOPPED").set("playedPercentage", 0);
      });
    case "PAUSE_SONG":
      return state.setIn(["currentRehearsedSong", "playStatus"],
        "PAUSED"
      );
    case "RESUME_SONG":
      return state.setIn(["currentRehearsedSong", "playStatus"],
        "PLAYING"
      );
    case "LOADING_SONG":
      return state.setIn(["currentRehearsedSong", "loadedPercentage"],
        action.payload.loadedPercentage
      );
    case "PLAYING_SONG":
      const durationInSecs = state.getIn(["currentRehearsedSong", "durationInSecs"]);
      return state.setIn(["currentRehearsedSong", "playedPercentage"],
        100 * action.payload.positionInSecs / durationInSecs
      );
    case "FINISH_PLAYING_SONG":
      return state.updateIn(["currentRehearsedSong"], (song) => {
        return song.set("playStatus", "STOPPED").set("playedPercentage", 0);
      });
    case "SEEK_IN_SONG":
      return state.updateIn(["currentRehearsedSong"], (song) => {
        return song.set("playedPercentage", action.payload.percentage);
      });
    case "VIEW_COMMENT":
      return state.setIn(["currentRehearsedSong", "comments", "currentCommentCid"],
        action.payload.commentCid
      );
    case "NEW_COMMENT":
      return state.setIn(["currentRehearsedSong", "comments", "addingComment"],
        true
      );
    case "HIDE_NEW_COMMENT":
      return state.setIn(["currentRehearsedSong", "comments", "addingComment"],
        false
      );
    case "CREATE_COMMENT":
      return createComment(action.payload, state);
    case "CREATE_COMMENT_SUCCESS":
      return createCommentSuccess(action.payload, state);
    case "CREATE_COMMENT_FAILURE":
      return createCommentFailure(action.payload, state);
    default:
      return state;
  }
};

function createComment(payload, state) {
  const song = state.getIn(["currentRehearsedSong"]);
  const newCid = state.get('nextCid');
  return state
    .setIn(["currentRehearsedSong", "comments", "addingComment"], false)
    .update('nextCid', (cid) => cid + 1)
    .updateIn(["currentRehearsedSong", "comments", "list"], (comments) => {
      const comment = assign({}, payload.commentData, {cid: newCid});
      comment.songMoment = comment.songMomentPercentage * song.get("durationInSecs") / 100;
      return comments.set(newCid, Immutable.fromJS(comment));
    });
}

function createCommentSuccess(payload, state) {
  const song = state.getIn(["currentRehearsedSong"]);
  const cid = payload.cid;
  return state
    .updateIn(["currentRehearsedSong", "comments", "list", cid], (comment) => {
      const comment = assign({}, payload.commentData, {cid});
      comment.songMoment = comment.songMomentPercentage * song.get("durationInSecs") / 100;
      return Immutable.fromJS(comment);
    });
}

function createCommentFailure(payload, state) {
  const cid = payload.cid;
  return state.removeIn(["currentRehearsedSong", "comments", "list", cid]);
}
