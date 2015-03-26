'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';
import ActiveOrderRecord from './ActiveOrderRecord';

export default class ActiveOrderStore extends Store {
	constructor(flux, instrument) {
		super();

		this.register(flux.getActions('active-order').updateOrder, this.handleOrderUpdate);
		this.state = (new ActiveOrderRecord()).set('instrument', instrument);
	}

	handleOrderUpdate(orderUpdate) {
		this.updateState(this.state.merge(orderUpdate));
	}
}
