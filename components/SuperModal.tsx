import React, { useCallback } from 'react';
import {
	Keyboard,
	Modal,
	ModalProps,
	Pressable,
	SafeAreaView,
	View,
	ViewStyle,
} from 'react-native';
import {} from 'react-native-safe-area-context';
import { Colors } from 'react-native-ui-lib';

type Props = {
	width?: number | string;
	height?: number | string;
	style?: ViewStyle;
	children: React.ReactElement;
	showDimmer?: boolean;
} & ModalProps;

function SuperModal({
	width = '100%',
	height = '100%',
	style = {},
	showDimmer = false,
	children,
	...rest
}: Props): React.ReactElement {
	const onBackgroundPress = useCallback(
		(e) => {
			Keyboard.dismiss();
			rest?.onRequestClose?.(e);
		},
		[rest],
	);

	return (
		<>
			{rest?.visible && (
				<View
					style={{
						width: '200%',
						height: '200%',
						position: 'absolute',
						opacity: 0.15,
						zIndex: 9999999,
					}}></View>
			)}
			<Modal hardwareAccelerated transparent {...rest} style={{}}>
				<SafeAreaView
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: Colors.iconGray,

						...style,
					}}>
					<Pressable
						onPress={onBackgroundPress}
						style={{
							width,
							height,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						{children}
					</Pressable>
				</SafeAreaView>
			</Modal>
		</>
	);
}

export default React.memo(SuperModal);
