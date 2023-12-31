import { useNavigation } from '@react-navigation/native';
import { User } from '@shared/types';
import * as React from 'react';
import { useMemo } from 'react';
import { ImageStyle, Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors } from 'react-native-ui-lib';
import SuperOnlineDot from 'src/sds/components/SuperOnlineDot';
import { genCloudFrontUrlV2 } from 'src/utils/ContentServingUtils';
import { EmptyFunction } from 'src/utils/FunctionUtils';
import { getUserOnlineStatusByLastSeenAt } from 'src/utils/UserUtils';
import { Nullable } from 'src/utils/types/Nullable';

export type OnlineStatus = boolean | 'recently';

export interface SuperAvatarProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	user: Nullable<User>;
	size?: number;
	blurred?: boolean;
	highlight?: boolean;
	borderType?: 'circle' | 'rounded' | 'rectangle';
	ripple?: boolean;
	isOnline?: OnlineStatus;
	onClick?: () => void;
	onlineDotSize?: number;
	style?: ImageStyle;
	noPress?: boolean;
}

function SuperAvatar({
	size = 24,
	blurred = false,
	highlight = false,
	borderType = 'circle',
	ripple = false,
	isOnline = false,
	onClick = EmptyFunction,
	onlineDotSize = 12,
	user,
	noPress = false,
	style = {},
}: SuperAvatarProps): React.ReactElement {
	const navigation = useNavigation();
	const styleMemo = useMemo(() => ({ width: size, height: size }), [size]);

	const onlineStatus = useMemo(() => getUserOnlineStatusByLastSeenAt(user?.last_online_at), [user]);

	const onPress = () => {
		navigation.navigate('ProfilePreviewScreen', {
			userId: user?.id,
		});
	};

	const Container = noPress ? View : Pressable;

	return (
		<React.Fragment>
			<Container onPress={onPress} style={{ ...styleMemo }}>
				<FastImage
					style={{
						...styleMemo,
						borderRadius: 100,
						borderWidth: 2,
						borderColor: Colors.backgroundGray,
						...style,
					}}
					source={
						genCloudFrontUrlV2(user?.avatar, '480') != null
							? {
									uri: genCloudFrontUrlV2(user?.avatar, '480'),
							  }
							: require('../../../assets/user.png')
					}
					width={size}
					height={size}
					resizeMode={FastImage.resizeMode.cover}
				/>

				<SuperOnlineDot
					size={onlineDotSize}
					onlineStatus={onlineStatus}
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: [
							{ translateX: -onlineDotSize / 2 },
							{ translateY: -onlineDotSize / 2 },
							{ translateX: (size / 2) * Math.cos(45 * (Math.PI / 180)) },
							{ translateY: (size / 2) * Math.cos(45 * (Math.PI / 180)) },
						],
					}}
				/>
			</Container>
		</React.Fragment>
	);
}

export default React.memo(SuperAvatar);
