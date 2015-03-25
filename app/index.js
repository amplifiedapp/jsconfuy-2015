import React from 'react'
import Bacon from 'baconjs'
import Immutable from 'immutable'
import App from './app'
import './soundmanager2_setup'
import initialState from './initialState'

function update(state, action) {
  console.log(`updating ${action}`);
  switch (action) {
    case 'COUNT_UP':
      return state.update('counter', (counter) => counter + 1);
    case 'COUNT_DOWN':
      return state.update('counter', (counter) => counter - 1);
    default:
      return state;
  }
}

function view(state, inputs) {
  console.log(`rendering ${state.toJS().toString()}`);
  return <App state={state} inputs={inputs}/>;
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
