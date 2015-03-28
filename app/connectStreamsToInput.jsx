import React from 'react'
import Bacon from 'baconjs'

export default function connectStreamsToInput(Component, sources, mergeFn) {
  class WithStreams extends React.Component {
    componentWillMount() {
      this.streamProps = {};
      this.buses = [];
      sources.forEach((streamName) => {
        const bus = new Bacon.Bus();
        this.buses.push(bus);
        this.streamProps[streamName] = function sendEventToStream(event) {
          bus.push(event);
        };
      });
      this.connectToInput(mergeFn.apply(null, [this.context.intents].concat(this.buses)));
    }

    componentWillUnmount() {
      this.buses.forEach((bus) => bus.end());
    }

    connectToInput(stream) {
      return (this.props.inputs || this.context.inputs).plug(stream);
    }

    render() {
      return <Component {...this.props} {...this.streamProps} />;
    }
  }
  WithStreams.contextTypes = {
    inputs: React.PropTypes.object,
    intents: React.PropTypes.object
  };
  return WithStreams;
}
