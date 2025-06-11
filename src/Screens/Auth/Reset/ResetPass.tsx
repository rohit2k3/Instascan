import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../constant/colors';
import AssetImages from '../../../assets/images/Images';
import TextInputField from '../../../Components/TextInputField/TextInputField';

const ResetPass = () => {
  const auth = getApp();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const successAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (isSuccess) {
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSuccess]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await auth.auth().sendPasswordResetEmail(email);
      setIsSuccess(true);
      ToastAndroid.show(
        'Password reset email sent. Please check your inbox.',
        ToastAndroid.LONG,
      );
    } catch (error: any) {
      let errorMessage = 'Failed to send reset email. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later';
      }

      setError(errorMessage);
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image source={AssetImages.logo} style={styles.logo} />
          </View>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your
            password
          </Text>
        </View>

        {!isSuccess ? (
          <>
            <TextInputField
              label="Email"
              iconType="MaterialCommunityIcons"
              iconName="email-outline"
              onChangeText={text => {
                setEmail(text);
                if (error) setError('');
              }}
              value={email}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[
                styles.resetButtonContainer,
                isLoading && styles.resetButtonDisabled,
              ]}
              onPress={submitHandler}
              disabled={isLoading}
              activeOpacity={0.8}>
              <LinearGradient
                colors={[colors.primary, '#5E3BEF']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.resetButton}>
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <MaterialCommunityIcons
                      name="loading"
                      size={24}
                      color="#fff"
                    />
                    <Text style={styles.resetButtonText}>Sending...</Text>
                  </View>
                ) : (
                  <Text style={styles.resetButtonText}>Send Reset Link</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <Animated.View style={[styles.successContainer, {opacity: successAnim}]}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={80} color={colors.primary} />
            </View>
            <Text style={styles.successTitle}>Email Sent!</Text>
            <Text style={styles.successText}>
              We've sent a password reset link to:
            </Text>
            <Text style={styles.emailText}>{email}</Text>
            <Text style={styles.instructionText}>
              Please check your inbox and follow the instructions to reset your
              password.
            </Text>

            <TouchableOpacity
              style={styles.returnButtonContainer}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.returnButtonText}>Return to Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendContainer}
              onPress={submitHandler}>
              <Text style={styles.resendText}>Didn't receive the email? </Text>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Remember your password? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            activeOpacity={0.8}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    // elevation: 4,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: -8,
    marginBottom: 16,
    marginLeft: 4,
  },
  resetButtonContainer: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  resetButtonDisabled: {
    opacity: 0.7,
  },
  resetButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  returnButtonContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  returnButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  resendLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 24,
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

export default ResetPass;