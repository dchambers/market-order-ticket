'use strict';

/*
order {
	instrument: <instrument>,
	type: long|short,
	amount: <amount>,
	[price-limit: <price-limit>,]
	[time-limit: <time-limit>,]
	[amount-limit: <amount-limit>]
}

Market Order: time limit (usually till market close)
Limit Order: price limit
Immediate or Cancel: price & time limit
Fill or Kill: price, time & amount limit

Instrument: XXX
Amount: ___
Price Variance: [0.1%|1%|5%|Any]
Duration: [Now|1 day|Indefinitely]
Amount: [All or nothing|As many as possible]
[Long] / [Short]
Filled: [X %] [Cancel]


You can't model a stop-loss/take-profit like this, though this could be done off exchange by issuing new limit orders.
You can't prevent limit hunting like this, though this could be done off-excahnge by dynamically issuing orders.

instrument (prop)
amount (user input state)
longPrice (state derived from order book)
shortPrice (state derived from order book)
state: awaitingMarketData -> awaitingOrder -> awaitingOrderAck -> (orderAckConfirmed) | (orderAckDenied -> awaitingOrder)
(component managed state)
amountVolumeHistogram (state derived from order book)
*/

import React from 'react';
import Immutable from 'immutable';
import Flux from './Flux';
import InnerComponent from './InnerComponent';

export default class MarketOrderTicket extends React.Component {
	constructor(props) {
		super(props);
		this.state = new Immutable.Map({
			amount: props.initialAmount
		});
	}

	getChildContext() {
		return {
			flux: new Flux(),
			componentName: 'MarketOrderTicket'
		};
	}

	handleChange(event) {
		this.setState({
			amount: event.target.value
		});
	}

	render() {
		return (
			<div className="MarketOrderTicket">
				<span className="MarketOrderTicket__instrument">{this.props.instrument}</span>
				<input type="number" className="MarketOrderTicket__amount" value={this.state.get('amount')}
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

MarketOrderTicket.defaultProps = {
	initialAmount: 0
};

MarketOrderTicket.childContextTypes = {
	componentName: React.PropTypes.string.isRequired,
	flux: React.PropTypes.any.isRequired
};
