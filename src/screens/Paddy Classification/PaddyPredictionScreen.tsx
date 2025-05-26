import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PaddyPredictionScreenProps } from '../../Naviagtion/types'
import colors from '../../theme/colors'
import PaddyContainer from '../../components/PaddyContainer'
import PaddyHeader from '../../components/PaddyHeader'
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper'
import { PieChart } from 'react-native-chart-kit'
import api from '../../api/axios'
export const PADDY_PREDICTION_SCREEN = 'PADDY_PREDICTION_SCREEN'

const PaddyPredictionScreen: React.FC<PaddyPredictionScreenProps> = ({ route, navigation }) => {

  const { imageUri } = route.params
  console.log(imageUri)

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ predicted_class: string; confidence_score: string; number_of_data: string } | null>(null);

  const paddyVarieties: { [key: string]: string[] } = {
    'At 362': [
      'High-yielding variety developed by RRDI.',
      'Resistant to diseases like blast and brown spot.',
      'Suitable for both lowland and upland areas.',
      'Produces long, slender grains.',
      'Moderate resistance to lodging.'
    ],
    'At 309': [
      'High-yielding, early-maturing variety.',
      'Suitable for both irrigated and rainfed areas.',
      'Resistant to rice blast.',
      'Medium-sized grains with good cooking quality.',
      'Adaptable to both dry and wet zones.'
    ],
    'At 373': [
      'High resistance to blast and sheath blight.',
      'Good for lowland areas with sufficient irrigation.',
      'Tolerant to drought and short growing season.',
      'Suitable for both consumption and rice products.'
    ],
    'Bw 367': [
      'High grain yield and good rice quality.',
      'Performs well under both dry and wet conditions.',
      'Suitable for marginal lands.',
      'Resistant to bacterial leaf blight.'
    ],
    'Bg 359': [
      'Traditional variety with resistance to pests and diseases.',
      'Grown in both irrigated and rainfed fields.',
      'Strong tolerance to adverse environmental conditions.',
      'Produces medium to long grains, valued for taste and texture.'
    ],
    'Madathawalu': [
      'Indigenous variety with high market demand.',
      'Primarily grown in the wet zone of Sri Lanka.',
      'Known for its aroma and taste.',
      'Medium yield, valued for culinary qualities.'
    ],
    'Bg 352': [
      'Popular for resistance to lodging and pests.',
      'Grows well in both wet and dry climates.',
      'Produces high-quality rice.',
      'Moderate yield, preferred for its cooking qualities.'
    ],
    'Bg 300': [
      'Early variety developed by RRDI.',
      'Resistant to common paddy diseases and pests.',
      'Suitable for lowland and medium-highland areas.',
      'Medium-sized grains with good cooking texture.'
    ],
    'Kahawanu': [
      'Distinct aroma and flavor, one of the most popular varieties.',
      'Grown mainly in the dry zone.',
      'Resistant to drought and some diseases.',
      'Produces aromatic, long-grain rice, highly valued in local cuisine.'
    ],
    'Bg 374': [
      'High-yielding variety for lowland areas.',
      'Resistant to diseases like rice blast.',
      'Large, long grains.',
      'Suitable for food and seed production.'
    ]
  };

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
      const response = await api.post('/classification/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("after getting response")
      if (response.data.predicted_class && response.data.confidence_score && response.data.number_of_data) {
        console.log("in side response if condition")
        setPrediction({
          predicted_class: response.data.predicted_class,
          confidence_score: response.data.confidence_score,
          number_of_data: response.data.number_of_data,
        });
      } else {
        console.log("in side response else condition")
        Alert.alert('Error', 'Upload image unable to process. please re take!.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Upload image unable to process. please re take!.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    uploadImage()
  }, [])

  // Function to get the pie chart data
  const getPieChartData = (confidenceScore: string) => {
    const score = parseFloat(confidenceScore);
    return [
      {
        name: 'Confidence',
        population: score,
        color: colors.green,
        legendFontColor: '#7F7F7F',
        legendFontSize: 11,
      },
      {
        name: 'Remaining',
        population: 100 - score,
        color: colors.lightGray,
        legendFontColor: '#7F7F7F',
        legendFontSize: 11,
      },
    ];
  };

  return (
    <PaddyContainer
      scrollView={true}
      imageTop={true}
      customStyle={styles.con}
      header={
        <PaddyHeader
          imageUri={imageUri}
        />
      }
    >
      <View style={{ backgroundColor: 'white', marginTop: 20, paddingHorizontal: 15 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#1e90ff" />
        ) : (
          <>

            {prediction && (
              <View style={{ marginTop: 30}}>
                <Text style={styles.predictionTitle}>Prediction Result of Most Representative Paddy</Text>

                {/* Other Prediction Details */}
                <TouchableOpacity style={styles.resultCard}>
                  <View style={{ width: '70%', gap: 15 }}>
                    <Text style={styles.resultLabel}>Class:</Text>
                    <Text style={styles.resultValue}>{prediction.predicted_class}</Text>
                  </View>
                </TouchableOpacity>

                {/* Confidence Score Pie Charts */}
                <TouchableOpacity style={styles.resultCard}>
                  {prediction.confidence_score && (
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, marginBottom: 10 }}>Confidence Score</Text>
                      <PieChart
                        data={getPieChartData(prediction.confidence_score)}
                        width={240}
                        height={140}
                        chartConfig={{
                          backgroundColor: '#ffffff',
                          backgroundGradientFrom: '#ffffff',
                          backgroundGradientTo: '#ffffff',
                          decimalPlaces: 1,
                          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                          style: {
                            borderRadius: 16,
                          },
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="1"
                      />
                    </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.resultCard}>
                  <View style={{ width: '70%', gap: 15 }}>
                    <Text style={styles.resultLabel}>Number of Data Points:</Text>
                    <Text style={styles.resultValue}>{prediction.number_of_data}</Text>
                  </View>
                </TouchableOpacity>

                {/* Explanation of Paddy Variety */}
                {prediction.predicted_class && paddyVarieties[prediction.predicted_class] && (
                  <View style={styles.resultCardEx}>
                    <Text style={styles.resultLabel}>Paddy Variety Explanation:</Text>
                    <View style={{ marginTop: 10 }}>
                      {paddyVarieties[prediction.predicted_class].map((item, index) => (
                        <Text key={index} style={styles.resultValueEx}>{`• ${item}`}</Text>
                      ))}
                    </View>
                  </View>
                )}

              </View>
            )}

          </>
        )}
      </View>
    </PaddyContainer>
  );
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
  resultCard: {
    backgroundColor: colors.white,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  resultCardEx: {
    backgroundColor: colors.G200,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  resultLabel: {
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '900',
    marginTop: 5,
  },

  resultValueEx: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    marginTop: 5,
  },
  predictionTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
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
  },
});

export default PaddyPredictionScreen;
