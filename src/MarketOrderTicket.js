'use strict';

/*
Global Stores:
	Orders Store: list of orders, including pending orders (from the site / local storage), active orders (from the
exchange), and completed orders (from Ethereum).
	Position Store: list of active positions (derived from the order store).

Ticket Stores:
	Order Store: a single pending or active order from the Orders Store
	OrderBook Store: created on an as needed basis by tickets.
	OrderQuote Store: returns indicative long and short prices given an instrument and an amount.

---

The Flux for a particular ticket will contain an Order Store containing a single order from the Order X Store.

---

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
state: awaitingMarketData -> awaitingOrder -> awaitingOrderAck -> (orderAckConfirmed -> orderFilled | orderFailed) | (orderAckDenied -> awaitingOrder)
(component managed state)
amountVolumeHistogram (state derived from order book)
*/

import FluxComponent from 'flummox/component';
import React from 'react';
import Immutable from 'immutable';
import InnerComponent from './InnerComponent';

const awaitingMarketData = 1;
// const awaitingOrder = 2;
// const awaitingOrderAck = 3;
// const orderAckConfirmed = 4;
// const orderAckDenied = 5;
// const orderFilled = 6;
// const orderFailed = 7;

export default class MarketOrderTicket extends React.Component {
	constructor(props) {
		super(props);
		this.state = new Immutable.Map({
			amount: props.initialAmount,
			state: awaitingMarketData,
			longPrice: null,
			shortPrice: null
		});
	}

	getChildContext() {
		return {
			flux: this.props.flux,
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
			<FluxComponent connectToStores={['active-order', 'order-book', 'order-quote']}>
				<div className="MarketOrderTicket">
					<span className="MarketOrderTicket__instrument">{this.props.flux.instrument}</span>
					<input type="number" className="MarketOrderTicket__amount" value={this.state.get('amount')}
						onChange={this.handleChange.bind(this)}/>
					<InnerComponent/>
				</div>
			</FluxComponent>
		);
	}
}

MarketOrderTicket.propTypes = {
	flux: React.PropTypes.any.isRequired,
	initialAmount: React.PropTypes.number.isRequired
};

MarketOrderTicket.defaultProps = {
	initialAmount: 0
};

MarketOrderTicket.childContextTypes = {
	componentName: React.PropTypes.string.isRequired,
	flux: React.PropTypes.any.isRequired
};
