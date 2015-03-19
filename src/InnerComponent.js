'use strict';

import React from 'react';

export default class InnerComponent extends React.Component {
	render() {
		return (
			<span className={this.context.componentName + '__name'}>{this.context.componentName}</span>
		);
	}
}

InnerComponent.contextTypes = { componentName: React.PropTypes.string.isRequired };
