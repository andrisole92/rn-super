import { requestJsonV2 } from '@shared/fetch/fetcher';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import { logSessionItem } from 'src/loggers/SessionLogger';
import SuperFlex from 'src/sds/components/SuperFlex';
import SuperTypeahead, { TypeaheadDropdownOption } from 'src/sds/components/SuperTypeahead';
import useDebounce from 'src/utils/hooks/useDebounce';

const getTypeaheadCities = async (query: string | null) => {
	return requestJsonV2({
		method: 'POST',
		path: '/api/typeahead/cities',
		body: {
			query,
		},
	});
};
const genTypeaheadLabelFromLocation = ({ city, admin_name, country }): string => {
	return `${city}, ${admin_name}, ${country}`;
};

const getAsyncLocationFromCoordinates = async ({ lat, lng }: { lat: number; lng: number }) => {
	return requestJsonV2({
		method: 'POST',
		path: '/api/typeahead/cities/geocode',
		body: {
			lat,
			lng,
		},
	});
};

type Props = {
	onSelectLocation: (any) => void;
	value?: TypeaheadDropdownOption;
};

function SuperLocationInput({ onSelectLocation, value }: Props): React.ReactElement {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState(null);
	const debouncedInputValue = useDebounce(inputValue, 500);
	const cityOptions = useMemo(
		() =>
			cities.map(({ city, admin_name, country, city_ascii, lat, lng }) => ({
				label: genTypeaheadLabelFromLocation({ city, admin_name, country }),
				value: JSON.stringify({ city, admin_name, country, city_ascii, lat, lng }),
			})),
		[cities],
	);

	const onInputChange = useCallback(async (value) => {
		if (value?.length > 0) {
			setIsLoading(true);
			setInputValue(value);
		} else {
			setInputValue(undefined);
			setIsLoading(false);
			setCities([]);
		}
	}, []);

	useEffect(() => {
		const fetchCities = async () => {
			const { response } = await getTypeaheadCities(debouncedInputValue);
			setIsLoading(false);
			if (Array.isArray(response?.data)) {
				setCities(response?.data ?? []);
			}
		};
		if (debouncedInputValue?.length > 0) {
			fetchCities();
		} else {
			setIsLoading(false);
		}
	}, [debouncedInputValue]);

	const onLocationSelected = useCallback(
		(location) => {
			logSessionItem('onLocationSelected');
			Keyboard.dismiss();
			setInputValue(location.label);
			onSelectLocation?.(location?.value);
		},
		[onSelectLocation],
	);

	const onCrossClick = useCallback(() => {
		Keyboard.dismiss();
		setInputValue(undefined);
		onSelectLocation?.(undefined);
	}, [onSelectLocation]);

	return (
		<SuperFlex style={{ marginBottom: 12, zIndex: 999 }}>
			<SuperTypeahead
				value={value}
				isLoading={isLoading}
				label='City'
				onChange={onInputChange}
				dropdownOptions={cityOptions}
				onOptionSelect={onLocationSelected}
				onCrossClick={onCrossClick}
			/>
		</SuperFlex>
	);
}

export default React.memo(SuperLocationInput);
