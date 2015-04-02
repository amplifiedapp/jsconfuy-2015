import React from 'react'
import moment from 'moment'
import classnames from 'classnames'

export default class SongWaveformComments extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      currentCommentCid: null
    });
  }

  handleCommentMouseEnter(comment) {
    return null;
  }

  handleCommentMouseLeave(comment) {
    return null;
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
              <div className={handleClass} onMouseEnter={this.handleCommentMouseEnter(comment)} onMouseLeave={this.handleCommentMouseLeave(comment)}></div>
              <img src={handleImageUrl} />
          </div>;
  }

  render() {
    let markers;
    markers = this.props.comments.map(this.renderCommentMarker.bind(this)).toArray();

    return <div>
        <div className="waveform__layer">
          <div>{markers}</div>
        </div>
      </div>;
  }
}

// var D, NewComment, React, RehearsedSongComments, T, cx, input, moment, ref;

// RehearsedSongComments = require('app/models').RehearsedSongComments;

// NewComment = React.createFactory(require('./new_comment'));

// module.exports = React.createClass({
//   render: function() {
//     var markers;
//     markers = this.props.comments.map(this.renderCommentMarker).toArray();
//     return D.div(null, D.div({
//       className: 'waveform__layer'
//     }, D.div(null, markers)), this.state.currentCommentCid !== null ? this.renderCurrentComment() : void 0, NewComment({
//       onNewComment: this.handleNewComment
//     }));
//   },
//   renderCommentMarker: function(comment) {
//     var handleClass, handleImageUrl, markerStyle;
//     handleImageUrl = comment.get('user').get('avatar_url');
//     handleClass = cx({
//       'waveform__marker__handle': true,
//       'handle-with-image': !!handleImageUrl
//     });
//     markerStyle = {
//       left: comment.get('song_moment_percentage') + '%',
//       height: 140
//     };
//     return D.div({
//       className: 'waveform__marker',
//       style: markerStyle,
//       key: comment.get('cid')
//     }, D.div({
//       className: 'waveform__marker__positioner'
//     }), D.div({
//       className: handleClass,
//       onMouseEnter: this.handleCommentMouseEnter(comment),
//       onMouseLeave: this.handleCommentMouseLeave(comment)
//     }, handleImageUrl ? D.img({
//       src: handleImageUrl
//     }) : void 0));
//   },
//   renderCurrentComment: function() {
//     var comment, user;
//     comment = this.props.comments.get(this.state.currentCommentCid);
//     user = comment.get('user');
//     return D.div({
//       className: 'waveform-comment__box'
//     }, user.get('avatar_url') ? D.img({
//       src: user.get('avatar_url')
//     }) : void 0, D.div(null, user.get('full_name')), D.span({
//       className: 'duration'
//     }, moment.utc(comment.get('song_moment') * 1000).format('H:mm:ss').replace(/^0:/, '')), D.span(null, comment.get('comment')));
//   },
//   handleCommentMouseEnter: function(comment) {
//     return (function(_this) {
//       return function() {
//         return _this.setState({
//           currentCommentCid: comment.get('cid')
//         });
//       };
//     })(this);
//   },
//   handleCommentMouseLeave: function(comment) {
//     return (function(_this) {
//       return function() {
//         return _this.setState({
//           currentCommentCid: null
//         });
//       };
//     })(this);
//   },
//   handleNewComment: function(commentData) {
//     return input.addNewRehearsedSongComment(commentData);
//   }
// });
