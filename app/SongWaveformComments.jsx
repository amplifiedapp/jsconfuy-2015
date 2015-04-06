import React from "react";
import moment from "moment";
import classnames from "classnames";
import NewComment from "./NewComment";
import intents from "./intents";
import connectStreamsToInput from "./connectStreamsToInput";

class SongWaveformComments extends React.Component {

  renderCommentMarker(comment) {
    let handleClass;
    let handleImageUrl;
    let markerStyle;

    handleImageUrl = comment.get('user').get('avatar_url');
    handleClass = classnames({
      'waveform__marker__handle': true,
      'handle-with-image': !!handleImageUrl
    });

    markerStyle = {
      left: comment.get('song_moment_percentage') + '%',
      height: 140
    };

    return <div className="waveform__marker" style={markerStyle} key={comment.get('cid')}>
              <div className="waveform__marker__positioner"></div>
              <div className={handleClass} onMouseEnter={() => { this.props.commentEnter(comment.get('cid')) }} onMouseLeave={this.props.commentLeave}>
                <img src={handleImageUrl} />
              </div>
          </div>;
  }

  renderCurrentComment() {
    let comment, user, userAvatar;
    comment = this.props.comments.get(this.props.currentCommentCid);
    user = comment.get("user");
    if (user.get("avatar_url")) {
      userAvatar = <img src={user.get("avatar_url")} />;
    } else {
      userAvatar = <noscript />;
    }
    return <div>
            <div className="waveform-comment__box">
              {userAvatar}
              <div>{user.get("full_name")}</div>
              <span className="duration">
                  {moment.utc(comment.get("song_moment") * 1000).format("H:mm:ss").replace(/^0:/, "")}
              </span>
              <span>
                  {comment.get("comment")}
              </span>
            </div>
          </div>;
  }

  render() {
    let markers = this.props.comments.map(this.renderCommentMarker.bind(this)).toArray();
    let currentComment;

    if(this.props.currentCommentCid !== null) {
      currentComment = this.renderCurrentComment();
    } else {
      currentComment = <noscript />;
    }

    return <div>
            <div className="waveform__layer">
              <div>{markers}</div>
            </div>
            {currentComment}
            <NewComment addingComment={this.props.addingComment}/>
          </div>;
  }
}

function merge(commentEnter, commentLeave) {
  return commentEnter.merge(commentLeave.map(null)).map(intents.viewComment);
}

export default connectStreamsToInput(SongWaveformComments, ["commentEnter", "commentLeave"], merge);
