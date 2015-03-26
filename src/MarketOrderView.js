'use strict';

import React from 'react';
import Immutable from 'immutable';

const awaitingMarketData = 1;
// const awaitingOrder = 2;
// const awaitingOrderAck = 3;
// const orderAckConfirmed = 4;
// const orderAckDenied = 5;
// const orderFilled = 6;
// const orderFailed = 7;

export default class MarketOrderView extends React.Component {
	constructor(props) {
		super(props);
		this.state = new Immutable.Map({
			amount: props.initialAmount,
			state: awaitingMarketData
		});
	}

	handleChange(event) {
		this.setState({
			amount: event.target.value
		});
	}

	render() {
		return (
			<div className="MarketOrderTicket">
				<span className="MarketOrderTicket__instrument">{this.context.flux.getStore('active-order').state.instrument}</span>
				<input type="number" className="MarketOrderTicket__amount" value={this.state.get('amount')}
					onChange={this.handleChange.bind(this)}/>
			</div>
		);
	}
}

MarketOrderView.propTypes = {
	initialAmount: React.PropTypes.number.isRequired
};

MarketOrderView.defaultProps = {
	initialAmount: 0
};

MarketOrderView.contextTypes = {
	flux: React.PropTypes.any.isRequired
};
