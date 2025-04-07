import {View, Text, Animated, KeyboardTypeOptions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../constant/colors';

interface TextInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  onPress?: () => void;
  editable?: boolean;
}

const TextInputField2 = ({
  onPress,
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  editable = true,
}: TextInputFieldProps) => {


  const [textFocused, setTextFocused] = useState(false);
  const textLabelPosition = useState(new Animated.Value(value ? -20 : 0))[0];
  const textLabelSize = useState(new Animated.Value(value ? 12 : 16))[0];

  const animateLabel = (
    position: Animated.Value,
    size: Animated.Value,
    isFocused: boolean,
    hasValue: boolean,
  ) => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: isFocused || hasValue ? -20 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(size, {
        toValue: isFocused || hasValue ? 12 : 16,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={styles.inputContainer}>

      <Animated.Text
        style={[
          styles.inputLabel,
          {
            transform: [{translateY: textLabelPosition}],
            fontSize: textLabelSize,
            color: textFocused ? colors.primary : '#666',
          },
        ]}>
        {label}
      </Animated.Text>
      <TextInput
        style={[styles.input, textFocused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setTextFocused(true);
          animateLabel(textLabelPosition, textLabelSize, true, !!value);
        }}
        onBlur={() => {
          setTextFocused(false);
          animateLabel(textLabelPosition, textLabelSize, false, !!value);
        }}
        keyboardType={keyboardType || 'default'}
        autoCapitalize="none"
        editable={editable}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
    position: 'relative',
    height: 56,
    justifyContent: 'center',
  },
  inputLabel: {
    position: 'absolute',
    left: 0,
    color: '#666',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  inputFocused: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
  },
  loginButtonContainer: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  loginButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  footerLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TextInputField2;
