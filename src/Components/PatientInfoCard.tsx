import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { Image } from 'react-native';

interface PatientInfoCardProps {
    imageUrl:string,
    name:string,
    age:string,
    dob:string,
}

const PatientInfoCard = ({name,age ,dob,imageUrl}:PatientInfoCardProps) => {
  return (
    <View style={styles.patientCard}>
      <View style={styles.patientHeader}>
        <Image
          source={{uri: imageUrl}}
          style={styles.patientImage}
        />
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{name}</Text>
          <View style={styles.patientMetaRow}>
            <View style={styles.patientMetaItem}>
              <Text style={styles.patientMetaLabel}>Age</Text>
              <Text style={styles.patientMetaValue}>
                {age} years
              </Text>
            </View>
            <View style={styles.patientMetaItem}>
              <Text style={styles.patientMetaLabel}>DOB</Text>
              <Text style={styles.patientMetaValue}>
                {dob}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    patientCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      patientHeader: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      patientImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#0066CC',
      },
      patientInfo: {
        flex: 1,
      },
      patientName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
      },
      patientMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      patientMetaItem: {
        marginRight: 16,
      },
      patientMetaLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
      },
      patientMetaValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
      },
})

export default PatientInfoCard;
