import {PermissionsAndroid, Platform} from 'react-native';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

export const Downloader = async (invoiceURL:string , name:string) => {
  if (Platform.OS === 'ios') {
    actualDownload(invoiceURL , name);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      actualDownload(invoiceURL , name);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload(invoiceURL , name);
      } else {
        console.log('please grant permission');
      }
    } catch (err) {
      console.log('display error', err);
    }
  }
};

export const actualDownload = async (invoiceUrl: string , name:string) => {
    const downloadPath = `${RNFS.DownloadDirectoryPath}/${name}_report.pdf`;
    await RNFS.moveFile(invoiceUrl, downloadPath);
    try { 
      const fileView = FileViewer.open(downloadPath, {showOpenWithDialog: true})
    } catch (error) {
      console.log(error);
    }
};
