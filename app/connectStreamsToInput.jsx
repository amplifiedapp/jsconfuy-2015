import React from 'react'
import Bacon from 'baconjs'

export default function connectStreamsToInput(Component, streams) {
  return class extends React.Component {
    componentWillMount() {
      this.streamProps = {};
      this.eventBuses = {};

      Object.keys(streams).forEach((streamName) => {
        const streamTransform = streams[streamName];
        this.connectToInput(streamTransform(this.eventStream(streamName)));
      });
    }

    componentWillUnmount() {
      for (let eventName in this.eventBuses) {
        this.eventBuses[eventName].end();
      }
    }

    connectToInput(stream) {
      return this.props.inputs.plug(stream);
    }

    eventStream(eventName) {
      let bus = this.eventBuses[eventName];
      if (!bus) {
        bus = this.eventBuses[eventName] = new Bacon.Bus();
        this.streamProps[eventName] = function sendEventToStream(event) {
          bus.push(event);
        };
      }
      return bus;
    }

    render() {
      return <Component {...this.props} {...this.streamProps} />;
    }
  };
}
