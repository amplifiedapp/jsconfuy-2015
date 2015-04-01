import React from 'react'
import Bacon from 'baconjs'
import Immutable from 'immutable'
import App from './App'
import './soundmanager2_setup'
import initialState from './initialState'
import update from './update'
import intents from './intents'

function view(state, inputs) {
  console.log(state.toJS());
  return <App
    state={state}
    inputs={inputs}
  />;
}

function bootstrapApp(mountPoint) {
  const inputs = new Bacon.Bus();

  inputs
    .scan(initialState, update)
    .map((state) => view(state, inputs))
    .onValue((element) => {
      React.render(element, mountPoint);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApp(document.getElementById('app'));
});
