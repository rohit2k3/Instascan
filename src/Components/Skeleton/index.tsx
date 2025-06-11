import {useEffect, useRef} from 'react';
import {Animated, Easing, StyleProp, ViewStyle} from 'react-native';

type Props = {
  width: number | `${number}%`;
  height: number;
  style?: StyleProp<ViewStyle>;
};

export const Skeleton = ({width, height, style}: Props) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {duration: 1000, useNativeDriver: true};

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ]),
    ).start();

    return () => pulseAnim.stopAnimation();
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <Animated.View
      style={[
        {width, height, backgroundColor: 'grey', opacity: opacityAnim},
        style,
      ]}
    />
  );
};
