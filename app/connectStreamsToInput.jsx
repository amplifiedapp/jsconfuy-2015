import React from 'react'
import Bacon from 'baconjs'

export default function connectStreamsToInput(Component, streams) {
  return class extends React.Component {
    componentWillMount() {
      this.streamProps = {};

      Object.keys(streams).forEach((streamName) => {
        this.props.inputs.plug(streams[streamName](this.eventStream(streamName)))
      })
    }

    componentWillUnmount() {
      var bacon = this._bacon;
      if (bacon) {
        var eventBuses = bacon['buses.events'];
        if (eventBuses) {
          for (var eventName in eventBuses) {
            eventBuses[eventName].end();
          }
        }
      }
    }

    eventStream(eventName) {
      var bacon = this._bacon = this._bacon || {};
      var buses = bacon['buses.events'] = bacon['buses.events'] || {};
      var bus = buses[eventName];
      if (!bus) {
        bus = buses[eventName] = new Bacon.Bus();
        this.streamProps[eventName] = function sendEventToStream(event) {
          bus.push(event);
        };
      }
      return bus;
    }

    render() {
      return <Component {...this.props} {...this.streamProps} />
    }
  }
}
