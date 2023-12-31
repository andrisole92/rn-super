import SuperInputLabel from '@/components/input/SuperInputLabel';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import SuperFlex from 'src/sds/components/SuperFlex';
import SuperText from 'src/sds/components/SuperText';

const styles = StyleSheet.create({
	genderSelectOption: {
		flex: 1,
		borderRadius: 12,
		padding: 5,
		backgroundColor: '#FAFAFA',
		height: 48,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

type Props = {
	onChange: (_value: string[]) => void;
	value: string[];
	withLabel?: boolean;
	label?: string;
};

export const SuperMultiGenderSelect = ({
	onChange,
	value,
	withLabel,
	label,
}: Props): React.ReactElement => {
	return (
		<SuperFlex direction='column' style={{ marginTop: 12 }}>
			{withLabel && <SuperInputLabel label={label} />}
			<SuperFlex>
				<Pressable
					testID='signUpGenderOptionMale'
					onPress={() =>
						onChange(
							value.includes('Male') ? value.filter((v) => v !== 'Male') : [...value, 'Male'],
						)
					}
					style={[
						styles.genderSelectOption,
						{ marginRight: 4 },
						value.includes('Male') ? { backgroundColor: '#F7ECFF' } : {},
					]}>
					<SuperText
						style={{
							color: value.includes('Male') ? Colors.fontPrimary : Colors.fontPrimary,
						}}>
						Male
					</SuperText>
				</Pressable>
				<Pressable
					testID='signUpGenderOptionFemale'
					onPress={() =>
						onChange(
							value.includes('Female') ? value.filter((v) => v !== 'Female') : [...value, 'Female'],
						)
					}
					style={[
						styles.genderSelectOption,
						{ marginLeft: 4 },
						value.includes('Female') ? { backgroundColor: '#F7ECFF' } : {},
					]}>
					<SuperText
						style={{
							color: value.includes('Female') ? Colors.fontPrimary : Colors.fontPrimary,
						}}>
						Female
					</SuperText>
				</Pressable>
			</SuperFlex>
		</SuperFlex>
	);
};

export default React.memo(SuperMultiGenderSelect);
