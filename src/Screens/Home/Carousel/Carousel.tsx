import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import AssetImages from "../../../assets/images/Images";
import CarouselItem from "./CarouselItem";

const { width } = Dimensions.get("window");

const slides = [
  { image: AssetImages.appNameWithLogo, text: "Welcome to Instascan" },
  { image: AssetImages.appNameWithLogo, text: "Scan X-rays & Skin Conditions Instantly" },
  { image: AssetImages.appNameWithLogo, text: "Get Medical Results on the Go" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const navigateToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <CarouselItem ImageSrc={item.image} title={item.text} />
        )}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot
            ]}
            onPress={() => navigateToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    alignItems: "center",
  },
  flatListContent: {
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 6,
    // transition: 'width 0.3s',
  },
  activeDot: {
    backgroundColor: "#007bff",
    width: 24,
  },
});

export default Carousel;
