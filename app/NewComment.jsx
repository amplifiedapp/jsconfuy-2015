import React from "react";

export default class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      songMomentPercentage: 0
    };
  }

  componentDidMount() {
    this.refs.commentInput.getDOMNode().focus();
  }

  handleRangeClick(ev) {
    const percentage = (ev.nativeEvent.offsetX / ev.target.offsetWidth * 100);
    this.setState({songMomentPercentage: percentage});
    this.refs.commentInput.getDOMNode().focus();
  }

  handleFormSubmit(ev) {
    ev.preventDefault();
    const commentText = this.state.comment;

    if (commentText !== "") {
      let comment = {
        songMomentPercentage: this.state.songMomentPercentage,
        comment: commentText
      }
      this.props.onNewComment(comment);
    } else {
      this.props.onRequestHide();
    }

    this.setState({ songMomentPercentage: 0 });
  }

  handleCommentTextChange(ev) {
    this.setState({comment: ev.target.value});
  }

  render() {
    return <form className="waveform-new-comment" onSubmit={this.handleFormSubmit.bind(this)}>
            <div className="waveform-new-comment__position-range" onClick={this.handleRangeClick.bind(this)}>
              <i className="waveform-new-comment__placer" style={{left: this.state.songMomentPercentage + "%"}}></i>
            </div>
            <input type="text" placeholder="Add comment..." ref="commentInput" onChange={this.handleCommentTextChange.bind(this)} />
           </form>;
  }
}
