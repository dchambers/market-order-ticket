'use strict';

import Immutable from 'immutable';

export default new Immutable.Record({
	currentPrice: null,
	orders: new Immutable.Map()
});
