'use strict';

import { Actions } from 'flummox';

export default class OrderQuoteActions extends Actions {
	constructor(instrument) {
		this.instrument = instrument;
	}

	setAmount(amount) {
		// TODO: create subscription (or throw error if this is going to be used as a base class?)
	}

	updateQuote(quote) {
		return quote;
	}
}
