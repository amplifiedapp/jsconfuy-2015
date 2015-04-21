import React from 'react'

export default class Sound extends React.Component {
  componentDidMount() {
    this.createSound();
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.createSound();
    }

    if (this.props.playStatus === 'PLAYING') {
      if (prevProps.playStatus === 'STOPPED') {
        this.sound.play();
      } else if (prevProps.playStatus === 'PAUSED') {
        this.sound.resume();
      }
    } else if (this.props.playStatus === 'STOPPED' && prevProps.playStatus !== 'STOPPED') {
      this.sound.stop();
    } else {// 'PAUSED'
      if (prevProps.playStatus === 'PLAYING') {
        this.sound.pause();
      }
    }

    if (this.sound.position !== this.props.positionInMs &&
      Math.round(this.sound.position) !== Math.round(this.props.positionInMs)) {

      this.sound.setPosition(this.props.positionInMs);
    }
  }

  createSound() {
    if (this.sound) {
      this.removeSound();
    }

    const props = this.props;

    this.sound = soundManager.createSound({
      url: this.props.url,
      whileloading() {
        props.onLoading({
          loadedPercentage: 100 * this.bytesLoaded / this.bytesTotal
        });
      },
      whileplaying() {
        props.onPlaying({
          positionInMs: this.position
        });
      },
      onfinish() {
        props.onFinishPlaying();
      }
    });
  }

  removeSound() {
    try {
      this.sound.destruct();
    } catch (e) {}

    delete this.sound;
  }

  render() {
    return <noscript />;
  }
}
