import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { getAuth, sendEmailVerification } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../constant/colors';
import AssetImages from '../../../assets/images/Images';
import TextInputField from '../../../Components/TextInputField/TextInputField';

const { width } = Dimensions.get('window');

const Register = () => {
  const auth = getApp();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const db = firestore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [acceptTerms, setAcceptTerms] = useState(false);


  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) newErrors.name = 'Name is required';

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userCredential = await auth.auth().createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({
        displayName: name
      });
      
      const uid = userCredential.user.uid;
      const userData = {
        name,
        email,
        uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      
      await db.collection('users').doc(uid).set(userData);
      await sendEmailVerification(userCredential.user);
      
      ToastAndroid.show('Verification email sent. Please verify your email to login.', ToastAndroid.LONG);
      navigation.replace('LoginScreen');
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Operation not allowed';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later';
      }
      
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View 
          style={[
            styles.headerContainer, 
          ]}
        >
          <View style={styles.logoContainer}>
            <Image source={AssetImages.logo} style={styles.logo} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started with InstaScan</Text>
        </View>

        <View 
          style={[
            styles.formContainer
          ]}
        >
          <TextInputField
            label="Full Name"
            value={name}
            onChangeText={(text:any) => {
              setName(text);
              if (errors.name) setErrors({...errors, name: ''});
            }}
            iconName="user"
            iconType="FontAwesome"
            error={errors.name}
            returnKeyType="next"
          />

          <TextInputField
            label="Email Address"
            value={email}
            onChangeText={(text:any) => {
              setEmail(text);
              if (errors.email) setErrors({...errors, email: ''});
            }}
            keyboardType="email-address"
            iconName="email-outline"
            iconType="MaterialCommunityIcons"
            error={errors.email}
            returnKeyType="next"
          />

          <TextInputField
            label="Password"
            value={password}
            onChangeText={(text:any) => {
              setPassword(text);
              if (errors.password) setErrors({...errors, password: ''});
            }}
            secureTextEntry={true}
            iconName="lock-outline"
            iconType="MaterialCommunityIcons"
            error={errors.password}
            returnKeyType="next"
          />

          <TextInputField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text:any) => {
              setConfirmPassword(text);
              if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
            }}
            secureTextEntry={true}
            iconName="lock-check-outline"
            iconType="MaterialCommunityIcons"
            error={errors.confirmPassword}
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />

          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            <View style={[
              styles.checkbox,
              acceptTerms && styles.checkboxChecked,
              errors.terms ? styles.checkboxError : null
            ]}>
              {acceptTerms && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>
            <View style={styles.termsTextContainer}>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text 
                  style={styles.termsLink}
                  onPress={() => navigation.navigate('TermsAndConditionScreen')}
                >
                  Terms & Conditions
                </Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </TouchableOpacity>
          {errors.terms ? (
            <Text style={styles.errorText}>{errors.terms}</Text>
          ) : null}

          <TouchableOpacity
            style={[
              styles.registerButtonContainer,
              isLoading && styles.registerButtonDisabled
            ]}
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary, '#5E3BEF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.registerButton}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <MaterialCommunityIcons name="loading" size={24} color="#fff" />
                  <Text style={styles.registerButtonText}>Creating Account...</Text>
                </View>
              ) : (
                <Text style={styles.registerButtonText}>Create Account</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            activeOpacity={0.8}
          >
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
    marginBottom: 32,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxError: {
    borderColor: '#ff3b30',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '500',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
    marginLeft: 32,
  },
  registerButtonContainer: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
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

export default Register;