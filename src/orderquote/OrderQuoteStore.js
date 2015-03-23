'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';
import OrderQuoteRecord from './OrderQuoteRecord';

export default class OrderQuoteStore extends Store {
	constructor(flux) {
		super();

		this.register(flux.getActions('order-quote').updateQuote, this.handleQuoteUpdate);
		this.state = new OrderQuoteRecord();
	}

	handleQuoteUpdate(quoteUpdate) {
		this.updateState(this.state.merge(quoteUpdate));
	}
}
