'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';
import OrderBookRecord from './OrderBookRecord';

export default class OrderBookStore extends Store {
	constructor(flux) {
		super();

		this.register(flux.getActions('order-book').update, this.handleUpdates);
		this.register(flux.getActions('order-book').updateWindow, this.handleWindowUpdate);
		this.state = new OrderBookRecord();
	}

	handleUpdates(orderUpdates) {
		this.updateState(this.state.mergeDeep(orderUpdates));
	}

	handleWindowUpdate(windowUpdate) {
		const fromPrice = windowUpdate.fromPrice;
		const toPrice = windowUpdate.toPrice;

		this.updateState(
			this.state.withMutations(function(mutableState) {
				for(var price in this.state.orders) {
					if((price < fromPrice) || (price > toPrice)) {
						mutableState.remove(price);
					}
				}
			})
		);
	}
}
