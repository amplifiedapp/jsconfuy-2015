import Immutable from 'immutable'

export default Immutable.fromJS({
  currentRehearsedSong: {
    name: 'Test 10',
    description: 'Song Description',
    rehearsedIn: 'Abbey Road',
    rehearsedAt: '2015-03-20',
    song: {
      duration: '04:16',
      waveformData: [130,134,133,41,35,72,136,98,42,69,131,129,56,49,43,135,51,45,71,133,67,52,137,136,87,42,139,136,130,106,92,134,138,112,108,138,133,102,132,130,133,137,137,137,135,140,139,138,137,140,139,139,138,139,135,137,132,139,137,139,131,137,133,138,132,136,139,135,139,130,138,127,130,129,139,133,133,140,138,139,139,127,136,139,139,139,139,138,128,135,139,139,139,125,131,139,139,139,131,139,139,140,136,136,123,134,129,139,137,134,139,139,139,139,139,132,140,139,132,134,131,131,126,137,135,137,137,119,137,131,134,137,134,136,133,132,135,129,118,119,132,139,139,133,129,127,139,133,139,137,138,139,139,139,140,131,134,133,138,139,136,138,132,137,138,135,119,140,134,137,133,130,121,139,133,139,139,137,139,135,140,140,139,136,140,139,139,138,136,135,135,139,139,136,133,130,140,135,139,139,137,139,133,135,134,139,132,127,134,136,133,132,136,139,138,136,136,139,139,140,137,138,139,120,132,134,139,140,131,127,131,131,137,129,132,139,134,128,136,135,139,118,133,140,137,135,138,137,136,139,132,140,138,139,137,136,133,135,130,134,139,127,127,127,139,129,139,127,139,135,130,137,139,130,126,133,137,134,140,138,134,135,139,135,136,136,139,134,132,140,138,135,137,138,139,134,133,136,139,134,139,138,137,138,137,138,137,121,139,130,139,138,139,138,139,139,139,139,135,139,133,139,139,135,129,135,134,139,134,128,130,133,124,129,136,134,130,133,138,131,133,138,134,139,137,137,139,140,131,134,130,104,133,133,127,120,128,137,87,120,134,135,130,128,130,131,127,138,112,136,136,126,108,132,126,138,130,124,133,139,137,134,133,120,139,119,139,135,109,118,130,116,123,137,135,130,129,132,139,139,129,132,132,138,135,116,136,133,109,136,139,140,133,125,129,128,139,137,139,140,137,139,139,137,135,134,128,132,139,139,127,132,132,135,129,139,124,140,127,136,134,137,140,136,140,140,134,139,139,134,131,138,128,133,139,139,128,133,135,128,130,139,139,135,115,127,133,127,134,126,138,137,131,116,126,139,110,137,134,140,139,139,139,136,139,139,127,138,133,131,132,130,127,84,121,136,139,131,101,122,137,112,139,123,139,139,117,124,129,128,94,137,138,140,135,138,131,138,135,139,120,138,139,129,132,132,120,110,135,137,137,133,102,131,136,119,135,130,136,136,133,130,135,125,135,139,139,139,139,126,137,139,138,139,137,139,131,138,136,140,138,135,139,136,134,139,130,138,138,127,127,130,136,129,132,121,139,137,140,137,139,139,139,138,139,139,139,140,126,139,138,139,139,139,132,135,134,140,136,138,136,134,138,138,136,138,137,137,134,126,139,118,128,134,136,135,136,139,132,135,138,140,136,139,136,132,137,134,113,135,128,140,135,136,135,137,137,139,131,140,139,131,131,133,130,109,133,134,139,139,134,131,134,140,139,139,139,138,131,130,139,136,131,133,139,134,135,134,139,139,139,139,128,139,139,135,136,133,125,134,131,137,137,137,135,139,133,137,139,132,139,137,139,139,140,131,138,139,137,135,131,138,137,139,134,138,135,139,131,132,136,139,105,134,132,139,140,123,113,132,107,103,115,132,138,90,83,73,130,73,82,95,137,128,108,119,131,82,77,96,135,130,116,113,105,134,63,86,90,139,84,124,108,138,122,85,99,136,114,75,65,128,93,56,82,92,134,101,67,69,136,114,123,117,137,82,121,126,136,119,80,98,120,139,130,139,135,128,115,139,137,139,112,107,99,134,120,129,135,136,130,116,135,118,132,123,134,131,134,128,124,118,128,78,93,96,137,132,135,128,131,131,88,89,94,136,81,79,88,129,88,94,100,140,84,119,100,137,122,123,120,113,134,92,112,113,131,119,96,129,137,134,139,129,137,122,137,130,137,139,108,115,98,131,118,135,130,138,134,131,133,136,123,132,128,138,139,110,125,109,135,81,79,109,139,89,128,128,137,112,87,93,132,98,85,91,139,114,78,91,87,132,82,124,118,136,136,130,133,139,129,135,122,134,135,128,125,135,136,136,135,133,136,80,134,99,84,131,95,82,137,100,128,106,87,135,130,94,83,132,113,132,102,116,139,115,82,135,113,129,112,102,134,117,102,140,139,130,121,105,114,113,97,36,70,44,20,99,87,101,83,67,79,64,27,27,100,90,92,80,37,45,91,23,99,103,98,95,92,76,77,30,98,100,95,75,98,43,53,88,22,102,99,99,93,56,100,89,31,96,102,99,83,35,22,62,83,16,81,99,76,117,87,102,98,81,96,100,94,98,44,60,96,22,26,76,98,101,93,55,64,83,23,100,102,98,99,38,99,100,21,93,101,74,96,124,82,51,96,44,94,99,97,98,53,92,55,36,102,101,95,98,58,84,85,98,37,83,98,97,100,54,61,97,25,93,99,101,110,104,93,108,112,112,136,120,117,118,129,97,124,115,131,129,121,115,129,106,103,107,115,127,117,111,122,129,111,123,103,131,124,129,135,133,95,92,130,131,135,122,133,118,126,115,109,110,130,121,127,122,135,106,110,132,129,127,110,119,131,77,96,127,108,131,114,132,132,130,124,126,134,135,134,126,124,131,94,108,85,123,130,126,130,122,128,94,99,118,131,122,135,124,133,109,111,118,129,133,118,125,133,127,108,126,115,129,127,134,132,134,126,135,125,135,133,133,134,138,124,131,132,133,129,134,131,137,119,133,135,137,133,136,138,137,139,137,139,131,124,125,123,123,121,118,118,111,113,109,128,122,100,115,116,114,122,124,99,127,99,114,122,127,110,137,140,137,122,136,136,136,138,137,136,128,139,133,134,135,138,130,137,134,139,133,128,133,132,120,130,130,139,139,124,128,119,132,112,128,134,139,123,132,132,135,137,138,131,139,139,132,125,133,121,94,133,128,139,134,112,130,130,129,132,133,139,139,131,121,135,125,113,133,131,136,118,139,133,137,128,138,123,139,135,134,129,134,130,109,139,136,137,124,114,127,137,137,131,129,135,128,136,129,138,132,131,137,140,139,135,131,131,140,140,138,133,139,133,139,139,138,137,137,135,138,135,137,130,133,138,129,135,130,139,136,127,127,138,135,138,137,138,133,138,134,134,133,139,122,131,126,119,128,120,131,119,124,132,132,139,118,123,138,124,136,117,97,65,132,139,81,128,129,116,135,138,136,134,122,136,140,132,132,140,139,137,139,139,139,129,138,140,139,137,139,137,139,136,139,137,136,138,139,135,139,131,138,132,129,140,140,137,137,135,136,136,129,139,139,137,140,138,138,129,139,139,139,134,140,138,139,139,140,131,139,138,137,136,139,126,131,132,139,139,139,136,140,139,138,139,130,140,139,139,134,139,139,138,135,138,139,139,139,139,139,140,137,128,139,140,138,139,136,134,139,134,136,131,140,139,135,132,139,133,133,136,133,139,138,139,132,137,137,139,137,135,137,139,137,140,139,139,140,139,139,132,137,135,136,131,139,137,137,139,139,139,139,133,139,138,131,139,137,138,120,139,134,139,135,140,140,139,136,140,137,139,140,139,138,136,135,138,129,135,139,137,138,139,135,139,134,130,139,135,138,140,140,136,137,139,139,139,139,137,135,138,138,138,137,140,140,136,137,139,137,139,132,137,134,140,136,139,140,134,139,137,140,136,138,140,139,133,139,139,138,139,138,137,137,139,137,139,133,139,140,140,138,139,137,138,138,139,136,139,139,132,139,137,129,132,138,139,139,138,137,129,140,134,140,139,139,139,138,140,139,139,130,139,139,139,139,139,127,139,138,139,140,138,140,138,130,135,134,133,136,133,136,127,137,134,133,135,133,128,123,130,136,132,136,138,136,133,130,127,118,136,133,133,135,132,114,130,121,139,139,138,135,135,132,131,137,136,135,128,134,126,133,112,134,121,140,138,132,139,132,128,136,134,137,129,110,89,51,62,46,47,32,34,27,28,20,19,16,13,14,9,11,6,7,5,6,3,4,2,3,2,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
      audio: 'http://localhost:3000/assets/song/song1.mp3'
    }
  }
});
