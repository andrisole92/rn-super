import SuperInputLabel from '@/components/input/SuperInputLabel';
import { IconFemale, IconMale } from '@/icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import SuperFlex from 'src/sds/components/SuperFlex';
import SuperText from 'src/sds/components/SuperText';

const styles = StyleSheet.create({
	genderSelectOption: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		borderRadius: 12,
		padding: 5,
		backgroundColor: '#FAFAFA',
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

type Props = {
	onChange: (_value: string) => void;
	value: string;
	withLabel?: boolean;
	label?: string;
};

export const SuperGenderSelect = ({
	onChange,
	value,
	withLabel,
	label,
}: Props): React.ReactElement => {
	return (
		<SuperFlex direction='column' style={{ marginVertical: 12 }}>
			{withLabel && <SuperInputLabel label={label} />}
			<SuperFlex>
				<Pressable
					testID='signUpGenderOptionMale'
					onPress={() => onChange('Male')}
					style={[
						styles.genderSelectOption,
						{ marginRight: 4 },
						value === 'Male' ? { backgroundColor: '#F7ECFF' } : {},
					]}>
					<IconMale width={20} height={20} fill={Colors.black} />
					<SuperText
						style={{
							marginLeft: 8,
							color: value === 'Male' ? Colors.fontPrimary : Colors.fontPrimary,
						}}>
						Male
					</SuperText>
				</Pressable>
				<Pressable
					testID='signUpGenderOptionFemale'
					onPress={() => onChange('Female')}
					style={[
						styles.genderSelectOption,
						{ marginLeft: 4 },
						value === 'Female' ? { backgroundColor: '#F7ECFF' } : {},
					]}>
					<IconFemale width={20} height={20} fill={Colors.black} />
					<SuperText
						style={{
							marginLeft: 8,
							color: value === 'Female' ? Colors.fontPrimary : Colors.fontPrimary,
						}}>
						Female
					</SuperText>
				</Pressable>
			</SuperFlex>
		</SuperFlex>
	);
};

export default React.memo(SuperGenderSelect);
