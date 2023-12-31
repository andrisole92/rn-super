import React from 'react';
import { ViewProps } from 'react-native';
import SuperFlex from 'src/sds/components/SuperFlex';
import SuperText from 'src/sds/components/SuperText';

type SuperStatus = 'danger' | 'warn' | 'info' | 'success';

type Props = {
	message: string;
	type: SuperStatus;
} & ViewProps;

const getBorderColor = (type: SuperStatus): string => {
	switch (type) {
		case 'warn':
			return '#faebcc';
		case 'danger':
			return '#ebccd1';
		case 'success':
			return '#d6e9c6';
		case 'info':
			return '#bce8f1';
		default:
			return '#31708f';
	}
};

const getBackgroundColor = (type: SuperStatus): string => {
	switch (type) {
		case 'warn':
			return '#fcf8e3';
		case 'danger':
			return '#f2dede';
		case 'success':
			return '#dff0d8';
		case 'info':
			return '#d9edf7';
		default:
			return '#31708f';
	}
};

function SuperAlert({ message, type, style, ...rest }: Props): React.ReactElement {
	return (
		<SuperFlex
			style={{
				borderWidth: 1,
				borderColor: getBorderColor(type),
				backgroundColor: getBackgroundColor(type),
				alignItems: 'center',
				justifyContent: 'center',
				padding: 12,
				borderRadius: 4,
				marginVertical: 4,
				marginBottom: 26,
				...style,
			}}
			{...rest}>
			<SuperText status={type}>{message}</SuperText>
		</SuperFlex>
	);
}

export default React.memo(SuperAlert);
