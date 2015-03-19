'use strict';

import React from 'react';

export default class InnerComponent extends React.Component {
	render() {
		return (
			<span className="MarketOrderTicket__name">X{this.context.name}</span>
		);
	}
}

InnerComponent.contextTypes = { name: React.PropTypes.string.isRequired };
