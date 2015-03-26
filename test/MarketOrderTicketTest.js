'use strict';

import React from 'react';
import {jsdom} from 'jsdom';
import {expect} from 'chai';
import Flux from '../src/Flux';
import MarketOrderTicket from '../src/MarketOrderTicket';

describe('MarketOrderTicket', function() {
	beforeEach(function() {
		global.document = jsdom('<html><body></body></html>');
		global.window = document.defaultView;
	});

	it('displays the instrument name', function() {
		React.render(<MarketOrderTicket flux={new Flux('ACME.N')}/>, document.body);
		expect(document.body.querySelector('.MarketOrderTicket__instrument').textContent).to.equal('ACME.N');
	});

	it('starts with an amount of 0 by default', function() {
		React.render(<MarketOrderTicket flux={new Flux('ACME.N')}/>, document.body);
		expect(document.body.querySelector('.MarketOrderTicket__amount').value).to.equal('0');
	});

	it('can be configured to start with a different amount', function() {
		React.render(<MarketOrderTicket flux={new Flux('ACME.N')} initialAmount={100}/>, document.body);
		expect(document.body.querySelector('.MarketOrderTicket__amount').value).to.equal('100');
	});
});
