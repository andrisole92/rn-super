import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { View } from 'react-native';

type IndicatorType = 'hearts' | 'book' | 'sparks';

type Props = {
	fillWidth?: boolean;
	fillHeight?: boolean;
	height?: number;
	type?: IndicatorType;
};

const TYPE_TO_ASSET: Record<IndicatorType, any> = {
	hearts: require('@assets/lottie/hearts.json'),
	book: require('@assets/lottie/book.json'),
	sparks: require('@assets/lottie/sparks.json'),
};

function SuperActivityIndiactor({
	fillWidth = false,
	fillHeight,
	type = 'sparks',
	height = 50,
}: Props): React.ReactElement {
	const animation = useRef<LottieView>(null);

	return (
		<View
			style={{
				...(fillWidth ? { width: '100%' } : {}),
				...(fillHeight ? { height: '100%' } : {}),
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<LottieView
				autoPlay
				loop
				ref={animation}
				style={{
					height,
				}}
				onLayout={() => animation?.current?.play()}
				source={TYPE_TO_ASSET[type]}
			/>
		</View>
	);
}

export default React.memo(SuperActivityIndiactor);
