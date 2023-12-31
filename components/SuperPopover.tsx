import * as React from 'react';
import { useCallback, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

export type OnlineStatus = boolean | 'recently';

type Props = {
	content: React.ReactElement | null;
	visible?: boolean;
	popoverContent: React.ReactElement | null;
	closePopover: () => void;
};

function SuperPopover({
	content,
	popoverContent,
	visible = true,
	closePopover,
}: Props): React.ReactElement | null {
	const [layout, setLayout] = useState({});
	const onLayout = useCallback((event: LayoutChangeEvent) => {
		setLayout(event.nativeEvent.layout);
	}, []);
	return (
		<View
			onLayout={(event) => {
				event.target.measureInWindow((x, y, width, height) => {
					setLayout({ x, y, width, height });
					// console.log({ x, y, width, height, pageX, pageY });
				});
			}}>
			{content}
			{visible ? (
				<View style={{ position: 'absolute', right: 0, top: 100, flex: 1, width: 300 }}>
					{popoverContent}
				</View>
			) : null}
			{/* <Modal transparent visible={visible} style={{ position: 'absolute' }}>
				<SafeAreaView
					style={{
						width: '100%',
						// backgroundColor: 'yellow',
						height: 300,
						position: 'absolute',
						flex: 1,
					}}>
					<View style={{ flex: 1 }}>
						<Pressable
							style={{
								position: 'absolute',
								// backgroundColor: 'green',
								width: '200%',
								height: '200%',
								display: 'flex',
							}}
							onPress={closePopover}></Pressable>

						<View
							style={{
								position: 'absolute',
								flex: 0,
								top: 44,
								right: width - layout?.x ?? 0 - layout?.width ?? 0,
								// left: 0,
								// width: 100,
								flexDirection: 'column',
								alignSelf: 'flex-start',
								flexWrap: 'wrap',
								backgroundColor: 'yellow',
								display: 'flex',
								flexGrow: 0,
								flexShrink: 1,
							}}>
							{popoverContent}
						</View>
					</View>
				</SafeAreaView>
			</Modal> */}
		</View>
	);
}

export default React.memo(SuperPopover);
