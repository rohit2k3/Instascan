import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import AssetImages from '../assets/images/Images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Timestamp } from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');
interface HistoryCardProps {
    patientName:string;
    scanType:string;
    resultScore:string;
    date:Timestamp;
    docID:string;
}
const HistoryCard = ({date,patientName,resultScore,scanType ,docID}:HistoryCardProps) => {
     const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('ScanDetailScreen' , {docID})}>
    <View style={style.container}>
        <View style={{marginVertical:'auto', marginHorizontal: 10}}>
            <Image source={AssetImages.pneumoniaIcon} style={{height:80, width:80}} />
        </View>
        <View style={{flex: 1 ,  justifyContent: 'center', paddingLeft: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{scanType} Test</Text>
            <Text style={{fontSize: 16, color: '#666'}}>Patient Name: {patientName}</Text>
            <Text style={{fontSize: 16, color: '#666'}}>Result: {resultScore}%</Text>
            <Text style={{fontSize: 16, color: '#666'}}>Date: {date.toDate().toDateString()}</Text>
            <Text style={{fontSize: 16, color: '#666'}}>Time: {date.toDate().toLocaleTimeString()}</Text>
        </View>
    </View>
    </ TouchableWithoutFeedback>
  )
}

const style = StyleSheet.create({
    container:{
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 10,
        width: width - 40,
    }
})

export default HistoryCard