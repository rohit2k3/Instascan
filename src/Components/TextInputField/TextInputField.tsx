import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../constant/colors';

interface TextInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  iconName?: string;
  iconType?: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
  editable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  onFocus?: () => void;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  autoFocus?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  iconName,
  iconType = 'MaterialCommunityIcons',
  returnKeyType,
  onSubmitEditing,
  editable = true,
  containerStyle,
  onBlur,
  onFocus,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [labelPosition] = useState(new Animated.Value(value ? -20 : 0));
  const [labelSize] = useState(new Animated.Value(value ? 12 : 16));

  useEffect(() => {
    // Animate label when component mounts if there's a value
    if (value) {
      animateLabel(true);
    }
  }, []);

  const animateLabel = (hasValue: boolean) => {
    console.log('Animating label:', {isFocused, hasValue});

    Animated.parallel([
      Animated.timing(labelPosition, {
        toValue: isFocused || hasValue ? -20 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelSize, {
        toValue: isFocused || hasValue ? 12 : 16,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const inputRef = useRef<TextInput>(null);
  const handleLabelPress = () => {
    if (editable) {
      inputRef.current?.focus(); // Focus the input when label is pressed
    }
  };

  const handleFocus = () => {
    console.log('handle focus called');

    setIsFocused(true);
    animateLabel(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    console.log('handle blur called');

    setIsFocused(false);
    animateLabel(!!value);
    if (onBlur) onBlur();
  };
  useEffect(() => {
    // Update label position when value changes
    animateLabel(!!value || isFocused);
  }, [value, isFocused]);

  const handleChangeText = (text: string) => {
    onChangeText(text);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderIcon = () => {
    if (!iconName) return null;

    let icon;
    const iconColor = isFocused ? colors.primary : '#999';

    switch (iconType) {
      case 'Ionicons':
        icon = <Ionicons name={iconName} size={22} color={iconColor} />;
        break;
      case 'FontAwesome':
        icon = <FontAwesome name={iconName} size={20} color={iconColor} />;
        break;
      case 'MaterialCommunityIcons':
      default:
        icon = (
          <MaterialCommunityIcons name={iconName} size={22} color={iconColor} />
        );
        break;
    }

    return <View style={styles.iconContainer}>{icon}</View>;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error ? styles.inputContainerError : null,
          !editable && styles.inputContainerDisabled,
        ]}>
        {renderIcon()}

        <View style={styles.inputInnerContainer}>
          <TouchableWithoutFeedback onPress={handleLabelPress}>
            <Animated.Text
              style={[
                styles.inputLabel,
                {
                  transform: [{translateY: labelPosition}],
                  fontSize: labelSize,
                  color: isFocused
                    ? colors.primary
                    : error
                    ? '#ff3b30'
                    : '#999',
                },
              ]}>
              {label}
            </Animated.Text>
          </TouchableWithoutFeedback>
          <TextInput
            style={[
              styles.input,
              !editable && styles.inputDisabled,
              multiline && styles.multilineInput,
            ]}
            ref={inputRef}
            value={value}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            placeholder={placeholder}
            placeholderTextColor="#999"
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            editable={editable}
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
            autoFocus={autoFocus}
          />
        </View>

        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.passwordToggle}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    height: 60,
    overflow: 'hidden',
  },
  inputContainerFocused: {
    borderColor: colors.primary,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainerError: {
    borderColor: '#ff3b30',
  },
  inputContainerDisabled: {
    backgroundColor: '#f0f0f0',
    opacity: 0.7,
  },
  iconContainer: {
    marginRight: 12,
  },
  inputInnerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputLabel: {
    position: 'absolute',
    left: 0,
    color: '#999',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    height: 40,
  },
  inputDisabled: {
    color: '#999',
  },
  multilineInput: {
    height: 'auto',
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  passwordToggle: {
    padding: 8,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default TextInputField;
