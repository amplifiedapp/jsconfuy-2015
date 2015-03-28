import React from 'react'
import 'waveform'

export default class SongWaveform extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      let container = React.findDOMNode(this);
      let data = this.props.waveformData;
      this.waveform = new Waveform({
        container: container,
        width: container.getBoundingClientRect().width,
        height: 140,
        data: data.map((d) => d / 140).toArray(),
        innerColor: (percentageX) => {
          switch (false) {
            case !((percentageX * 100) <= this.props.playedPercentage):
              return '#fe5000';
            case !((percentageX * 100) <= this.props.loadedPercentage):
              return '#0a0a0a';
            default:
              return '#a0a0a0';
          }
        }
      });
    }, 0);
  }

  componentDidUpdate() {
    this.waveform.redraw();
  }

  render() {
    return <div className='waveform' onClick={this.handleWaveformClick.bind(this)}></div>;
  }

  handleWaveformClick(ev) {
    const percentage = (ev.nativeEvent.offsetX / ev.target.offsetWidth) * 100;
    if (this.props.onSongSeek) {
      this.props.onSongSeek(percentage);
    }
  }
}

