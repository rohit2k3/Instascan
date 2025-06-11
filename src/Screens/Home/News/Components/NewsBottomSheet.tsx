import React, {useRef} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import ActionSheet, { SheetProps} from 'react-native-actions-sheet';


const NewsBottomSheet = (props: SheetProps<"news-sheet">) => {
  console.log("News Bottom Sheet Props: ", props);
  
  console.log(props);
  

  return (
    <ActionSheet id={props.sheetId}  animated={true} gestureEnabled={true}>
      <View style={styles.contentContainer}>
        <Text style={{fontSize:20 , }} >{props.payload?.description}</Text>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'grey'},
  contentContainer: {
    // height: ,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
});

export default NewsBottomSheet;
