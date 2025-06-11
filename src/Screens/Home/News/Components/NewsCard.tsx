import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {SheetManager} from 'react-native-actions-sheet';

const {width} = Dimensions.get('window');

interface NewsCardProps {
  title: string;
  imageUrl: string;
  description: string;
}

const NewsCard = ({title, description, imageUrl}: NewsCardProps) => {
  const handleNewsBottomSheet = () => {
    

    SheetManager.show('news-sheet', {payload: {description: description}});
  };
  return (
    <TouchableWithoutFeedback onPress={handleNewsBottomSheet}>
      <View style={style.container}>
        <Image style={style.imageContainer} source={{uri: imageUrl}} />
        <Text style={style.titleText}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  container: {
    height: 250,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
    width: width - 20,
    position: 'relative',
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    width: '100%',
    borderRadius: 10,
    opacity: 0.4,
  },
  titleText: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: width - 40, // Adjust max width to prevent overflow
    flexShrink: 1,
  },
});

export default NewsCard;
