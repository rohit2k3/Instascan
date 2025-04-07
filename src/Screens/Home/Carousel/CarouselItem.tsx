import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'

const {width} = Dimensions.get('screen')

type CarouselItemProps = {
    ImageSrc: any,
    title: string,
}

const CarouselItem = ({ImageSrc , title }:CarouselItemProps) => {
  return (
    <View style={style.slideContainer}>
      <View>
        <Image source={ImageSrc} style={{height:100 , width:50}} />
        <Text>{title}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
    slideContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))',
        height: 200,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 10,
        width: width - 40,
      },
      image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
      },
      overlay: {
        position: "absolute",
        bottom: 15,
        left: 15,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: 8,
        borderRadius: 8,
      },
      text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
})

export default CarouselItem