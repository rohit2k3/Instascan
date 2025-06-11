"use client"

import { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  type ImageSourcePropType,
} from "react-native"
import OnboardingItem from "./OnboardingItem"
import Paginator from "./Paginator"
import colors from "../../constant/colors"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import AssetImages from "../../assets/images/Images"

interface OnboardingSlide {
  id: string
  title: string
  description: string
  image: ImageSourcePropType
}

const slides: OnboardingSlide[] = [
  {
    id: "1",
    title: "Welcome to InstaScan",
    description: "The easiest way to scan, organize, and share your documents on the go.",
    image: AssetImages.logo,
  },
  {
    id: "2",
    title: "Scan Anything",
    description: "Quickly scan documents, receipts, IDs, and more with our powerful scanner.",
    image: AssetImages.logo,
  },
  {
    id: "3",
    title: "Organize Your Way",
    description: "Create folders, add tags, and search through all your documents instantly.",
    image: AssetImages.logo,
  },
  {
    id: "4",
    title: "Share Securely",
    description: "Share documents securely with anyone, anywhere, anytime.",
    image: AssetImages.logo,
  },
]

const Onboarding = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef<FlatList>(null)
  const { width } = useWindowDimensions()

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = (index: number) => {
    if (slidesRef.current) {
      slidesRef.current.scrollToIndex({ index })
    }
  }

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      scrollTo(currentIndex + 1)
    } else {
      navigation.replace("LoginScreen")
    }
  }

  const skipToEnd = () => {
    scrollTo(slides.length - 1)
  }



  return (
    <View style={styles.container}>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Paginator data={slides} scrollX={scrollX} />

        <View style={styles.buttonContainer}>
          {currentIndex < slides.length - 1 ? (
            <>
              <TouchableOpacity style={styles.skipButton} onPress={skipToEnd} activeOpacity={0.8}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextButton} onPress={nextSlide} activeOpacity={0.8}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.replace("LoginScreen")} activeOpacity={0.8}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistContainer: {
    flex: 3,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
  },
  skipButton: {
    padding: 12,
  },
  skipButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  getStartedButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  getStartedButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
})

export default Onboarding

