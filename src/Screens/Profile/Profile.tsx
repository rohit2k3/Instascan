import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ToastAndroid,
  Linking,
  Share,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {firebase} from '@react-native-firebase/auth';
import BackButton from '../../Components/BackButton/BackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constant/colors';

interface MenuItemProps {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
  danger?: boolean;
}

const Profile = () => {
  const [user, setuser] = useState({
    name: 'InstaScan User',
    email: 'user@instascan.com',
  });

  useFocusEffect(
    useCallback(() => {
      const userData = firebase.auth().currentUser;
      setuser({
        name: userData?.displayName || 'InstaScan User',
        email: userData?.email || 'user@instascan.com',
      });
    }, []),
  );

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // Get first letter of name for avatar
  const getInitial = (name: string) => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : '?';
  };
  const logoutHandler = async () => {
    try {
      const logoutRes = await firebase.auth().signOut();
      ToastAndroid.show('Logout Successful', ToastAndroid.SHORT);
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    } catch (error) {
      console.error('Logout error:', error);
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    }
  };
  const inviteHandler = async () => {
    const shareText =
      'Check out this amazing app! InstaScan - Scan and Share with ease!';
    const url = 'https://github.com/rohit2k3/instascan';
    const message = `${shareText} ${url}`;
    await Share.share({message});
  };

  const handleSupport = () => {
    Linking.openURL(
      'mailto:rohitsharma2k3@gmail.com?subject=Regarding InstaScan App&body=Hello Team,%0D%0A%0D%0AI have a query regarding InstaScan...',
    );
  };

  const menuItems = [
    {
      id: 'edit_profile',
      title: 'Edit Profile',
      icon: 'account',
      onPress: () => navigation.navigate('EditProfileScreen'),
    },
    {
      id: 'history_screen',
      title: 'Scan History',
      icon: 'history',
      onPress: () => navigation.navigate('HistoryScreen'),
    },
    {
      id: 'invite_friends',
      title: 'Invite Friends',
      icon: 'share-variant',
      onPress: () => inviteHandler(),
    },
    {
      id: 'contact_us',
      title: 'Contact Us',
      icon: 'mail',
      onPress: () => handleSupport(),
    },
    {
      id: 'help_feedback',
      title: 'Help & Feedback',
      icon: 'help-circle',
      onPress: () =>handleSupport(),
    },
    {
      id: 'terms_conditions',
      title: 'Terms & Conditions',
      icon: 'checkbook',
      onPress: () => navigation.navigate('TermsAndConditionScreen'),
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: 'logout',
      onPress: () => logoutHandler(),
      danger: true,
    },
  ];

  const renderMenuItem = (item: MenuItemProps) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}>
        <View style={styles.menuIconContainer}>
          {/* Replace with your actual icon component */}
          <View style={styles.iconPlaceholder}>
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color="#6366F1"
            />
            {/* <Text style={styles.iconText}>{item.icon.charAt(0).toUpperCase()}</Text> */}
          </View>
        </View>
        <Text style={[styles.menuItemText, item.danger && styles.dangerText]}>
          {item.title}
        </Text>
        <View style={styles.chevronContainer}>
          {/* Replace with your actual chevron icon */}
          <Text style={styles.chevronText}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <BackButton title="Profile" />

      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View> */}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitial(user.name)}</Text>
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {menuItems.slice(0, 2).map(renderMenuItem)}
        </View>

        <View style={styles.divider} />

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {menuItems.slice(2, 5).map(renderMenuItem)}
        </View>

        <View style={styles.divider} />

        <View style={styles.menuSection}>
          {menuItems.slice(5).map(renderMenuItem)}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground ,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userInfoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
  },
  divider: {
    height: 8,
    backgroundColor: '#F9FAFB',
    marginVertical: 8,
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIconContainer: {
    marginRight: 16,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  dangerText: {
    color: '#EF4444',
  },
  chevronContainer: {
    padding: 4,
  },
  chevronText: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default Profile;
