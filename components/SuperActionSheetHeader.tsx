import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import SuperIconButton from 'src/sds/components/SuperIconButton';
import SuperText from 'src/sds/components/SuperText';

type Props = {
	title: string;
	close: () => void;
};

const SuperActionSheetHeader = ({ title, close }: Props) => {
	return (
		<View
			style={{
				paddingHorizontal: 12,
				paddingLeft: 18,
				paddingVertical: 5,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				backgroundColor: Colors.backgroundGray,
				borderTopLeftRadius: 12,
				borderTopRightRadius: 12,
				overflow: 'hidden',
				position: 'relative',
			}}>
			<SuperText bold>{title}</SuperText>
			<SuperIconButton
				icon={<Entypo name='cross' size={24} color={Colors.fontPrimary} />}
				onPress={close}
			/>
		</View>
	);
};

export default React.memo(SuperActionSheetHeader);
