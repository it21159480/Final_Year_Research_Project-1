/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PaddyPredictionScreenProps } from '../../Naviagtion/types'
import colors from '../../theme/colors'
import PaddyContainer from '../../components/PaddyContainer'
import PaddyHeader from '../../components/PaddyHeader'
import { ActivityIndicator } from 'react-native-paper'
// import { PieChart } from 'react-native-chart-kit'
import api from '../../api/axios'
export const PADDY_PREDICTION_SCREEN = 'PADDY_PREDICTION_SCREEN'

const PaddyPredictionScreen: React.FC<PaddyPredictionScreenProps> = ({ route }) => {

  const { imageUri } = route.params
  console.log(imageUri)

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ predicted_class: string; confidence_score: string; number_of_data: string } | null>(null);

const paddyVarieties: { [key: string]: string[] } = {
  'At 362': [
    "At 362 is a specially bred variety developed by the Rice Research and Development Institute (RRDI) aimed at increasing rice production. It has been engineered to produce a higher grain yield per hectare compared to traditional varieties, making it a valuable choice for farmers who want to maximize their output without compromising quality. The breeding process focused on enhancing both quantity and resilience to environmental stresses.",
    "This variety possesses genetic resistance to major fungal diseases such as rice blast and brown spot, which are common threats to paddy crops worldwide. Rice blast can cause severe yield losses by damaging leaves, stems, and grains, while brown spot affects seedling vigor and grain quality. The resistance reduces the need for chemical fungicides, lowering production costs and environmental impact.",
    "At 362 is versatile in terms of the environments it can thrive in. It performs well in lowland paddies, which are often flooded or irrigated, as well as in upland areas that rely more on rainfall and have better drainage. This adaptability makes it a preferred variety across different geographical zones, providing flexibility for farmers in various agroecological settings.",
    "The grain produced by At 362 is notably long and slender, characteristics that are often preferred by consumers for their texture and appearance. These grains typically cook into fluffy, separate kernels that are desirable in many culinary traditions. The shape also contributes to a higher milling recovery rate, meaning less grain is lost during processing.",
    "Lodging, the bending or falling over of rice plants due to wind, rain, or heavy grain heads, can drastically reduce yield and quality. At 362 has moderate resistance to lodging, meaning it is less likely to fall compared to more susceptible varieties, but not entirely immune. This trait helps maintain stable yields even under challenging weather conditions."
  ],
  'At 309': [
    "At 309 was developed to provide farmers with an option that not only produces a high yield but also matures earlier than many other varieties. Early maturation allows farmers to harvest sooner, which can help avoid late-season pests, diseases, or adverse weather, and also allows for potential multiple cropping cycles within a year.",
    "This variety adapts well to a range of water conditions, thriving in fields that receive consistent irrigation as well as those dependent on natural rainfall. Its ability to perform under varying moisture levels makes it a reliable choice for farmers in regions where water availability fluctuates seasonally.",
    "At 309 carries strong resistance to rice blast disease, which is one of the most destructive diseases affecting rice globally. This resistance helps reduce crop losses and decreases the reliance on chemical fungicides, promoting more sustainable farming practices.",
    "The grains produced are medium in size, which many consumers find ideal for everyday cooking. The variety is known for producing rice that cooks evenly, with a pleasant texture that is neither too sticky nor too dry, making it suitable for a variety of traditional dishes.",
    "At 309 can grow successfully in both dry and wet agroclimatic zones, showing considerable adaptability. This trait is especially valuable in regions with diverse microclimates, ensuring that farmers can cultivate the variety without worrying about environmental limitations."
  ],
  'At 373': [
    "At 373 is notably resistant to two significant fungal diseases—blast and sheath blight—that commonly affect rice crops. Sheath blight attacks the stem sheath and leaves, causing yield losses and reduced grain quality. This dual resistance helps maintain healthy crops and reduces dependency on fungicide applications.",
    "This variety performs best in lowland paddies where there is reliable access to water through irrigation. The steady water supply helps the plant to grow vigorously, supporting its high yield potential and disease resistance.",
    "In addition to its disease resistance, At 373 is also tolerant to drought conditions, enabling it to survive periods of water stress better than many other varieties. Its short growing period allows farmers to harvest quickly, which is beneficial in regions with limited rainfall or shorter farming windows.",
    "The grains of At 373 are versatile, making them ideal not only for direct consumption as table rice but also for processing into various rice-based products like flour, snacks, or ready-to-eat meals. This multi-purpose quality adds value for farmers and processors alike."
  ],
  'Bw 367': [
    "Bw 367 is known for its ability to produce a substantial grain yield while maintaining excellent quality. This combination is essential for farmers who need both profitability through volume and market acceptance due to superior grain characteristics such as aroma, texture, and appearance.",
    "This variety shows remarkable resilience across different moisture regimes. It can tolerate drought in dry periods and also thrive in wet conditions, making it suitable for areas with variable climates and unreliable rainfall.",
    "Bw 367 can be grown successfully on marginal lands, which are typically less fertile or have poor drainage. This trait allows farmers in less ideal agricultural zones to cultivate rice effectively without intensive land improvement efforts.",
    "Bacterial leaf blight is a serious bacterial disease causing leaf wilting and yield losses. Bw 367’s resistance to this disease ensures healthier crops and reduces the need for chemical controls, supporting sustainable production practices."
  ],
  'Bg 359': [
    "Bg 359 is a well-established traditional variety valued for its natural resistance to a range of common pests and diseases. This resilience reduces the need for pesticides, lowering production costs and environmental impact, while maintaining reliable yields.",
    "The variety’s adaptability allows it to grow in both irrigated systems, where water supply is controlled, and rainfed fields, which depend on natural precipitation. This flexibility provides farmers with options in diverse growing conditions.",
    "Bg 359 is known for its robustness under challenging environmental stresses such as drought, poor soil fertility, or temperature fluctuations. This tolerance ensures stable production even in suboptimal farming conditions.",
    "The grains range from medium to long in size and are especially prized for their excellent taste and cooking qualities. They cook to a soft, aromatic texture that is favored in many traditional dishes, contributing to the variety’s popularity."
  ],
  'Madathawalu': [
    "Madathawalu is a native Sri Lankan variety cherished for its unique qualities, which have sustained high consumer demand over the years. Its indigenous status means it is well-adapted to local conditions and cultural preferences.",
    "This variety thrives in the wet zone, where rainfall is abundant and soil moisture is consistently high. Its cultivation is well-suited to these environmental conditions, which support healthy growth and grain development.",
    "Madathawalu stands out due to its distinct aroma and superior taste profile. These sensory qualities make it a preferred choice for local cuisine, especially for traditional dishes that rely on fragrant rice.",
    "Although the yield is moderate compared to some high-yielding varieties, farmers and consumers highly value Madathawalu for its culinary attributes. Its grain quality often commands premium prices in the market."
  ],
  'Bg 352': [
    "Bg 352 has gained popularity due to its strong genetic traits that help it resist lodging, which can cause crop loss, and pest attacks that threaten yield. This makes the variety reliable and less labor-intensive in terms of pest and field management.",
    "This variety’s adaptability to diverse climatic conditions allows it to be grown in regions with varying rainfall patterns. It maintains productivity whether in wetter or drier environments, offering farmers flexibility.",
    "The grains from Bg 352 are known for their excellent cooking and eating qualities. The rice has a desirable texture and flavor, making it favored by consumers and a good option for local markets.",
    "While the yield is moderate compared to some varieties, Bg 352 is preferred for the high quality of its rice. Many farmers choose it when the market demand favors taste and texture over sheer quantity."
  ],
  'Bg 300': [
    "Bg 300 is an early maturing variety developed by the Rice Research and Development Institute, allowing farmers to harvest sooner than other varieties. Early maturation helps in avoiding late-season pest outbreaks and adverse weather conditions, improving crop security.",
    "This variety possesses strong resistance to many common diseases and pests that affect rice cultivation, reducing crop losses and the need for frequent chemical treatments, thereby supporting sustainable agriculture.",
    "Bg 300 adapts well to various altitudes, including lowland irrigated fields and medium-highland rainfed areas. This flexibility allows it to be cultivated in diverse agroecological zones, benefiting many farmers.",
    "The grains produced are medium-sized and known for their appealing cooking texture. They cook to a soft, non-sticky consistency, making them suitable for a range of culinary uses."
  ],
  'Kahawanu': [
    "Kahawanu is renowned for its unique aromatic properties and rich flavor, which make it one of the most popular traditional rice varieties in Sri Lanka. Its fragrance is reminiscent of pandan leaves or jasmine, contributing to its culinary appeal.",
    "This variety is particularly suited for cultivation in the dry zone where water availability is limited. It has adapted mechanisms to tolerate drought and survive in less irrigated conditions, making it a valuable crop in these areas.",
    "Kahawanu exhibits good drought tolerance and resistance to several rice diseases, enabling it to produce stable yields even under water stress and disease pressure. This resilience reduces farmers’ risks in dry climatic zones.",
    "The rice grains are long and slender with a strong aroma, qualities highly prized in local dishes. The cooking properties and flavor profile of Kahawanu rice make it a staple in traditional recipes and festive meals."
  ],
  'Bg 374': [
    "Bg 374 has been developed to provide high productivity in lowland irrigated paddies, which often have favorable water availability and soil conditions. This makes it a preferred choice for farmers aiming to maximize production per unit area.",
    "The variety carries genetic resistance to rice blast, a disease that can cause devastating losses. This resistance helps ensure consistent yields and reduces the necessity for fungicides, making cultivation more cost-effective and environmentally friendly.",
    "Bg 374 produces large, long grains that are favored in many markets due to their aesthetic appeal and cooking qualities. These grains tend to have a good milling recovery and are popular among consumers who prefer premium quality rice.",
    "In addition to being consumed directly, Bg 374 is also suitable for seed production because of its stable agronomic traits and high grain quality. This makes it a valuable variety for both commercial farmers and seed producers."
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
  // const getPieChartData = (confidenceScore: string) => {
  //   const score = parseFloat(confidenceScore);
  //   return [
  //     {
  //       name: 'Confidence',
  //       population: score,
  //       color: colors.green,
  //       legendFontColor: '#7F7F7F',
  //       legendFontSize: 11,
  //     },
  //     {
  //       name: 'Remaining',
  //       population: 100 - score,
  //       color: colors.lightGray,
  //       legendFontColor: '#7F7F7F',
  //       legendFontSize: 11,
  //     },
  //   ];
  // };

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
                {/* <TouchableOpacity style={styles.resultCard}>
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
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.resultCard}>
                  <View style={{ width: '70%', gap: 15 }}>
                    <Text style={styles.resultLabel}>Number of Data Points:</Text>
                    <Text style={styles.resultValue}>{prediction.number_of_data}</Text>
                  </View>
                </TouchableOpacity> */}

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
