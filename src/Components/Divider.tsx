import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Divider = ({title}:{title:String}) => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.divider} />
      <Text style={styles.dividerText}>{title}</Text>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:24
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#666',
    fontSize: 16,
  },
});

export default Divider;
