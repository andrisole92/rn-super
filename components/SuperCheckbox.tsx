import CheckBox from 'expo-checkbox';
import * as React from 'react';
import { Colors } from 'react-native-ui-lib';
import SuperFlex from 'src/sds/components/SuperFlex';

type Props = {
	checked: boolean;
	readOnly?: boolean;
};

const SuperCheckbox = ({ checked }: Props) => {
	return (
		<SuperFlex align='center' flexGrow={0}>
			<CheckBox color={Colors.main} value={checked} />
		</SuperFlex>
	);
};

export default React.memo(SuperCheckbox);
