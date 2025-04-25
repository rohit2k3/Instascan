import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('screen');

type CarouselItemProps = {
  ImageSrc: any;
  title: string;
};

const CarouselItem = ({ ImageSrc, title }: CarouselItemProps) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={ImageSrc} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Instant Scan for X-Ray & Skin Conditions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    width: width - 40,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: '#f6f8fb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    backgroundColor: '#e6eef4',
  },
  textContainer: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default CarouselItem;
