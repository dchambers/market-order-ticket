'use strict';

// TODO: understand what to do with all of this boilerplate
import { Actions, Store, Flummox } from 'flummox';

class MessageActions extends Actions {
	newMessage(content) {
console.log('new message: ' + content);
		return content; // automatically dispatched
	}
}

class MarketOrderStore extends Store {
	constructor(flux) {
		super();

		const messageActions = flux.getActions('messages');
		this.register(messageActions.newMessage, this.handleNewMessage);
		this.messageCounter = 0;

		this.state = {};
	}

	handleNewMessage(content) {
		const id = this.messageCounter++;

		this.setState({
			[id]: {
				content,
				id
			}
		});
	}
}

export default class Flux extends Flummox {
	constructor() {
		super();

		this.createActions('messages', MessageActions);
		this.createStore('marketOrderStore', MarketOrderStore, this);
	}
}
