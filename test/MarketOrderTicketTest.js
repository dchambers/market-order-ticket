'use strict';

import React from 'react';
import {jsdom} from 'jsdom';
import {expect} from 'chai';
import MarketOrderTicket from '../src/MarketOrderTicket';

describe('MarketOrderTicket', function() {
	beforeEach(function() {
		global.document = jsdom('<html><body></body></html>');
		global.window = document.defaultView;
	});

	it('starts with an amount of 0 by default', function() {
		React.render(<MarketOrderTicket/>, document.body);
		expect(document.body.querySelector('.MarketOrderTicket__amount').value).to.equal('0');
	});

	it('can be configured to start with a different amount', function() {
		React.render(<MarketOrderTicket initialAmount={100}/>, document.body);
		expect(document.body.querySelector('.MarketOrderTicket__amount').value).to.equal('100');
	});

	it('provides the context to any child components', function() {
		// TODO: this test can be deleted once the ticket genuinely relies on contexts to work
		React.render(<MarketOrderTicket/>, document.body);
		expect(document.body.querySelector('.MarketOrderTicket__name').textContent).to.equal('Dominic');
	});
});
