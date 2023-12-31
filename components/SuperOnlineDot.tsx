import * as React from 'react';
import { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export type OnlineStatus = boolean | 'recently';

type Props = {
	size?: number;
	style?: ViewStyle;
	onlineStatus?: boolean | 'recently';
};

function SuperOnlineDot({
	size = 24,
	style = {},
	onlineStatus = false,
}: Props): React.ReactElement | null {
	const styleMemo = useMemo(() => ({ width: size, height: size, ...style }), [size, style]);

	if (onlineStatus === false) {
		return null;
	}

	return (
		<View
			style={{
				borderRadius: 100,
				backgroundColor: onlineStatus === 'recently' ? 'orange' : 'green',
				borderWidth: 2,
				borderColor: Colors.backgroundPrimary,
				...styleMemo,
			}}></View>
	);
}

export default React.memo(SuperOnlineDot);
