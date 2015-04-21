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
      return state.setIn(["currentRehearsedSong", "comments", "addingComment"],
        false
      );
    case "CREATE_COMMENT_SUCCESS":
      const song = state.getIn(["currentRehearsedSong"]);
      const lastCid = song.getIn(["comments", "list"])
        .keySeq().max();
      const newCid = lastCid + 1;
      return state.updateIn(["currentRehearsedSong", "comments", "list"], (comments) => {
        const comment = assign({}, action.payload.comment, {cid: newCid});
        comment.songMoment = comment.songMomentPercentage * song.get("durationInSecs") / 100;
        return comments.set(newCid, Immutable.fromJS(comment));
      });
    default:
      return state;
  }
};
