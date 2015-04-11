import React from "react";
import classnames from "classnames";
import connectStreamsToInput from "./connectStreamsToInput";
import intents from "./intents";
import Immutable from "immutable";

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songMomentPercentage: 0
    };
  }

  handleRangeClick(ev) {
    const percentage = (ev.nativeEvent.offsetX / ev.target.offsetWidth * 100);
    this.setState({songMomentPercentage: percentage});
  }

  handleFormSubmit(ev) {
    ev.preventDefault();
    const commentText = this.refs.commentText.getDOMNode().value;

    if(commentText !== "") {
      let comment = {
        songMomentPercentage: this.state.songMomentPercentage,
        comment: commentText
      }
      this.props.createComment(comment);
    } else {
      this.props.hideNewComment();
    }

    this.setState({ songMomentPercentage: 0 });
  }

  render() {
    let marker, link, input;
    let newCommentClass = classnames({
      'waveform-new-comment': true,
      'is-adding-comments': this.props.addingComment
    });

    if (this.props.addingComment) {
      marker = <div className="waveform-new-comment__position-range" onClick={this.handleRangeClick.bind(this)}>
                  <i className="waveform-new-comment__placer" style={{left: this.state.songMomentPercentage + "%"}}></i>
                </div>;
      input = <input type="text" placeholder="Add comment..." ref="commentText" />;
      link = <noscript />;

    } else {
      marker = <noscript/>;
      input = <noscript/>;
      link = <a href="#" onClick={this.props.newComment}>New Comment</a>;
    }
    return <form className={newCommentClass} onSubmit={this.handleFormSubmit.bind(this)}>
            {marker}
            {link}
            {input}
           </form>;
  }
}

function mergeStreams(createComment, newComment, hideNewComment) {
  return createComment.map(intents.createComment)
                      .merge(newComment.doAction('.preventDefault').map(intents.newComment))
                      .merge(hideNewComment.map(intents.hideNewComment));
}

export default connectStreamsToInput(NewComment, ["createComment", "newComment", "hideNewComment"], mergeStreams);
