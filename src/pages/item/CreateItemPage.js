import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { t, zawgyi } from '../../utilities/translation.utility';
import { ItemCreateComponent } from '../../components/items/ItemCreateComponent';
import { getCategories } from '../../services/category.service';
import { messageBoxType } from '../../utilities/native.utility';
import { CreateCategoryComponent } from '../../components/category/CreateCategoryComponent';
import { CategoryListTableComponent } from '../../components/category/CategoryListTableComponent';
import { BiCategory } from "react-icons/bi";
import { Card } from 'react-bootstrap';

class CreateItemPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      categoriesTotal : 0
    }
    
  }

  async loadingCategory() {
    const categoryResponse = await getCategories();
    console.log(categoryResponse)
    if (categoryResponse && categoryResponse.success === false) {
      window.nativeApi.messageBox.open({ title: t('title-item-create'), message: categoryResponse.message, type: messageBoxType.info });
      return;
    }

    this.setState({
      categoriesList: categoryResponse,
      categoriesTotal : categoryResponse.length
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
    

    return (
      <div className='container-fluid'>
        <div className='row mt-1'>
          <div className='col-md-3'>
            <ItemCreateComponent categoriesList={this.state.categoriesList} />
          </div>
          <div className='col-md-9'>
            <div className='row'>
              <div className='col-md-6'>
                <CreateCategoryComponent />
              </div>
              <div className='col-md-6 mt-3'>
                <Card>
                  <Card.Header className='card-success'>
                    <Card.Title className={`${zawgyi(lang)}`}> {t('total-categories')} </Card.Title>
                  </Card.Header>

                  <Card.Body>
                    <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                      <BiCategory size={50} color="#4E8D28" />
                      <label className='label-count'> {this.state.categoriesTotal}  </label>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-12'>
                <CategoryListTableComponent props={this.props} categoriesList={this.state.categoriesList} reload={() => this.loadingCategory()} />
              </div>
            </div>
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
