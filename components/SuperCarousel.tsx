import { Picture } from '@shared/types';
import React, { useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import SuperFlex from 'src/sds/components/SuperFlex';
import SuperText from 'src/sds/components/SuperText';
import { genCloudFrontUrlV2 } from 'src/utils/ContentServingUtils';

type Props = {
	images: Picture[];
};

function SuperCarousel({ images }: Props): React.ReactElement {
	const scrollX = useRef(new Animated.Value(0)).current;

	const { width: windowWidth, height: windowHeight } = useWindowDimensions();

	return (
		<View style={styles.scrollContainer}>
			<ScrollView
				style={{ width: windowWidth, height: windowHeight / 2, backgroundColor: 'black' }}
				horizontal={true}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: scrollX,
								},
							},
						},
					],
					{ useNativeDriver: false },
				)}
				scrollEventThrottle={1}>
				{!images?.length && (
					<SuperFlex align='center' justify='center' style={{ width: windowWidth, flex: 1 }}>
						<SuperText>No Images Yet</SuperText>
					</SuperFlex>
				)}
				{images.map((image, imageIndex) => {
					return (
						<Image
							resizeMode='contain'
							key={imageIndex}
							source={{ uri: genCloudFrontUrlV2(image) }}
							style={{
								height: windowHeight / 2,
								width: windowWidth,
								flex: 1,
							}}
						/>
					);
				})}
			</ScrollView>
			<View style={styles.indicatorContainer}>
				{images?.map((_image, imageIndex) => {
					const width = scrollX.interpolate({
						inputRange: [
							windowWidth * (imageIndex - 1),
							windowWidth * imageIndex,
							windowWidth * (imageIndex + 1),
						],
						outputRange: [8, 16, 8],
						extrapolate: 'clamp',
					});

					const backgroundColor = scrollX.interpolate({
						inputRange: [
							windowWidth * (imageIndex - 1),
							windowWidth * imageIndex,
							windowWidth * (imageIndex + 1),
						],
						outputRange: ['rgb(125, 125, 125)', 'rgb(255, 255, 255)', 'rgb(125, 125, 125)'],
						extrapolate: 'clamp',
					});
					return (
						<Animated.View
							key={imageIndex}
							style={[styles.normalDot, { width, backgroundColor }]}
						/>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		flex: 1,
		borderRadius: 5,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	normalDot: {
		height: 8,
		width: 8,
		borderRadius: 4,
		backgroundColor: 'silver',
		marginHorizontal: 4,
	},
	indicatorContainer: {
		position: 'absolute',
		bottom: 12,
		marginTop: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default React.memo(SuperCarousel);
