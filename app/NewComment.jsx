import React from 'react'
import classnames from 'classnames';

export default class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingComment: false,
      comment: {
        song_moment_percentage: 0,
        comment: ""
      }
    };
  }

  handleCommentChange(ev) {
    let comment = this.state.comment;
    comment.comment = ev.target.value;
    this.setState({comment: comment});
  }

  handleRangeClick(ev) {
    let percentage = (ev.nativeEvent.offsetX / ev.target.offsetWidth * 100);
    let comment = this.state.comment;
    comment.song_moment_percentage = percentage;
    this.setState({comment: comment});
  }

  handleAddCommentClick(ev) {
    ev.preventDefault();
    this.setState({addingComment: true});
  }

  handleFormSubmit(ev) {
    ev.preventDefault();

    if(this.state.comment.comment != "") {
      this.props.onNewComment(this.state.comment);
    }

    this.setState({
      addingComment: false,
      comment: {
        song_moment_percentage: 0,
        comment: ""
      }
    });
  }

  render() {
    let marker, link, input;
    let newCommentClass = classnames({
      'waveform-new-comment': true,
      'is-adding-comments': this.state.addingComment
    });

    if (this.state.addingComment) {
      marker = <div className="waveform-new-comment__position-range" onClick={this.handleRangeClick.bind(this)}>
                  <i className="waveform-new-comment__placer" style={{left: this.state.comment.song_moment_percentage + "%"}}></i>
                </div>;
      input = <input type="text" placeholder="Add comment..." value={this.state.comment.comment} onChange={this.handleCommentChange.bind(this)} />
      link = <noscript />;

    } else {
      marker = <noscript/>;
      input = <noscript/>;
      link = <a href="#" onClick={this.handleAddCommentClick.bind(this)}>New Comment</a>;
    }
    return <form className={newCommentClass} onSubmit={this.handleFormSubmit.bind(this)}>
            {marker}
            {link}
            {input}
           </form>;
  }
}
