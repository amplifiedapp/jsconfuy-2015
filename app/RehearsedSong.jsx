import React from 'react'
import PageTitle from './PageTitle'
import SongPlayer from './SongPlayer'

export default class RehearsedSong extends React.Component {
  render() {
    return <div>
      <PageTitle>{this.props.rehearsedSong.get('name')}</PageTitle>
      <p>{this.props.rehearsedSong.get('description')}</p>
      <p>Rehearsed at {this.props.rehearsedSong.get('rehearsedIn')} , on {this.props.rehearsedSong.get('rehearsedAt')}</p>
      <p>Duration: {this.props.rehearsedSong.get('duration')}</p>
      <SongPlayer song={this.props.rehearsedSong}/>
    </div>;
  }
}
