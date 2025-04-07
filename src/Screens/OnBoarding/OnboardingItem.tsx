import type React from "react"
import { View, Text, StyleSheet, Image, useWindowDimensions, type ImageSourcePropType } from "react-native"

interface OnboardingItemProps {
  item: {
    id: string
    title: string
    description: string
    image: ImageSourcePropType
  }
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item }) => {
  const { width } = useWindowDimensions()

  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={[styles.image, { width: width * 0.8, resizeMode: "contain" }]} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    flex: 0.6,
    justifyContent: "center",
    height: 300,
    marginBottom: 30,
  },
  textContainer: {
    flex: 0.4,
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontWeight: "400",
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
})

export default OnboardingItem

