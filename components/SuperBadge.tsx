import React from 'react';
import { View, ViewStyle, Text } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import SuperText from 'src/sds/components/SuperText';

type BadgeType = 'default' | 'outline' | 'flat';

type Props = {
  type?: BadgeType;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  style?: ViewStyle;
  label: string;
};

function SuperBadge({
  label,
  style = {},
  type = 'default',
}: Props): React.ReactElement {
  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: Colors.main,
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        ...style,
      }}>
      <SuperText
        style={{
          fontWeight: 'bold',
          color: Colors.backgroundPrimary,
          fontSize: 12,
        }}>
        {label}
      </SuperText>
    </View>
  );
}

export default React.memo(SuperBadge);
