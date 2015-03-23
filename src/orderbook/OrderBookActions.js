'use strict';

import { Actions } from 'flummox';

export default class OrderBookActions extends Actions {
	constructor(instrument) {
		this.instrument = instrument;
	}

	centerWindow(ticks, stayCentered = false) {
		// TODO: create subscription (or throw error if this is going to be used as a base class?)
	}

	scrollWindow(refPrice, ticks) {
		// TODO: create subscription (or throw error if this is going to be used as a base class?)
	}

	update(orderUpdates) {
		return orderUpdates;
	}

	updateWindow(fromPrice, toPrice) {
		return {fromPrice, toPrice};
	}
}
