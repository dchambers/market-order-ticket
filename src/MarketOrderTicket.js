'use strict';

import React from 'react';
import FluxComponent from 'flummox/component';

export default class MarketOrderTicket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {amount:props.initialAmount};
	}

	render() {
		return (
			<FluxComponent flux={this.props.flux} connectToStores={['marketOrderStore']}>
				<div className="MarketOrderTicket">
					<input type="number" className="MarketOrderTicket__amount" value={this.state.amount}/>
				</div>
			</FluxComponent>
		);
	}
}

MarketOrderTicket.propTypes = { initialAmount: React.PropTypes.number };
MarketOrderTicket.defaultProps = { initialAmount: 0 };
