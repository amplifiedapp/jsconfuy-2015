import React from 'react'
import Bacon from 'baconjs'
import Immutable from 'immutable'
import App from './app'
import './soundmanager2_setup'
import initialState from './initialState'
import update from './update'
import intents from './intents'

function boundIntents(state) {
  return Object.keys(intents).reduce(function(bound, intentName) {
    bound[intentName] = intents[intentName].bind(null, state);
    return bound;
  }, {});
}

function view(state, inputs) {
  console.log(state.toJS());
  return <App
    state={state}
    inputs={inputs}
    intents={boundIntents(state)}
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
