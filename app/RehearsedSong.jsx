import React from 'react'
import PageTitle from './PageTitle'
import SongPlayer from './SongPlayer'

export default class RehearsedSong extends React.Component {
  render() {
    return <div>
      <PageTitle>Hola</PageTitle>
      <p>Song desc</p>
      <p>Rehearsed at Abbey Road, on 2015-03-20</p>
      <p>Duration: 04:36</p>
      <SongPlayer />
    </div>
  }
}
