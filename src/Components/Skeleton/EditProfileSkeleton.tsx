import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Skeleton} from './index';
import BackButton from '../BackButton/BackButton';
import colors from '../../constant/colors';

export default function EditProfileSkeleton() {
  return (
    <View style={styles.container}>
        <BackButton title="Edit Profile" />
        {/* repeat 5 times same thing */}
        {Array.from({ length: 2 }).map((_, index) => (
            <View key={index} style={styles.card}>
                <View style={{ gap: 8, flex: 1 }}>
                    <Skeleton width={60} height={20} style={styles.text} />
                    <Skeleton width={'60%'} height={20} style={styles.text} />
                </View>
                <View style={{ gap: 8, alignItems: 'flex-end' }}>
                    <Skeleton width={50} height={12} style={styles.text} />
                </View>
            </View>
        ))}
        <Skeleton width={'60%'} height={40} style={{marginHorizontal:"auto", borderRadius:10 , marginTop:40}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    // gap: 16,
    // marginTop:40
    backgroundColor: colors.screenBackground,
    height:'100%',
    width:'100%'
  },
  card: {flexDirection: 'row', alignItems: 'center', gap: 16, margin: 24},
  text: {borderRadius: 8},
});
