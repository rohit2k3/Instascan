import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getFirestore} from '@react-native-firebase/firestore';
import {getApp} from '@react-native-firebase/app';
import TextInputField from '../../Components/TextInputField/TextInputField';
import BackButton from '../../Components/BackButton/BackButton';
import colors from '../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfileSkeleton from '../../Components/Skeleton/EditProfileSkeleton';

const EditProfile = () => {
  const [loading, setloading] = useState(false);
  const [updateloading, setUpdateloading] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const uid = getApp().auth().currentUser?.uid;
  const firestore = getFirestore();
  useEffect(() => {
    const fetchUserData = async () => {
      setloading(true);
      const userRef = firestore.collection('users').doc(uid);
      const doc = await userRef.get();
      if (doc.exists) {
        const data = doc.data();
        setName(data?.name || '');
        setEmail(data?.email || '');
      } else {
        console.log('No such document!');
      }
      setloading(false);
    };
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    setUpdateloading(true);
    const userRef = firestore.collection('users').doc(uid);
    await userRef.update({
      name: name,
    });
    await getApp().auth().currentUser?.updateProfile({
      displayName: name,
    });
    ToastAndroid.show('Profile Updated'  , ToastAndroid.LONG)
    setUpdateloading(false);
  };

  if (loading) return <EditProfileSkeleton />

  return (
    <View style={styles.container}>
      <BackButton title="Edit Profile" />
      <View style={styles.innerContainer}>
        <TextInputField
          label="Name"
          value={name}
          onChangeText={(text: any) => {
            setName(text);
            if (errors.name) setErrors({...errors, name: ''});
          }}
          iconName="user"
          iconType="FontAwesome"
          returnKeyType="next"
        />
        <TextInputField
          label="Email"
          value={email}
          onChangeText={(text: any) => {
            setEmail(text);
            if (errors.email) setErrors({...errors, email: ''});
          }}
          editable={false}
          iconName="email"
          iconType="MaterialCommunityIcons"
          returnKeyType="next"
        />
        <TouchableOpacity
          style={[
            styles.registerButtonContainer,
            updateloading && styles.registerButtonDisabled,
          ]}
          onPress={handleUpdate}
          disabled={updateloading}
          activeOpacity={0.8}>
          <LinearGradient
            colors={[colors.primary, '#5E3BEF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.registerButton}>
            {updateloading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={'#fff'} size={'small'} />
                <Text style={styles.registerButtonText}>
                  Updating Profile...
                </Text>
              </View>
            ) : (
              <Text style={styles.registerButtonText}>Update Profile</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
    flex: 1,
  },
  registerButtonContainer: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
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
});

export default EditProfile;
