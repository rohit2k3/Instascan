import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import NewsBottomSheet from './Screens/Home/News/Components/NewsBottomSheet';
import CameraPick from './Screens/Home/BottomSheet/CameraPick';

 
registerSheet('scan-sheet' , CameraPick)
registerSheet('news-sheet', NewsBottomSheet);
 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'news-sheet': SheetDefinition<{
        payload:{
            description: string;
        }
    }>
    'scan-sheet': SheetDefinition<{payload:{test: string}}>

  }
}
 
export {};