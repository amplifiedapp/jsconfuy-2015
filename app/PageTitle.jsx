import React from 'react'

const T = React.PropTypes;

export default class PageTitle extends React.Component {
  render() {
    return <div className="pageTitle">
      <h1>{this.props.children}</h1>
      {this.props.sideOptions && <div className="pageTitle__sideOptions">
        {this.props.sideOptions}
      </div>}
    </div>
  }
}

PageTitle.propTypes = {
  sideOptions: T.node
};
