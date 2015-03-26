'use strict';

import Immutable from 'immutable';

export default new Immutable.Record({
	instrument: null,
	isLong: true,
	amount: 1,
	priceLimit: null,
	timeLimit: null,
	amountLimit: null
});
