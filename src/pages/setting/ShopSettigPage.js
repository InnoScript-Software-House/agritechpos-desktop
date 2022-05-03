import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import {t} from 'i18next';
import { ShopCreateForm } from './ShopSetting/ShopCreateForm';
import { ShopEditForm } from './ShopSetting/ShopEditForm';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { getShop } from '../../services/shop.service';

class ShopSettigPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shop: null
		};
	}

	getShopInfo(e) {
		this.setState({
			shop: e
		});
	}

	async loadingData() {
		const response = await getShop();
		if (response) {
			this.setState({
				shop: response
			});
		}
	}

	async componentDidMount() {
		const {history} = this.props;
		await this.loadingData();

		nativeApi.app.navigateTo(url => {
			history.push(url);
		});
	}
	render() {
		const {props, shop} = this.state;
		return (
			<div className="row mt-3">
				<div className="col-md-4">
					<Card>
						<Card.Header>
							<Card.Title> {t('shop-information')} </Card.Title>
						</Card.Header>

						{shop && (
							<Card.Body>
								<Card.Text className="d-flex flex-row justify-content-between">
									<label className="me"> {t('name')} </label>
									<label> {shop.name} </label>
								</Card.Text>

								<Card.Text className="d-flex flex-row justify-content-between">
									<label className="me"> {t('description')} </label>
									<label>{shop.description}</label>
								</Card.Text>

								<Card.Text className="d-flex flex-row justify-content-between">
									<label className="me"> {t('phone')} </label>
									<label> {shop.phone} </label>
								</Card.Text>

								<Card.Text className="d-flex flex-row justify-content-between">
									<label className="me"> {t('email')} </label>
									<label> {shop.email} </label>
								</Card.Text>

								<Card.Text className="d-flex flex-row justify-content-between">
									<label className="me"> {t('address')} </label>
									<label>{shop.address}</label>
								</Card.Text>
							</Card.Body>
						)}
					</Card>
				</div>

				<div className="col-md-8">
					{shop === null ? (
						<ShopCreateForm props={props} retrive={e => this.getShopInfo(e)} />
					) : (
						<ShopEditForm props={props} dataSource={shop} retrive={e => this.getShopInfo(e)} />
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	reducer: state
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapDispatchToProps , mapStateToProps)(withRouter(ShopSettigPage));
