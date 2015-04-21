import React from "react";
import moment from "moment";
import NewComment from "./NewComment";
import intents from "./intents";
import connectStreamsToInput from "./connectStreamsToInput";

class SongWaveformComments extends React.Component {

  renderCommentMarker(comment) {
    const imageUrl = comment.get('user').get('avatarUrl');
    const isCurrentComment = this.props.comments.get('currentCommentCid') === comment.get('cid');

    return <Marker
      key={comment.get('cid')}
      position={comment.get('songMomentPercentage')}
      onShow={() => { this.props.commentEnter(comment.get('cid')) }}
      onHide={this.props.commentLeave}
      handleImageUrl={imageUrl}
      handleWidth={isCurrentComment ? 30 : 20} />;
  }

  renderCommentBox() {
    if (!this.props.comments.get('currentCommentCid')) return null;

    const comment = this.props.comments.getIn(['list', this.props.comments.get('currentCommentCid')]);
    const user = comment.get("user");

    const percentage = comment.get('songMomentPercentage');
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
      <span className="commentUsername">{user.get("fullName")}</span>
      {' '}
      <span className="commentSongDuration">
          ({moment.utc(comment.get("songMoment") * 1000).format("H:m:ss").replace(/^0:/, "")})
      </span>
      {' '}
      <span className="commentText">
          {comment.get("comment")}
      </span>
    </div>;
  }

  render() {
    const markers = this.props.comments.get('list').map(c => this.renderCommentMarker(c)).toArray();

    const newComment = this.props.comments.get('addingComment') ?
      <NewComment onRequestHide={this.props.hideCommentForm}
                  onNewComment={this.props.createComment} /> :
      <a href="#" className="waveform-context-visible" onClick={this.props.newComment}>Add Comment</a>;

    return <div>
            <div className="waveform__layer">
              {markers}
            </div>
            {this.renderCommentBox()}
            {newComment}
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

function merge(commentEnter, commentLeave, newComment, createComment, hideCommentForm) {
  return commentEnter.merge(commentLeave.map(null)).map(intents.viewComment)
    .merge(newComment.doAction('.preventDefault').map(intents.newComment))
    .merge(createComment.map(intents.createComment))
    .merge(hideCommentForm.map(intents.hideNewComment));
}

export default connectStreamsToInput(SongWaveformComments,
  ["commentEnter", "commentLeave", "newComment", "createComment", "hideCommentForm"],
  merge);
