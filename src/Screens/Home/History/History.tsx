import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Divider from '../../../Components/Divider';
import HistoryCard from '../../../Components/HistoryCard';
import {getAuth} from '@react-native-firebase/auth';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {getApp} from '@react-native-firebase/app';
import HisoryCardSkeleton from '../../../Components/Skeleton/HisoryCardSkeleton';
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
  resultScore: string;
}
const History = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
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
            resultScore: data.resultScore,
          } as Patient;
        });
        console.log('Patient Data:', patientData);

        setPatients(patientData);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        Alert.alert('Error', 'Failed to load patient data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);
  console.log('Patients:', patients);

  if (loading) return <HisoryCardSkeleton />;
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
            resultScore={item.resultScore}
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
});

export default History;
