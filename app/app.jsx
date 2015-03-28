import React from 'react'
import RehearsedSong from './RehearsedSong'

export default class App extends React.Component {
  render() {
    return <RehearsedSong rehearsedSong={this.props.state.get('currentRehearsedSong')}/>;
  }

  getChildContext() {
    return {
      inputs: this.props.inputs,
      intents: this.props.intents,
    }
  }
}

App.childContextTypes = {
  inputs: React.PropTypes.object,
  intents: React.PropTypes.object,
}
