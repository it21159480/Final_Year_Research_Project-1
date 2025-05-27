/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import the useNavigation hook and NavigationProp
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Container from '../components/Container'; // Adjust the import path accordingly
import Header from '../components/Header';
import { Card, Text } from 'react-native-paper';
// import classificationImage from '../assets/Classification.png';
import Classification from '../assets/Classification.png'
import Pest from '../assets/Pest.png';
import Disease from '../assets/Disease.png';
import Price from '../assets/Price.png';
import colors from '../theme/colors';
import { PEST_HOME } from './Pest Identification/PestHome'; // Ensure this import is correct
import { HomeScreenProps } from '../Naviagtion/types';
import { CLASSIFICATION_HOME } from './Paddy Classification/ClassificationHome';
import { DISEASE_HOME_SCREEN } from './Disease Diagnosis/DeseaseHome';
import { PRICE_PREDICTION_SCREEN } from './Price Prediction/PricePredictionScreen';
import { INTRO_SCREEN } from './IntroScreen';

export const HOME_SCREEN = 'HOME_SCREEN'
const images = [
  { image: Classification, title: 'Seeds Classification' },
  { image: Pest, title: 'Pest Identification' },
  { image: Disease, title: 'Disease Identification' },
  { image: Price, title: 'Agricultural Pricing' },
];


const details = [
  {
    image: Classification,
    title: 'Paddy Variety Classification',
    subtitle: 'AI-powered classification of Sri Lankan paddy types with fast, reliable results and a user-friendly interface.',
  },
  {
    image: Pest,
    title: 'Paddy Pest Detection',
    subtitle: 'Real-time pest identification using deep learning, offering offline access and tailored pest management advice.',
  },
  {
    image: Disease,
    title: 'Paddy Disease Diagnosis',
    subtitle: 'AI-based leaf disease detection with 93% accuracy and personalized treatment, optimized for offline use.',
  },
  {
    image: Price,
    title: 'Paddy Price Forecasting',
    subtitle: 'Hybrid ML models predict paddy prices using historical and environmental data for timely market insights.',
  },
];



const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // const navigation = useNavigation<NavigationProp<NavigatorParamList>>(); // Initialize the navigation hook with the type


  return (
    <Container
      scrollView={true} // Allows the content to scroll if needed
      header={<Header />}
    >
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.black }}>Services</Text>
      </View>
      <View style={styles.gridContainer}>
        {images.map((image, index) => {
          const handlePress = () => {
            switch (index) {
              case 0:
                // Navigate to Classification screen
                navigation.navigate(CLASSIFICATION_HOME)
                console.log('Navigate to Classification');
                break;
              case 1:
                // Navigate to Pest screen
                navigation.navigate(PEST_HOME); // Navigate to the PestHome screen
                console.log('Navigate to Pest');
                break;
              case 2:
                // Navigate to Disease screen
                navigation.navigate(DISEASE_HOME_SCREEN)
                console.log('Navigate to Disease');
                break;
              case 3:
                // Navigate to Price screen
                console.log('Navigate to Price');
                navigation.navigate(PRICE_PREDICTION_SCREEN)
                break;
              default:
                console.log('Unknown card');
            }
          };

          return (
            <TouchableOpacity key={index} style={styles.card} onPress={handlePress}>
              <View>
                <Card.Cover source={image.image} style={styles.cardImage} />
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10, // Rounded corners
                }} />
                <Text style={{ position: 'absolute', bottom: 10, left: 10, color: colors.white, fontSize: 18, fontWeight: 'bold' }}>{image.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.black }}>Get Start</Text>
      </View>
      <View>
        {details.map((item, index) => {
          const maxLength = 65; // max characters to show
          const shortSubtitle = item.subtitle.length > maxLength
            ? item.subtitle.slice(0, maxLength) + '...'
            : item.subtitle;

          const handlePress = () => {
            navigation.navigate(INTRO_SCREEN,{ title: item.title }); // Navigate to the IntroScreen
            // Replace with your navigation logic
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={handlePress}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                margin: 5,
                backgroundColor: colors.white,
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <View style={{ width: '70%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.black }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 14, color: colors.N400 }}>
                  {shortSubtitle}
                </Text>
              </View>
              <Card.Cover source={item.image} style={[styles.cardImage, { width: '30%' }]} />
            </TouchableOpacity>
          );
        })}

      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // This allows items to wrap to the next line
    justifyContent: 'space-between', // Space between the items
    margin: 10, // Space between the cards and the header
  },
  card: {
    width: '48%', // Adjust this to fit 2 cards in a row (48% gives space for 2 cards)
    marginBottom: 10, // Space between rows
    elevation: 5, // Optional: Add shadow for card
  },
  cardImage: {
    height: 100, // Reduce the height of the image inside the card
    borderTopLeftRadius: 10, // Optional: Rounded corners for the card image
    borderTopRightRadius: 10, // Optional: Rounded corners for the card image
  },
});

export default HomeScreen;
