/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PaddyPredictionScreenProps } from '../../Naviagtion/types'
import colors from '../../theme/colors'
import Container from '../../components/PaddyContainer'
import PaddyHeader from '../../components/PaddyHeader'
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper'

export const PADDY_PREDICTION_SCREEN = 'PADDY_PREDICTION_SCREEN'
const PaddyPredictionScreen: React.FC<PaddyPredictionScreenProps> = ({ route, navigation }) => {

  const { imageUri } = route.params
  console.log(imageUri)

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ predicted_class: string; confidence_score: string; number_of_data_point: string } | null>(null);

  const uploadImage = async () => {
    if (!imageUri) {
      console.log("Image select failed!")
      Alert.alert('No Image Selected', 'Please select an image first.');
      return;
    }
    console.log("Image select success!")

    setLoading(true);
    const formData = new FormData();
    const file = {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    };
    console.log("file name :", file)
    formData.append('image', file);

    try {
      console.log("Inside the try catch!")
      const response = await axios.post('http://192.168.14.64:1031/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("after getting resposne")
      if (response.data.predicted_class && response.data.confidence_score && response.data.number_of_data_point) {
        console.log("in side reponse if condition")
        setPrediction({
          predicted_class: response.data.predicted_class,
          confidence_score: response.data.confidence_score,
          number_of_data_point: response.data.number_of_data_point,
        });
      } else {
        console.log("in side reponse else condition")
        Alert.alert('Error', 'No prediction returned from the server.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'There was an error processing the image.');
    } finally {
      setLoading(false);
    }
  };

  useEffect( () => {
    uploadImage()
  },[])

  return (
    <Container
      scrollView={true}
      imageTop={true}
      customStyle={styles.con}
      header={
        <PaddyHeader
          imageUri={imageUri}
        />
      }
    >
      <View style={{backgroundColor:'white',marginTop:20}}>
        {loading ? (
          <ActivityIndicator size="large" color="#1e90ff" />
        ) : (
          // <TouchableOpacity onPress={uploadImage} style={{ backgroundColor: '#32cd32', padding: 15, borderRadius: 5 }}>
          //   <Text style={{ color: '#fff', fontSize: 18 }}>Get Prediction</Text>
          // </TouchableOpacity>
          <>
          {prediction && (
          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Prediction Result:</Text>
            <Text style={{ fontSize: 18, marginTop: 10 }}>Class: {prediction.predicted_class}</Text>
            <Text style={{ fontSize: 18, marginTop: 10 }}>Confidence: {prediction.confidence_score}</Text>
            <Text style={{ fontSize: 18, marginTop: 10 }}>Number of data point: {prediction.number_of_data_point}</Text>
          </View>
        )}
          </>
        )}
        
      </View>
    </Container>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.N400,
  },
  cardImage: {
    height: 100, // Reduce the height of the image inside the card
    borderTopLeftRadius: 10, // Optional: Rounded corners for the card image
    borderTopRightRadius: 10, // Optional: Rounded corners for the card image
  },
  con: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    top: 280,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,

  }
});
export default PaddyPredictionScreen