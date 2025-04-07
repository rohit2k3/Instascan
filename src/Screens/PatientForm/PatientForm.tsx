import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import TextInputField from '../../Components/TextInputField/TextInputField';
import BackButton from '../../Components/BackButton/BackButton';
import UploadIcon from '../../assets/svg/UploadIcon';
import Gallery from '../../assets/svg/Gallery';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImage} from '../../Utils/Upload';
import {requestGalleryPermission} from '../../Utils/PermissionGrant';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { calculateAge, formatDate, generateScanId } from '../../Utils/HelperFunctions';
import firestore from '@react-native-firebase/firestore';
import { getAuth} from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type FormData = {
  patientName: string;
  patientImage: string;
  patientDOB:Date;
  age:number;
  gender:string;
  phoneNumber:string;
  patientReportImage:string;
  scanType:string;
  id:string
}

const PatientForm = () => {
  const uid = getAuth().currentUser?.uid;
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {scanType} = route.params || {};
  const {control, setValue, getValues, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      patientName: '',
      patientImage: '',
      patientDOB: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      age: '',
      gender: '',
      phoneNumber: '',
      patientReportImage: '',
      scanType: scanType,
      id:generateScanId(),
      resultScore:0,
    },
  });

  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [uploadScanImageLoading, setUploadScanImageLoading] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const onSubmit = async (data:FormData) => {
    // Validate required fields
    if (!data.patientName) {
      Alert.alert('Missing Information', 'Please enter patient name');
      return;
    }
    if (!data.patientReportImage) {
      Alert.alert('Missing Information', 'Please upload a scan image');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create a timestamp for the record
      const timestamp = firestore.Timestamp.now();
      
      // Format date as a Firebase timestamp
      const dobTimestamp = firestore.Timestamp.fromDate(data.patientDOB);
      //calculate age from dob and store it
      const age = calculateAge(data.patientDOB);
      setValue('age', age);
      
      // Prepare data for Firestore
      const patientData = {
        ...data,
        uid,
        patientDOB: dobTimestamp,
        createdAt: timestamp,
      };
      
      // Add document to Firestore
      const resData = await firestore().collection('patients').add(patientData)
      

      //update patientData and in this convert the date and time to localtime
      
      navigation.navigate("ScanDetailScreen",{docID:resData.id})
      
    } catch (error) {
      console.error('Error submitting patient data:', error);
      Alert.alert(
        'Error',
        'Failed to submit patient information. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePicker = async () => {
    const permissionCheck = await requestGalleryPermission();
    if (!permissionCheck) {
      return;
    }
    try {
      const imageFile = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (imageFile.assets) {
        setUploadImageLoading(true);
        const uploadedImageURL = await uploadImage(imageFile.assets[0]);
        if (uploadedImageURL) {
          setValue('patientImage', uploadedImageURL);
        }
        setUploadImageLoading(false);
      }
    } catch (error) {
      console.log(error);
      setUploadImageLoading(false);
    }
  };

  const handleScanImagePicker = async () => {
    const permissionCheck = await requestGalleryPermission();
    if (!permissionCheck) {
      return;
    }
    try {
      const imageFile = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (imageFile.assets) {
        setUploadScanImageLoading(true);
        const uploadedImageURL = await uploadImage(imageFile.assets[0]);
        if (uploadedImageURL) {
          setValue('patientReportImage', uploadedImageURL);
        }
        setUploadScanImageLoading(false);
      }
    } catch (error) {
      console.log(error);
      setUploadScanImageLoading(false);
    }
  };

  const genderOptions = ['Male', 'Female', 'Other'];

  return (
    <View style={styles.container}>
      <BackButton title="Patient Information" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.uploadContainer}>
          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Patient Photo</Text>
            <View style={styles.imageContainer}>
              {uploadImageLoading ? (
                <ActivityIndicator size="large" color="#6366F1" />
              ) : (
                <>
                  {getValues('patientImage') ? (
                    <Image
                      source={{uri: getValues('patientImage')}}
                      style={styles.uploadedImage}
                    />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Gallery width={40} height={40} />
                    </View>
                  )}
                </>
              )}
            </View>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImagePicker}
              activeOpacity={0.7}>
              <UploadIcon width={18} height={18} />
              <Text style={styles.uploadButtonText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Scan {scanType}</Text>
            <View style={styles.imageContainer}>
              {uploadScanImageLoading ? (
                <ActivityIndicator size="large" color="#6366F1" />
              ) : (
                <>
                  {getValues('patientReportImage') ? (
                    <Image
                      source={{uri: getValues('patientReportImage')}}
                      style={styles.uploadedImage}
                    />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Gallery width={40} height={40} />
                    </View>
                  )}
                </>
              )}
            </View>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleScanImagePicker}
              activeOpacity={0.7}>
              <UploadIcon width={18} height={18} />
              <Text style={styles.uploadButtonText}>Upload Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Personal Details</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          {/* Name Input */}
          <Controller
            control={control}
            name="patientName"
            render={({field: {onChange, value}}) => (
              <TextInputField
                label="Full Name"
                // placeholder="Enter patient's full name"
                value={value}
                onChangeText={onChange}
                iconName="user"
            iconType="FontAwesome"
                keyboardType="default"
              />
            )}
          />

          {/* Date of Birth Input */}
          <Controller
            control={control}
            name="patientDOB"
            render={({field: {onChange, value}}) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Date of Birth</Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setDatePickerOpen(true)}>
                  <Text style={styles.datePickerButtonText}>
                    {value ? formatDate(value.toString()) : 'Select Date of Birth'}
                  </Text>
                  <FontAwesome5 name='calendar-alt' size={20}/>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={datePickerOpen}
                  date={value || new Date()}
                  mode="date"
                  maximumDate={new Date()}
                  onConfirm={(date) => {
                    setDatePickerOpen(false);
                    onChange(date);
                    setValue('age', calculateAge(date));
                  }}
                  onCancel={() => {
                    setDatePickerOpen(false);
                  }}
                />
              </View>
            )}
          />

          {/* Gender Dropdown */}
          <Controller
            control={control}
            name="gender"
            render={({field: {onChange, value}}) => (
              <View style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel , {position:'relative'}]}>Gender</Text>
                <SelectDropdown
                  data={genderOptions}
                  onSelect={selectedItem => onChange(selectedItem)}
                  buttonStyle={styles.dropdownButton}
                  buttonTextStyle={styles.dropdownButtonText}
                  dropdownStyle={styles.dropdown}
                  rowStyle={styles.dropdownRow}
                  rowTextStyle={styles.dropdownRowText}
                  selectedRowStyle={styles.dropdownSelectedRow}
                  selectedRowTextStyle={styles.dropdownSelectedRowText}
                  defaultValue={value}
                  renderItem={item => (
                    <View style={styles.dropdownRow}>
                      <Text style={styles.dropdownRowText}>{item}</Text>
                    </View>
                  )}
                  renderButton={() => (
                    <View style={styles.dropdownButton}>
                      <Text style={styles.dropdownButtonText}>
                        {value ? value : 'Select Gender'}
                      </Text>
                    </View>
                  )}
                />
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={30}
                  color="#4B5563"
                  style={{position:"absolute" , right:10 , top:40}}
                  />
              </View>
            )}
          />

          {/* Phone Number Input */}
          <Controller
            control={control}
            name="phoneNumber"
            render={({field: {onChange, value}}) => (
              <TextInputField
                label="Phone Number"
                // placeholder="Enter contact number"
                value={value}
                iconName='phone'
                iconType="FontAwesome"
                onChangeText={onChange}
                keyboardType="phone-pad"
              />
            )}
          />
        </View>

        <TouchableOpacity 
          style={[
            styles.submitButton, 
            isSubmitting && styles.submitButtonDisabled
          ]} 
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    padding: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  uploadSection: {
    width: '48%',
    alignItems: 'center',
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 8,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  uploadButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#6366F1',
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  dropdownButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  dropdownButtonText: {
    textAlign: 'left',
    color: '#4B5563',
    fontSize: 16,
    paddingLeft: 8,
  },
  dropdown: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  dropdownRow: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownRowText: {
    fontSize: 16,
    color: '#4B5563',
    margin: 10,
    textAlign: 'center',
  },
  dropdownSelectedRow: {
    backgroundColor: '#EEF2FF',
  },
  dropdownSelectedRowText: {
    color: '#6366F1',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: '#A5A6F6',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#666',
    fontSize: 16,
  },
  datePickerButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  datePickerButtonText: {
    color: '#4B5563',
    fontSize: 16,
  },
});

export default PatientForm;
