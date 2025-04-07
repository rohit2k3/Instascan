import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, Text } from "react-native";
import AssetImages from "../../../assets/images/Images";
import HistoryCard from "../../../Components/HistoryCard";
import CarouselItem from "./CarouselItem";

const { width } = Dimensions.get("window");

const slides = [
  { image: AssetImages.appNameWithLogo, text: "Welcome to Instascan" },
  { image: AssetImages.appNameWithLogo, text: "Welcome to Instascan" },
  { image: AssetImages.appNameWithLogo, text: "Welcome to Instascan" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = React.useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const navigateToSlide = (index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginHorizontal: 'auto',
        }}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <CarouselItem ImageSrc={item.image} title={item.text} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
            onPress={() => navigateToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    paddingBottom:30,
    alignItems: "center",
  },

  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ccc",
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#007bff",
    width:30
  },
});

export default Carousel;