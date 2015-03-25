import React from 'react'
import connectStreamsToInput from './connectStreamsToInput'
import RehearsedSong from './RehearsedSong'

export default class App extends React.Component {
  render() {
    return <RehearsedSong rehearsedSong={this.props.state.get('currentRehearsedSong')}/>
  }
}
