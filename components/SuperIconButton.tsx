import { logPress } from '@/loggers/SessionLogger';
import React, { useCallback, useRef } from 'react';
import {
	Animated,
	DimensionValue,
	GestureResponderEvent,
	Keyboard,
	Pressable,
	PressableProps,
	View,
	ViewStyle,
} from 'react-native';
import { Colors } from 'react-native-ui-lib';

export type SuperSize = 't' | 's' | 'm' | 'l' | 'xl';
export type SuperButtonType = 'outline' | 'ghost' | 'default' | 'primary' | 'secondary';

export type SuperButtonShape = 'squared' | 'rounded' | 'oval';

type Props = {
	type?: SuperButtonType;
	size?: number;
	shape?: SuperButtonShape;
	icon?: React.ReactElement;
	onRemoveClick?: () => void;
	onPress?: ((_event: GestureResponderEvent) => void) | undefined;
	onPressIn?: (_event: GestureResponderEvent) => void;
	onLongPress?: ((_event: GestureResponderEvent) => void) | undefined;
	bold?: boolean;
	containerStyle?: ViewStyle;
	style?: ViewStyle;
	trackingName?: string;
	trackingData?: Record<string, any>;
	dismissKeyboard?: boolean;
	shadowConfig?: { offset?: number; width?: DimensionValue; height?: DimensionValue };
	outline?: boolean;
} & PressableProps;

const BORDER_RADIUS = 16;
const OFFSET = 2;

function SuperIconButton({
	size = 40,
	icon,
	onPress,
	onLongPress,
	containerStyle = {},
	style = {},
	onPressIn,
	onPressOut,
	trackingName,
	trackingData,
	dismissKeyboard = true,
	shadowConfig,
	outline = false,
	...rest
}: Props): React.ReactElement {
	const animated = useRef(new Animated.Value(1)).current;

	const scaleIn = useCallback(() => {
		Animated.timing(animated, {
			toValue: 0.9,
			duration: 75,
			useNativeDriver: true,
		}).start();
	}, [animated]);

	const scaleOut = useCallback(() => {
		Animated.timing(animated, {
			toValue: 1,
			duration: 75,
			useNativeDriver: true,
		}).start();
	}, [animated]);

	const onPressInWrapper = useCallback(
		(e) => {
			dismissKeyboard && Keyboard.dismiss();
			scaleIn();
			onPressIn?.(e);
			if (trackingName) {
				logPress(trackingName, trackingData ?? {});
			}
		},
		[dismissKeyboard, onPressIn, scaleIn, trackingData, trackingName],
	);

	const onPressOutWrapper = useCallback(
		(e) => {
			scaleOut?.();
			onPressOut?.(e);
		},
		[onPressOut, scaleOut],
	);

	return (
		<Animated.View
			style={{
				borderRadius: BORDER_RADIUS,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				width: size,
				height: size,
				// borderBlockColor: Colors.black,
				backgroundColor: 'white',
				transform: [{ scaleX: animated }, { scaleY: animated }],
				...containerStyle,
			}}>
			<Pressable
				onPressIn={onPressInWrapper}
				onPressOut={onPressOutWrapper}
				onPress={onPress}
				onLongPress={onLongPress}
				style={{
					...style,
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					borderWidth: outline ? 2 : 0,
					justifyContent: 'center',
					backgroundColor: 'white',
					borderRadius: BORDER_RADIUS - (shadowConfig ? 2 : 0),
					overflow: 'hidden',
				}}
				{...rest}>
				<View>{icon}</View>
				{shadowConfig && (
					<View
						style={{
							borderRadius: BORDER_RADIUS,
							position: 'absolute',
							backgroundColor: 'black',
							width: shadowConfig?.width ?? '105%',
							height: shadowConfig?.height ?? '105%',
							top: shadowConfig?.offset ?? OFFSET,
							left: shadowConfig?.offset ?? OFFSET,
						}}
					/>
				)}
			</Pressable>
		</Animated.View>
	);
}

export default React.memo(SuperIconButton);
