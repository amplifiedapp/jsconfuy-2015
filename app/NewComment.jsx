import React from "react";
import classnames from "classnames";
import connectStreamsToInput from "./connectStreamsToInput";
import intents from "./intents";
import Immutable from "immutable";

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song_moment_percentage: 0
    };
  }

  handleRangeClick(ev) {
    const percentage = (ev.nativeEvent.offsetX / ev.target.offsetWidth * 100);
    this.setState({song_moment_percentage: percentage});
  }

  handleFormSubmit(ev) {
    ev.preventDefault();
    const commentText = this.refs.commentText.getDOMNode().value;

    if(commentText !== "") {
      let comment = {
        cid: Math.floor(Math.random() * (100000 - 100 + 1)) + 100,
        user: {
          avatar_url: 'http://www.gravatar.com/avatar/1eb5eb46d5a4289d3528426b1626c2bb.png',
          full_name: "Sergio Rafael Gianazza"
        },
        song_moment_percentage: this.state.song_moment_percentage,
        song_moment: '100',
        comment: commentText
      }
      this.props.createComment(comment);
    }

    this.setState({
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
      'is-adding-comments': this.props.addingComment
    });

    if (this.props.addingComment) {
      marker = <div className="waveform-new-comment__position-range" onClick={this.handleRangeClick.bind(this)}>
                  <i className="waveform-new-comment__placer" style={{left: this.state.song_moment_percentage + "%"}}></i>
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

function mergeStreams(createComment, newComment) {
  return createComment.map(comment => Immutable.fromJS(comment)).map(intents.createComment)
                      .merge(newComment.doAction('.preventDefault').map(intents.newComment));
}

export default connectStreamsToInput(NewComment, ["createComment", "newComment"], mergeStreams);
