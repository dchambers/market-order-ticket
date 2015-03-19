'use strict';

import React from 'react';
import Flux from './Flux';
import InnerComponent from './InnerComponent';

export default class MarketOrderTicket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {amount:props.initialAmount};
	}

	getChildContext() {
		return {flux: new Flux(), name: 'Dominic'};
	}

	handleChange(event) {
		this.setState({amount: event.target.value});
	}

	render() {
		return (
			<div className="MarketOrderTicket">
				<input type="number" className="MarketOrderTicket__amount" value={this.state.amount}
				 onChange={this.handleChange.bind(this)}/>
				<InnerComponent/>
			</div>
		);
	}
}

MarketOrderTicket.propTypes = { initialAmount: React.PropTypes.number };
MarketOrderTicket.defaultProps = { initialAmount: 0 };
MarketOrderTicket.childContextTypes = { flux: React.PropTypes.any, name: React.PropTypes.string.isRequired };
