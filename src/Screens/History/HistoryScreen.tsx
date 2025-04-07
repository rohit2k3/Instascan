import {View, Text, FlatList, Alert, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../Components/BackButton/BackButton';
import HistoryCard from '../../Components/HistoryCard';
import {getAuth} from '@react-native-firebase/auth';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import HistoryScreenSkeleton from '../../Components/Skeleton/HistoryScreenSkeleton';

interface PatientData {
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

const HistoryScreen = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const user = getAuth().currentUser;
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
          };
        });

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

  if (loading) return <HistoryScreenSkeleton />


  return (
    <View>
      <BackButton title="Scan History" />
      {patients.length > 0 ? (
        <FlatList
          data={patients}
          style={{
            marginHorizontal: 'auto',
          }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => (
            <HistoryCard
              key={item.id}
              date={item.createdAt}
              docID={item.id}
              patientName={item.patientName}
              resultScore={item.resultScore}
              scanType={item.scanType}
            />
          )}
        />
      ) : (
        <View>
          <Text style={{textAlign: 'center', marginVertical: 'auto'}}>
            No History found
          </Text>
        </View>
      )}
    </View>
  );
};

export default HistoryScreen;
