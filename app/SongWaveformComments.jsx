import React from "react"
import moment from "moment"
import classnames from "classnames"
import NewComment from "./NewComment"

export default class SongWaveformComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCommentCid: null
    };
  }

  handleCommentMouseEnter(comment) {
    return (function(_this) {
      return function() {
        return _this.setState({
          currentCommentCid: comment.get('cid')
        });
      };
    })(this);
  }

  handleCommentMouseLeave(comment) {
    return (function(_this) {
      return function() {
        return _this.setState({
          currentCommentCid: null
        });
      };
    })(this);
  }

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
              <div className={handleClass} onMouseEnter={this.handleCommentMouseEnter(comment)} onMouseLeave={this.handleCommentMouseLeave(comment)}>
                <img src={handleImageUrl} />
              </div>
          </div>;
  }

  renderCurrentComment() {
    let comment, user, userAvatar;
    comment = this.props.comments.filter(c => c.get("cid") === this.state.currentCommentCid).get(0);
    user = comment.get("user");
    if (user.get("avatar_url")) {
      userAvatar = <img src={user.get("avatar_url")} />
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

  handleNewComment(commentData) {
    console.log('NUEVO COMENTARIO!!!');
    console.log(commentData);
    return null; //input.addNewRehearsedSongComment(commentData);
  }

  render() {
    let markers = this.props.comments.map(this.renderCommentMarker.bind(this)).toArray();
    let currentComment;

    if(this.state.currentCommentCid !== null) {
      currentComment = this.renderCurrentComment();
    } else {
      currentComment = <noscript />;
    }

    return <div>
            <div className="waveform__layer">
              <div>{markers}</div>
            </div>
            {currentComment}
            <NewComment onNewComment={this.handleNewComment} />
          </div>;
  }
}
