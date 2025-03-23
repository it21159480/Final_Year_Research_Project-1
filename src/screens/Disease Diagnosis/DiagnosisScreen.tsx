import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert,ImageBackground } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import styles from './styles/DiagnosisScreenStyles';  
import LottieView from 'lottie-react-native';
import { DiagnosisScreenProps } from '../../Naviagtion/types';
import { REMEDY_SCREEN } from './RemedyScreen';
import ImagePickerComponent from '../../components/ImagePickerComponent';

export const DIAGNOSIS_SCREEN = 'DIAGNOSIS_SCREEN' 
const DiagnosisScreen:React.FC<DiagnosisScreenProps>  = ({navigation}) => {
  const [imageUri, setImageUri] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<any>(null);

  

  // const navigation = useNavigation<any>(); // Initialize the navigation hook

  const handleImageUpload = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri;
        setImageUri(uri || '');  
        setPrediction(null);

        try {
          setLoading(true);
          let formData = new FormData();
          formData.append('image', { uri, type: 'image/jpeg', name: 'image.jpg' });

          const responseFromApi = await axios.post(
            'http://172.28.30.127:5000/predict',  
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );

          if (responseFromApi.data.predicted_label) {
            setPrediction(responseFromApi.data);

            if (responseFromApi.data.predicted_label.toLowerCase() === 'normal') {
              Alert.alert('Result', 'It\'s a healthy paddy leaf!');
            }
          } else {
            if (responseFromApi.data.message === 'Not a Paddy Leaf') {
              Alert.alert('Error', 'This is not a Paddy Leaf!');
            } else {
              Alert.alert('Error', 'Something went wrong. No prediction returned.');
            }
          }
        } catch (error: any) {
          if (error.response && error.response.data.message === 'Not a Paddy Leaf') {
            Alert.alert('Error', 'This is not a Paddy Leaf!');
          } else {
            Alert.alert('Error', 'Error making request');
          }
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleImagePicked = async (uri :string)=>{
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('image', { uri, type: 'image/jpeg', name: 'image.jpg' });

      const responseFromApi = await axios.post(
        'http://172.28.30.127:5000/predict',  
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (responseFromApi.data.predicted_label) {
        setPrediction(responseFromApi.data);

        if (responseFromApi.data.predicted_label.toLowerCase() === 'normal') {
          Alert.alert('Result', 'It\'s a healthy paddy leaf!');
        }
      } else {
        if (responseFromApi.data.message === 'Not a Paddy Leaf') {
          Alert.alert('Error', 'This is not a Paddy Leaf!');
        } else {
          Alert.alert('Error', 'Something went wrong. No prediction returned.');
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data.message === 'Not a Paddy Leaf') {
        Alert.alert('Error', 'This is not a Paddy Leaf!');
      } else {
        Alert.alert('Error', 'Error making request');
      }
    } finally {
      setLoading(false);
    }

  }
  // Function to navigate to Remedy Screen
  const handleNavigateToRemedy = () => {
    if (prediction && prediction.predicted_label) {
      navigation.navigate(REMEDY_SCREEN, { disease: prediction.predicted_label });
    } else {
      Alert.alert('Error', 'Please make a prediction first!');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/background3.jpg')} 
      style={styles.background} 
    >
    <View style={styles.container}>
   
      <Text style={styles.title}>Upload an Image to Identify the Paddy Disease</Text>

     

      {loading && <Text style={styles.loadingText}>Processing...</Text>}

      {imageUri ? (
  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
) : (
  <>
    <Text>No Image Selected</Text>
    {imageUri === '' && (
      <LottieView
        source={require('../../assets/animations/ChooseLeaf.json')}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />
    )}
  </>
)}


      {prediction && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Predicted Label: {prediction.predicted_label}</Text>

        
          {prediction.predicted_label.toLowerCase() !== 'normal' && (
            <TouchableOpacity onPress={handleNavigateToRemedy}>
              <Text style={styles.remedyLink}>See Remedy Suggestions</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      {prediction ? (
        <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Choose Another Image</Text>
        </TouchableOpacity>
                // <ImagePickerComponent  onImagePicked={handleImagePicked}/> 


      ) : (
        // Button to choose image if no prediction is made
        <>
        <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Choose Image</Text>
        </TouchableOpacity>
        {/* <ImagePickerComponent  onImagePicked={handleImagePicked}/>  */}
        </>
      )}

    </View>
    </ImageBackground>
  );
};

export default DiagnosisScreen;
