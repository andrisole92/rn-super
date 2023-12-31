import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

type Props = {
	children?: React.ReactElement | Array<React.ReactElement | null> | null;
	justify?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
	direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	style?: ViewStyle;
	flexGrow?: number;
	fullWidth?: boolean;
} & ViewProps;

function SuperFlex({
	children,
	justify = 'flex-start',
	align = 'flex-start',
	direction = 'row',
	style = {},
	flexGrow = 1,
	fullWidth = false,
	...rest
}: Props): React.ReactElement {
	return (
		<View
			style={{
				display: 'flex',
				width: fullWidth ? '100%' : undefined,
				flexDirection: direction,
				justifyContent: justify,
				alignItems: align,
				flexGrow,
				...style,
			}}
			{...rest}>
			{children}
		</View>
	);
}

export default React.memo(SuperFlex);
