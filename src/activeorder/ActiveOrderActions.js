'use strict';

import { Actions } from 'flummox';

export default class ActiveOrderActions extends Actions {
	constructor(instrument) {
		this.instrument = instrument;
	}

	updateOrder(orderUpdate) {
		return orderUpdate;
	}

	commitOrder() {
		// TODO: create subscription (or throw error if this is going to be used as a base class?)
	}

	updateFilledAmount(filledAmount) {
		return filledAmount;
	}
}
