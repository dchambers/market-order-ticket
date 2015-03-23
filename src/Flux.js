'use strict';

// TODO: allow the action classes to be passed in so things can work differently in tests vs the app
import { Flummox } from 'flummox';
import ActiveOrderActions from './activeorder/ActiveOrderActions';
import ActiveOrderStore from './activeorder/ActiveOrderStore';
import OrderBookStore from './orderbook/OrderBookStore';
import OrderBookActions from './orderbook/OrderBookActions';
import OrderQuoteStore from './orderquote/OrderQuoteStore';
import OrderQuoteActions from './orderquote/OrderQuoteActions';

export default class Flux extends Flummox {
	constructor(instrument) {
		// TODO: type check all constructor arguments
		super();

		this.instrument = instrument;

		this.createActions('active-order', ActiveOrderActions, instrument);
		this.createActions('order-book', OrderBookActions, instrument);
		this.createActions('order-quote', OrderQuoteActions, instrument);

		this.createStore('active-order', ActiveOrderStore, this);
		this.createStore('order-book', OrderBookStore, this);
		this.createStore('order-quote', OrderQuoteStore, this);
	}
}
