/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PredictionScreenProps } from '../../Naviagtion/types'
import colors from '../../theme/colors'
import Container from '../../components/Container';
import PRHeader from '../../components/PRHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotFoundIcon from '../../assets/not-found.png'
import { Card, Divider } from 'react-native-paper';
import NotFound from '../../components/NotFound';
import { leafFolderPestInfo, stemBorerPestInfo, brownPlantHopperPestInfo } from '../../constant/pestProfile';
import axios from 'axios';
import { Alert } from 'react-native';

export const PREDICTION_SCREEN = 'PREDICTION_SCREEN';

const PredictionScreen: React.FC<PredictionScreenProps> = ({ route, navigation }) => {

  const { imageUri } = route.params
  console.log(imageUri)
  const [imageNotFound, setImageNotFound] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [prediction, setPrediction] = useState<any>(null); // Track API response data
  const [pestInfo, setPestInfo] = useState<any>([]); // Track the selected pest info based on prediction
  const className = ['1 Rice-leaf-folder', '1 Yellow-Stem-Borer', '1 Brown-Plant-Hopper'];
  const uploadImage = async () => {
    if (!imageUri) {
      console.log("Image select failed!");
      Alert.alert('No Image Selected', 'Please select an image first.');
      return;
    }
    console.log("Image select success!");

    setLoading(true);
    const formData = new FormData();
    const file = {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    };
    console.log("file name:", file);
    formData.append('image', file);

    try {
      console.log("Inside the try catch!");
      const response = await axios.post('http://192.168.250.1:1031/predict/pest', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("after getting response");

      if (response.data.yolo_results && response.data.yolo_results.length > 0) {
        const result = response.data.yolo_results[0]; // Assuming one result (center crop)
        console.log("Class Name:", result.class_name);
        console.log("Predicted Image Path:", result.predicted_image_path);
        setPrediction({
          predicted_class: result.class_name,
          predicted_image_path: result.predicted_image_path,
        });
        switch (result.class_name) {
          case '1 Rice-leaf-folder':
            setPestInfo(leafFolderPestInfo);
            break;
          case '1 Yellow-Stem-Borer':
            setPestInfo(stemBorerPestInfo);
            break;
          case '1 Brown-Plant-Hopper':
            setPestInfo(brownPlantHopperPestInfo);
            break;
          default:
            setPestInfo([]);
            break;
        }
        setImageNotFound(false);
      } else {
        Alert.alert('Error', 'Unable to process the uploaded image.');
        setImageNotFound(true);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Upload image unable to process. Please retry.');
    } finally {
      setLoading(false);
    }
  };
console.log('Prediction:', prediction);
  useEffect(() => {
    uploadImage();
  }, []);
  // Track if image is not found

  return (
    <Container
      scrollView={true}
      imageTop={true}
      customStyle={styles.con}
      header={
        <PRHeader
          imageUri={imageUri}
        />
      }
    >
      <View style={{ marginTop: 20 }}>
        {loading ?
          (<ActivityIndicator size="large" color={colors.GR700} />)
          : (
            <>
              {imageNotFound && <NotFound />}
              {!imageNotFound && <View>
               {pestInfo.length > 0 ? (pestInfo.map((item, index) => {
                  return (
                    <View key={index} style={{ marginBottom: 20, padding: 10 }}>
                      <Text style={styles.title}>{item.section}</Text>
                      <Divider />
                      {item.description && item.description.map((desc, i) => {
                        return (
                          <Text key={i} style={styles.description}>{desc}</Text>
                        )
                      })}

                      {item.details && (
                        <View>
                          <Text style={styles.description}>• Common Name: {item.details.commonName}</Text>
                          <Text style={styles.description}>• Scientific Name: {item.details.scientificName}</Text>
                          <Text style={styles.description}>• Egg: {item.details.egg}</Text>
                          {item.details.larvae && <Text style={styles.description}>• Larvae: {item.details.larvae}</Text>}
                          {item.details.pupa && <Text style={styles.description}>• Pupa: {item.details.pupa}</Text>}
                          <Text style={styles.description}>• Adult: {item.details.adult}</Text>
                        </View>
                      )}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                        {item.images && item.images.map((img, i) => {
                          return (
                            <Image key={i} source={{ uri: img.src }} style={styles.image} />
                          )
                        })}
                      </View>

                      {item.subSections && item.subSections.map((sub, i) => {
                        return (
                          <View key={i}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                              <Text style={[styles.title, { backgroundColor: colors.GR300, padding: 5, margin: 5, borderRadius: 20 }]}>{sub.method}</Text>
                            </View>
                            <View style={{ gap: 10 }}>
                              {sub.actions && sub.actions.map((act, j) => {
                                return (
                                  <Text key={j} style={styles.description}>• {act}</Text>
                                )
                              })}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                              {sub.images && sub.images.map((img, j) => {
                                return (
                                  <Image key={j} source={{ uri: img.src }} style={styles.image} />
                                )
                              })}
                            </View>
                          </View>
                        )
                      })}
                    </View>
                  )
                }
                )):(<NotFound />)} {
                }
              </View>}
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
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 13,
    textAlign: 'left',
    marginBottom: 5,
    color: colors.black,
  },
  cardImage: {
    height: 100, // Reduce the height of the image inside the card
    borderTopLeftRadius: 10, // Optional: Rounded corners for the card image
    borderTopRightRadius: 10, // Optional: Rounded corners for the card image
  },
  con: {
    backgroundColor: colors.G100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,

  }
});
export default PredictionScreen