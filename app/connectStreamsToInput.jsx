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
      this.connectToInput(mergeFn.apply(null, this.buses));
    }

    componentWillUnmount() {
      this.buses.forEach((bus) => bus.end());
    }

    connectToInput(stream) {
      const processResult = (streamResult) => {
        if (streamResult instanceof Bacon.Observable) {
          return streamResult;
        } else if (typeof streamResult === 'function') {
          return processResult(streamResult(this.context.state));
        } else {
          return Bacon.once(streamResult);
        }
      };

      stream = stream.flatMapLatest(processResult);
      return (this.props.inputs || this.context.inputs).plug(stream);
    }

    render() {
      return <Component {...this.props} {...this.streamProps} />;
    }
  }
  WithStreams.contextTypes = {
    inputs: React.PropTypes.object,
    state: React.PropTypes.object
  };
  return WithStreams;
};
