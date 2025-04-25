import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../../Components/BackButton/BackButton';
import PatientInfoCard from '../../Components/PatientInfoCard';
import {RouteProp, useRoute} from '@react-navigation/native';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {actualDownload, Downloader} from '../../Utils/DownloadManager';
import colors from '../../constant/colors';

interface ScanDetailProps {
  patientName: string;
  patientImage: string;
  patientDOB: Timestamp;
  age: string;
  gender: string;
  phoneNumber: string;
  patientReportImage: string;
  scanType: string;
  id: string;
  createdAt: Timestamp;
  uid: string;
  disease_confidence?: string;
}

const ScanDetail = () => {
  const route = useRoute<RouteProp<{params: {docID: string}}>>();
  const {docID} = route.params || {};
  const [scanData, setScanData] = useState<ScanDetailProps>({
    patientName: 'Rohit',
    patientImage: 'https://via.placeholder.com/150',
    patientDOB: firestore.Timestamp.fromDate(
      new Date('2005-03-29T00:07:37+05:30'),
    ),
    age: '25',
    gender: 'Male',
    phoneNumber: '9651342887',
    scanType: 'XRay',
    id: 'SC123456',
    patientReportImage: 'https://via.placeholder.com/400x300',
    createdAt: firestore.Timestamp.fromDate(
      new Date('2025-03-28T23:18:40+05:30'),
    ),
    uid: 'sdvdsv',
    scanResult: 'Normal',
  });
  const [loading, setLoading] = useState(false);

  //   const htmlContent = `
  //   <html>
  //     <head>
  //       <style>
  //         body { font-family: Arial, sans-serif; padding: 20px; }
  //         .header { text-align: center; margin-bottom: 20px; }
  //         .logo { width: 100px; }
  //         .section { margin-bottom: 20px; }
  //         .section-title { font-weight: bold; margin-bottom: 10px; }
  //         .image { width: 100%; max-width: 300px; }
  //       </style>
  //     </head>
  //     <body>
  //       <div class="header">
  //         <img src="https://your-app-logo-url.com/logo.png" class="logo" alt="App Logo" />
  //         <h1>Scan Report</h1>
  //       </div>
  //       <div class="section">
  //         <div class="section-title">Patient Information</div>
  //         <p><strong>Name:</strong> ${scanData.patientName}</p>
  //         <p><strong>Phone Number:</strong> ${scanData.phoneNumber}</p>
  //       </div>
  //       <div class="section">
  //         <div class="section-title">Scan Details</div>
  //         <p><strong>Scan Type:</strong> ${scanData.scanType}</p>
  //         <p><strong>Date:</strong> ${scanData.createdAt.toDate().toLocaleDateString}</p>
  //         <p><strong>Time:</strong> ${scanData.createdAt.toDate().toLocaleTimeString()}</p>
  //         <p><strong>Result:</strong> ${scanData.scanResult}</p>
  //       </div>
  //       <div class="section">
  //         <div class="section-title">Patient Image</div>
  //         <img src="${scanData.patientImage}" class="image" alt="Patient Image" />
  //       </div>
  //       <div class="section">
  //         <div class="section-title">Scan Image</div>
  //         <img src="${scanData.patientReportImage}" class="image" alt="Scan Image" />
  //       </div>
  //     </body>
  //   </html>
  // `;

  const htmlContent = `
<html>
  <head>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 40px;
        background-color: #fff;
        color: #333;
      }

      .container {
        border-radius: 12px;
        max-width: 800px;
        margin: auto;
      }

      .header {
        text-align: center;
        margin-bottom: 30px;
      }

      .logo {
        font-size: 32px;
        font-weight: bold;
        color: #004085;
        margin-bottom: 5px;
      }

      h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 0;
      }

      .section {
        margin-bottom: 30px;
      }

      .section-title {
        font-size: 18px;
        font-weight: bold;
        border-left: 4px solid #004085;
        padding-left: 10px;
        margin-bottom: 15px;
        color: #004085;
      }

      p {
        margin: 6px 0;
        font-size: 15px;
      }

      .divider {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
      }

      .image-section {
        flex: 1;
        text-align: center;
      }

      .image-section .section-title {
        text-align: left;
      }

      .image {
        width: 100%;
        max-width: 250px;
        max-height: 300px;
        object-fit: cover;
        border-radius: 10px;
        border: 1px solid #ccc;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }

      .footer {
        text-align: center;
        font-size: 13px;
        color: #999;
        margin-top: 50px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">InstaScan</div>
        <h1>Scan Report</h1>
      </div>

      <div class="section">
        <div class="section-title">Patient Information</div>
        <p><strong>Name:</strong> ${scanData.patientName}</p>
        <p><strong>Phone Number:</strong> ${scanData.phoneNumber}</p>
        <p><strong>Gender:</strong> ${scanData.gender}</p>
        <p><strong>Date of Birth:</strong> ${scanData.patientDOB
          .toDate()
          .toLocaleDateString()}</p>
        <p><strong>Patient ID:</strong> ${scanData.id}</p>
      </div>

      <div class="section">
        <div class="section-title">Scan Details</div>
        <p><strong>Scan Type:</strong> ${scanData.scanType}</p>
        <p><strong>Date:</strong> ${scanData.createdAt
          .toDate()
          .toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${scanData.createdAt
          .toDate()
          .toLocaleTimeString()}</p>
        <p><strong>Result Confidence:</strong> ${
          scanData.disease_confidence
        }</p>
      </div>

      <div class="divider">
        <div class="image-section">
          <div class="section-title">Patient Image</div>
          <img src="${
            scanData.patientImage
          }" class="image" alt="Patient Image" />
        </div>
        <div class="image-section">
          <div class="section-title">Scan Image</div>
          <img src="${
            scanData.patientReportImage
          }" class="image" alt="Scan Image" />
        </div>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} InstaScan. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;

  const createPDF = async () => {
    let options = {
      html: htmlContent,
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // Downloader(file.filePath);
    await actualDownload(file.filePath, scanData.patientName);
    console.log(file.filePath);
    // Alert.alert(file.filePath);
    setLoading(false);
  };

  useEffect(() => {
    const fetchScanDetails = async () => {
      try {
        const doc = await firestore().collection('patients').doc(docID).get();
        console.log(doc.data());

        if (doc.exists && doc.data()) {
          setScanData(doc.data() as ScanDetailProps); // Set the fetched data
        } else {
          Alert.alert('Error', 'No such document found!');
        }
      } catch (error) {
        console.error('Error fetching scan details:', error);
        Alert.alert('Error', 'Failed to load scan details.');
      } finally {
        setLoading(false);
      }
    };

    fetchScanDetails();
  }, [docID]);

  const handleDownload = () => {
    // Implement download functionality
    setLoading(true);
    console.log('Downloading scan:', scanData.id);
    createPDF();
    // In a real app, you would use react-native-fs or similar to download the file
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <BackButton title="Scan Details" />

      <ScrollView style={styles.scrollView}>
        {/* Patient Info Card */}
        <PatientInfoCard
          name={scanData.patientName}
          age={scanData.age}
          dob={scanData.patientDOB.toDate().toDateString()}
          imageUrl={scanData.patientImage}
        />

        {/* Scan Info Card */}
        <View style={styles.scanInfoCard}>
          <Text style={styles.sectionTitle}>Scan Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="medical-bag"
                size={20}
                color="#0066CC"
                style={styles.infoIcon}
              />
              <View>
                <Text style={styles.infoLabel}>Scan Type</Text>
                <Text style={styles.infoValue}>{scanData.scanType}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="calendar"
                size={20}
                color="#0066CC"
                style={styles.infoIcon}
              />
              <View>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>
                  {scanData.createdAt.toDate().toDateString()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons
                name="time-outline"
                size={20}
                color="#0066CC"
                style={styles.infoIcon}
              />
              <View>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>
                  {scanData.createdAt.toDate().toLocaleTimeString('en-US')}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#0066CC"
                style={styles.infoIcon}
              />
              <View>
                <Text style={styles.infoLabel}>disease_confidence</Text>
                <Text style={styles.infoValue}>
                  {scanData.disease_confidence}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Scan Image */}
        <View style={styles.scanImageCard}>
          <Text style={styles.sectionTitle}>Scan Image</Text>
          <Image
            source={{uri: scanData.patientReportImage}}
            style={styles.scanImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}>
            {loading ? (
              <ActivityIndicator
                size={'small'}
                style={{marginHorizontal: 5}}
                color="#fff"
              />
            ) : null}
            <FontAwesome5
              name="download"
              size={16}
              color="#fff"
              style={styles.downloadIcon}
            />

            <Text style={styles.downloadText}>Download Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  patientCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#0066CC',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  patientMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  patientMetaItem: {
    marginRight: 16,
  },
  patientMetaLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  patientMetaValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  scanInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  scanImageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scanImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  downloadButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadIcon: {
    marginRight: 8,
  },
  downloadText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ScanDetail;
