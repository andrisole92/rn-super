import { logPress } from '@/loggers/SessionLogger';
import React, { useCallback, useRef } from 'react';
import {
	ActivityIndicator,
	Animated,
	Easing,
	GestureResponderEvent,
	Keyboard,
	Pressable,
	PressableProps,
	ViewStyle,
} from 'react-native';
import { Colors } from 'react-native-ui-lib';
import SuperFlex from 'src/sds/components/SuperFlex';
import SuperText from 'src/sds/components/SuperText';

export type SuperSize = 't' | 's' | 'm' | 'l' | 'xl';
export type SuperButtonType = 'outlined' | 'ghost' | 'default' | 'primary' | 'secondary';

export type SuperButtonShape = 'squared' | 'rounded' | 'oval';

const getBackgroundColor = (buttonType: SuperButtonType) => {
	const colors = {
		ghost: Colors.transparent,
		outlined: Colors.white,
		primary: Colors.main,
		secondary: Colors.secondary,
		default: Colors.main,
	};
	return colors[buttonType] ?? Colors.main;
};

const getBorderColor = (buttonType: SuperButtonType) => {
	const colors = {
		ghost: Colors.transparent,
		secondary: Colors.secondary,
	};
	return colors[buttonType] ?? Colors.main;
};

const getTextColor = (buttonType: SuperButtonType) => {
	const colors = {
		ghost: Colors.main,
		outlined: Colors.main,
		primary: Colors.backgroundPrimary,
		secondary: Colors.main,
		default: Colors.backgroundPrimary,
	};
	return colors[buttonType] ?? Colors.textPrimary;
};

const getBorderRadius = (buttonShape: SuperButtonShape): number => {
	const config = {
		squared: 300,
		rounded: 16,
		oval: 50,
		default: 4,
	};

	return config[buttonShape] ?? 4;
};

const getBorderWidth = (type: SuperButtonType, shape: SuperButtonShape): number => {
	if (type === 'outlined') {
		return 2;
	}
	return 0;
};

const getHeight = (size: SuperSize): number => {
	const config = {
		t: 30,
		s: 35,
		m: 42,
		l: 52,
		default: 42,
	};
	return config[size] ?? 42;
};

type Props = {
	type?: SuperButtonType;
	size?: SuperSize;
	shape?: SuperButtonShape;
	label?: string | React.ReactElement;
	onRemoveClick?: () => void;
	onPress?: ((_event: GestureResponderEvent) => void) | undefined;
	onPressIn?: ((_event: GestureResponderEvent) => void) | undefined;
	onPressOut?: ((_event: GestureResponderEvent) => void) | undefined;
	onLongPress?: ((_event: GestureResponderEvent) => void) | undefined;
	bold?: boolean;
	style?: ViewStyle;
	isLoading?: boolean;
	inline?: boolean;
	disabled?: boolean;
	fontSize?: number;
	fullWidth?: boolean;
	trackingName?: string;
	trackingData?: Record<string, any>;
} & PressableProps;

function SuperButton({
	type = 'default',
	size = 'm',
	shape = 'rounded',
	label,
	onPress,
	onPressIn,
	onPressOut,
	onLongPress,
	bold = false,
	isLoading = false,
	fullWidth = false,
	style = {},
	inline = false,
	disabled = false,
	fontSize = 18,
	trackingName,
	trackingData,
	...rest
}: Props): React.ReactElement {
	const animated = useRef(new Animated.Value(1)).current;

	const scaleIn = useCallback(() => {
		Animated.timing(animated, {
			toValue: 0.98,
			duration: 100,
			useNativeDriver: true,
			easing: Easing.poly(2),
		}).start();
	}, [animated]);
	const scaleOut = useCallback(() => {
		Animated.timing(animated, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, [animated]);

	const onPressInWrapper = useCallback(
		(e) => {
			Keyboard.dismiss();
			scaleIn();
			onPressIn?.(e);
			if (trackingName) {
				logPress(trackingName, trackingData ?? {});
			}
		},
		[onPressIn, scaleIn, trackingData, trackingName],
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
				transform: [{ scaleX: animated }, { scaleY: animated }],
				borderWidth: getBorderWidth(type, shape),
				borderColor: getBorderColor(type),
				backgroundColor: getBackgroundColor(type),
				height: getHeight(size),
				borderRadius: getBorderRadius(shape),
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: fullWidth ? '100%' : undefined,
				...style,
			}}>
			<Pressable
				disabled={disabled}
				onPressIn={onPressInWrapper}
				onPress={onPress}
				onPressOut={onPressOutWrapper}
				onLongPress={onLongPress}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					height: '100%',
					paddingHorizontal: 18,
					paddingVertical: 4,
				}}
				{...rest}>
				{isLoading ? (
					<SuperFlex
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<ActivityIndicator color={getTextColor(type)} />
					</SuperFlex>
				) : typeof label === 'string' ? (
					<SuperText
						bold={bold}
						style={{
							opacity: isLoading ? 0 : 1,
							textAlign: 'center',
							color: getTextColor(type),
							fontSize,
						}}>
						{label}
					</SuperText>
				) : (
					label
				)}
			</Pressable>
		</Animated.View>
	);
}

export default React.memo(SuperButton);
