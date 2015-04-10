import React from "react";
import moment from "moment";
import NewComment from "./NewComment";
import intents from "./intents";
import connectStreamsToInput from "./connectStreamsToInput";

class SongWaveformComments extends React.Component {

  renderCommentMarker(comment) {
    const imageUrl = comment.get('user').get('avatar_url');
    const isCurrentComment = this.props.currentCommentCid === comment.get('cid');

    return <Marker position={comment.get('song_moment_percentage')}
      onShow={() => { this.props.commentEnter(comment.get('cid')) }}
      onHide={this.props.commentLeave}
      handleImageUrl={imageUrl}
      handleWidth={isCurrentComment ? 30 : 20} />;
  }

  renderCommentBox() {
    if (!this.props.currentCommentCid) return null;

    const comment = this.props.comments.get(this.props.currentCommentCid);
    const user = comment.get("user");

    const percentage = comment.get('song_moment_percentage');
    const commentStyles = percentage < 50 ?
      {
        left: percentage + '%',
        marginLeft: -15
      } :
      {
        right: (100 - percentage) + '%',
        marginRight: -15
      };

    return <div className="waveform-comment__box" style={commentStyles}>
      <span className="commentUsername">{user.get("full_name")}</span>
      {' '}
      <span className="commentSongDuration">
          ({moment.utc(comment.get("song_moment") * 1000).format("H:mm:ss").replace(/^0:/, "")})
      </span>
      {' '}
      <span className="commentText">
          {comment.get("comment")}
      </span>
    </div>;
  }

  render() {
    const markers = this.props.comments.map(c => this.renderCommentMarker(c)).toArray();

    return <div>
            <div className="waveform__layer">
              {markers}
            </div>
            {this.renderCommentBox()}
            <NewComment addingComment={this.props.addingComment}/>
          </div>;
  }
}

class Marker extends React.Component {
  render() {
    const markerStyle = {
      left: this.props.position + '%',
      height: 140
    };

    const handleStyle = {marginLeft: -(this.props.handleWidth / 2)}

    const markerHandle = <img src={this.props.handleImageUrl} style={handleStyle} />

    return <div className="waveform__marker" style={markerStyle}
      onMouseEnter={() => this.props.onShow()}
      onMouseLeave={() => this.props.onHide()}>
        <div className="waveform__marker__positioner"></div>
        <div className="waveform__marker__handle" style={{width: this.props.handleWidth}}>
          {markerHandle}
        </div>
    </div>;
  }
}

function merge(commentEnter, commentLeave) {
  return commentEnter.merge(commentLeave.map(null)).map(intents.viewComment);
}

export default connectStreamsToInput(SongWaveformComments, ["commentEnter", "commentLeave"], merge);
