'use strict';

import React from 'react';
import {jsdom} from 'jsdom';
import {expect} from 'chai';
import Flux from './Flux';
import MarketOrderTicket from '../src/MarketOrderTicket';

describe('MarketOrderTicket', function() {
	let flux = new Flux();

	beforeEach(function() {
		global.document = jsdom('<html><body></body></html>');
		global.window = document.defaultView;
	});

	it('starts with an amount of 0 by default', function() {
		React.withContext({flux}, () => React.render(<MarketOrderTicket/>, document.body));
		expect(document.body.querySelector('.MarketOrderTicket__amount').value).to.equal('0');
	});

	it('can be configured to start with a different amount', function() {
		React.withContext({flux}, () => React.render(<MarketOrderTicket initialAmount={100}/>, document.body));
		expect(document.body.querySelector('.MarketOrderTicket__amount').value).to.equal('100');
	});
});
