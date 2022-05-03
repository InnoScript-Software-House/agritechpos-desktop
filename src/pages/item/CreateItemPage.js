import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { t, zawgyi } from '../../utilities/translation.utility';
import { ItemCreateComponent } from '../../components/items/ItemCreateComponent';
import { getCategories } from '../../services/category.service';
import { messageBoxType } from '../../utilities/native.utility';

class CreateItemPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoriesList: []
    }
  }

  async loadingCategory () {
    const categoryResponse = await getCategories();

    if(categoryResponse && categoryResponse.success === false) {
      window.nativeApi.messageBox.open({title: t('title-item-create'), message: categoryResponse.message, type: messageBoxType.info});
      return;
    }

    this.setState({
      categoriesList: categoryResponse
    });
  }

  componentDidMount() {
    const { history } = this.props;

    window.nativeApi.app.navigateTo((url) => {
      history.push(url);
    });

    this.loadingCategory();
  }

  render() {
    const { lang } = this.props.reducer;
    return(
      <div className='container-fluid'>
        <div className='row mt-1'>
          <div className='col-md-3'>
            <ItemCreateComponent categoriesList={this.state.categoriesList} />
          </div>
        </div>
      </div>
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
)(withRouter(CreateItemPage));
