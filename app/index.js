import React from 'react'
import Bacon from 'baconjs'
import Immutable from 'immutable'
import App from './app'

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
  console.log(`rendering ${state.toString()}`);
  return <App state={state} inputs={inputs}/>
}

function bootstrapApp(mountPoint) {
  const inputs = new Bacon.Bus();
  const initialState = Immutable.Map({
    counter: 0
  });

  inputs
    .scan(initialState, update)
    .map((state) => view(state, inputs))
    .onValue((element) => {
      React.render(element, document.getElementById('app'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApp(document.getElementById('app'));
});
