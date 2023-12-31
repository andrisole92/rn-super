import { IconsCrossSmall } from '@/icons';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { SuperTextInput } from 'src/components/input/SuperTextInput';
import SuperFlex from 'src/sds/components/SuperFlex';
import SuperText from 'src/sds/components/SuperText';

export type TypeaheadDropdownOption = {
	value: any;
	label: string;
};

type Props = {
	label: string;
	placeholder?: string;
	isLoading?: boolean;
	dropdownOptions?: TypeaheadDropdownOption[];
	onChange?: (s: string) => void;
	onOptionSelect?: (selectedOption: TypeaheadDropdownOption) => void;
	value?: TypeaheadDropdownOption;
	customRenderFn?: (
		option: TypeaheadDropdownOption,
		onChange: (selectedOption: TypeaheadDropdownOption) => void,
		key: string,
	) => React.ReactElement;
	onCrossClick?: () => void;
};

function SuperTypeahead({
	dropdownOptions = [],
	isLoading = false,
	onChange,
	onOptionSelect,
	label,
	placeholder = 'Start typing...',
	value = undefined,
	onCrossClick,
	customRenderFn,
}: Props): React.ReactElement {
	const [inputValue, setInputValue] = useState(value?.label);
	const [isDropdownShown, setIsDropdownShown] = useState(false);

	const onChangeWrapper = useCallback(
		(selectedOption: TypeaheadDropdownOption) => {
			setIsDropdownShown(false);
			setInputValue(selectedOption?.label ?? '');
			onOptionSelect?.(selectedOption);
		},
		[onOptionSelect],
	);

	useEffect(() => {
		setInputValue(value?.label ?? '');
	}, [value]);

	const onInputChangeWrapper = useCallback(
		(val) => {
			setInputValue(val);
			setIsDropdownShown(val === '' ? false : true);
			if (val != value?.label && val != null) {
				onChange?.(val);
			}
		},
		[onChange, value?.label],
	);

	const onClearButtonClick = useCallback(() => {
		setInputValue('');
		setIsDropdownShown(false);
		onCrossClick?.();
	}, [onCrossClick]);

	return (
		<SuperFlex flexGrow={0} direction='column' style={{ width: '100%', zIndex: 99 }}>
			<SuperFlex flexGrow={0} direction='column' style={{ position: 'relative', width: '100%' }}>
				<SuperTextInput
					label={label}
					placeholder={placeholder}
					spellCheck={false}
					autoComplete='off'
					onInputChange={onInputChangeWrapper}
					value={inputValue}
				/>
				{inputValue?.length > 0 ? (
					<Pressable
						style={{
							position: 'absolute',
							bottom: 2,
							right: 5,
							padding: 4,
							transform: [{ translateY: -12 }],
						}}
						onPress={onClearButtonClick}>
						<IconsCrossSmall width={18} height={18} fill={Colors.textPrimary} />
					</Pressable>
				) : null}
			</SuperFlex>
			<SuperFlex
				style={{
					position: 'relative',
					width: '100%',
					zIndex: 999,
				}}
				flexGrow={0}>
				{(dropdownOptions?.length > 0 && isDropdownShown) || isLoading ? (
					<ScrollView
						keyboardShouldPersistTaps='handled'
						keyboardDismissMode='interactive'
						style={{
							zIndex: 30000,
							maxHeight: 300,
							position: 'absolute',
							top: -12,
							backgroundColor: Colors.backgroundPrimary,
							width: '100%',
							borderBottomLeftRadius: 8,
							borderBottomRightRadius: 8,
							borderWidth: 1,
							borderColor: Colors.borderGrey,
							borderTopWidth: 0,
						}}>
						{isLoading ? (
							<SuperFlex
								align='center'
								justify='center'
								style={{
									paddingBottom: 8,
								}}>
								<ActivityIndicator size='small' color={Colors.main} />
							</SuperFlex>
						) : (
							dropdownOptions.map((dropdownOption) => {
								return customRenderFn == null ? (
									<Pressable
										style={{
											width: '100%',
											padding: 18,
											paddingVertical: 12,
											paddingLeft: 0,
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
										}}
										key={dropdownOption.label}
										onPress={() => onChangeWrapper(dropdownOption)}>
										<Ionicons name='location-outline' size={24} color='black' />
										<SuperText
											style={{ padding: 0, margin: 0, marginLeft: 2 }}
											key={dropdownOption.value}>
											{dropdownOption.label}
										</SuperText>
									</Pressable>
								) : (
									customRenderFn(dropdownOption, onChangeWrapper, dropdownOption.value)
								);
							})
						)}
					</ScrollView>
				) : null}
			</SuperFlex>
		</SuperFlex>
	);
}

export default React.memo(SuperTypeahead);
