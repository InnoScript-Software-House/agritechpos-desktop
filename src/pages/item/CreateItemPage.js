import React, { Component } from 'react'

export default class CreateItemPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { history } = this.props;

        window.nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });
    }
  render() {
    return (
      <div>CreateItemPage</div>
    )
  }
}
