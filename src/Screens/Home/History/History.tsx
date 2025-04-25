import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Divider from '../../../Components/Divider';
import HistoryCard from '../../../Components/HistoryCard';
import {getAuth} from '@react-native-firebase/auth';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {getApp} from '@react-native-firebase/app';
import HisoryCardSkeleton from '../../../Components/Skeleton/HisoryCardSkeleton';
import {useFocusEffect} from '@react-navigation/native';
const {width} = Dimensions.get('window');

interface Patient {
  age: string;
  createdAt: Timestamp;
  gender: 'Male' | 'Female' | 'Other';
  id: string;
  patientDOB: Timestamp;
  patientImage: string;
  patientName: string;
  patientReportImage: string;
  phoneNumber: string;
  scanType: string;
  uid: string;
  disease_confidence: string;
}
const History = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const user = getApp().auth().currentUser; // Get the current user
      if (!user) {
        Alert.alert('Error', 'User not logged in.');
        return;
      }

      const querySnapshot = await firestore()
        .collection('patients')
        .where('uid', '==', user.uid) // Filter by UID
        .orderBy('createdAt', 'desc') // Sort by latest scans
        .get();

      const patientData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          age: data.age,
          createdAt: data.createdAt,
          gender: data.gender,
          patientDOB: data.patientDOB,
          patientImage: data.patientImage,
          patientName: data.patientName,
          patientReportImage: data.patientReportImage,
          phoneNumber: data.phoneNumber,
          scanType: data.scanType,
          uid: data.uid,
          disease_confidence: data.disease_confidence,
        } as Patient;
      });
      setPatients(patientData);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      Alert.alert('Error', 'Failed to load patient data.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPatients();
      console.log('fcous ');
    }, []),
  );

  if (loading) return <HisoryCardSkeleton />;

  if (patients.length === 0) {
    return (
      <View style={styles.container}>
        <Divider title={'Scan History'} />
        <View style={styles.emptycontainer}>
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
              color: '#666',

            }}>
            No Scan History Found
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Divider title={'Scan History'} />
      <FlatList
        data={patients}
        // onScroll={handleScroll}
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginHorizontal: 'auto',
        }}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <HistoryCard
            key={item.id}
            date={item.createdAt}
            patientName={item.patientName}
            resultScore={item.disease_confidence}
            scanType={item.scanType}
            docID={item.id}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginHorizontal: 10,
  },
  emptycontainer: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
    width: width - 40,
    height: 150,
  },
});

export default History;
