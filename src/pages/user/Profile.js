import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';

class ProfilePage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Navigation props={this.props} />
        <h3> Profile Screen </h3>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
    reducer: state
});
  
const mapDispatchToProps = (dispatch) => ({
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProfilePage));