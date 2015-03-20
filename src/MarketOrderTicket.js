'use strict';

/*
instrument (prop)
amount (user input state)
longPrice (state derived from order book)
shortPrice (state derived from order book)
state: awaitingMarketData -> awaitingOrder -> awaitingOrderAck -> (orderAckConfirmed) | (orderAckDenied -> awaitingOrder)
(component managed state)
amountVolumeHistogram (state derived from order book)
*/

import React from 'react';
import Flux from './Flux';
import InnerComponent from './InnerComponent';

export default class MarketOrderTicket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {amount:props.initialAmount};
	}

	getChildContext() {
		return {flux: new Flux(), componentName: 'MarketOrderTicket'};
	}

	handleChange(event) {
		this.setState({amount: event.target.value});
	}

	render() {
		return (
			<div className="MarketOrderTicket">
				<span className="MarketOrderTicket__instrument">{this.props.instrument}</span>
				<input type="number" className="MarketOrderTicket__amount" value={this.state.amount}
				 onChange={this.handleChange.bind(this)}/>
				<InnerComponent/>
			</div>
		);
	}
}

MarketOrderTicket.propTypes = {
	instrument: React.PropTypes.string.isRequired,
	initialAmount: React.PropTypes.number.isRequired
};

MarketOrderTicket.defaultProps = { initialAmount: 0 };

MarketOrderTicket.childContextTypes = {
	componentName: React.PropTypes.string.isRequired,
	flux: React.PropTypes.any.isRequired
};
