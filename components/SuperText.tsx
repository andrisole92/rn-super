import React, { useMemo } from 'react';
import { Text, TextProperties, TextStyle } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export type TextType = 'default' | 'secondary' | 'h1' | 'h2' | 'error' | 'support';
export type TextStatus = 'danger' | 'warn' | 'info' | 'success' | 'default' | 'support';

interface Props extends TextProperties {
	type?: TextType;
	bold?: boolean;
	align?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
	children: string | React.ReactElement | Array<string | React.ReactElement>;
	style?: TextStyle;
	status?: TextStatus;
}

const getFontSize = (type: TextType): number => {
	switch (type) {
		case 'h1':
			return 36;
		case 'h2':
			return 24;
		case 'default':
			return 18;
		case 'secondary':
			return 16;
		case 'support':
			return 14;
		default:
			return 18;
	}
};

const getFontColor = (type: TextType, status: TextStatus): string => {
	if (status === 'danger') {
		return '#a94442';
	}

	if (status === 'warn') {
		return '#8a6d3b';
	}

	if (status === 'info') {
		return '#31708f';
	}

	if (status === 'success') {
		return '#3c763d';
	}
	if (type === 'support') {
		return '#9e9e9e';
	}

	return Colors.textPrimary;
};

function SuperText({
	children,
	bold = false,
	type = 'default',
	status = 'default',
	align = 'auto',
	style = {},
	...rest
}: Props): React.ReactElement {
	const textStyle = useMemo(
		() => ({
			color: getFontColor(type, status),
			fontSize: getFontSize(type),
			textAlign: align,
			fontWeight: bold ? 'bold' : 'normal',
			fontFamily: bold ? 'Urbanist-Bold' : 'Urbanist-Regular',
			...style,
		}),
		[align, bold, status, style, type],
	);
	return (
		<React.Fragment>
			<Text style={textStyle} {...rest}>
				{children}
			</Text>
		</React.Fragment>
	);
}

export default React.memo(SuperText);
