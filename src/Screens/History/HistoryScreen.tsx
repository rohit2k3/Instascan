import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../../Components/BackButton/BackButton';
import HistoryCard from '../../Components/HistoryCard';
import { getAuth } from '@react-native-firebase/auth';
import firestore, { Timestamp } from '@react-native-firebase/firestore';
import HistoryScreenSkeleton from '../../Components/Skeleton/HistoryScreenSkeleton';
import colors from '../../constant/colors';

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
  disease_confidence: string;
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
          .where('uid', '==', user.uid)
          .orderBy('createdAt', 'desc')
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

  if (loading) return <HistoryScreenSkeleton />;

  return (
    <View style={styles.container}>
      <BackButton title="Scan History" />
      {patients.length > 0 ? (
        <FlatList
          data={patients}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <HistoryCard
              key={item.id}
              date={item.createdAt}
              docID={item.id}
              patientName={item.patientName}
              resultScore={item.disease_confidence}
              scanType={item.scanType}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Scan History Found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screenBackground,
    flex: 1,
  },
  listContent: {
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default HistoryScreen;
