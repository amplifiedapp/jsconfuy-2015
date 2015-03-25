import React from 'react'
import connectStreamsToInput from './connectStreamsToInput'

class App extends React.Component {
  render() {
    return <div>
      <h1>Hola mundo!</h1>
      <button onClick={this.props.countUps}>Count up</button>
      {this.props.state.get('counter')}
      <button onClick={this.props.countDowns}>Count down</button>
    </div>
  }
}

export default connectStreamsToInput(App, {
  countUps: (stream) => stream.map(() => 'COUNT_UP'),
  countDowns: (stream) => stream.map(() => 'COUNT_DOWN')
});
