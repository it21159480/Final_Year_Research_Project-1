/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import the useNavigation hook and NavigationProp
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Container from '../components/Container'; // Adjust the import path accordingly
import Header from '../components/Header';
import { Card, Text } from 'react-native-paper';
import classificationImage from '../assets/Classification.png';
import Pest from '../assets/Pest.png';
import Disease from '../assets/Disease.png';
import Price from '../assets/Price.png';
import colors from '../theme/colors';
import {PEST_HOME} from './Pest Identification/PestHome'
import { HomeScreenProps } from '../Naviagtion/types';

export const HOME_SCREEN = 'HOME_SCREEN'
const images = [
  classificationImage,
  Pest,
  Disease,
  Price,
];

const details = [
  { image: classificationImage, title: "How do we identify an insect?", subtitle: "The world of insects is rich and varied..." },
  { image: Pest, title: "The Scientific Nomenclature for Insects", subtitle: "There are more than one million known species of insects..." },
  { image: Disease, title: "Disease Identification", subtitle: "Understanding the different types of diseases..." },
  { image: Price, title: "Agricultural Pricing", subtitle: "Learn how prices are set in the agriculture industry..." },
];


const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // const navigation = useNavigation<NavigationProp<NavigatorParamList>>(); // Initialize the navigation hook with the type


  return (
    <Container
      scrollView={true} // Allows the content to scroll if needed
      header={<Header />}
    >
      <View>
        <Text style={{fontWeight:'bold',fontSize:20, color:colors.black}}>Services</Text>
      </View>
      <View style={styles.gridContainer}>
        {images.map((image, index) => {
          const handlePress = () => {
            switch (index) {
              case 0:
                // Navigate to Classification screen
                console.log('Navigate to Classification');
                break;
              case 1:
                // Navigate to Pest screen
                navigation.navigate(PEST_HOME); // Navigate to the PestHome screen
                console.log('Navigate to Pest');
                break;
              case 2:
                // Navigate to Disease screen
                console.log('Navigate to Disease');
                break;
              case 3:
                // Navigate to Price screen
                console.log('Navigate to Price');
                break;
              default:
                console.log('Unknown card');
            }
          };

          return (
            <TouchableOpacity key={index} style={styles.card} onPress={handlePress}>
              <Card.Cover source={image} style={styles.cardImage} />
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <Text style={{fontWeight:'bold',fontSize:20, color:colors.black}}>Get Start</Text>
      </View>
      <View>
      {details.map((item, index) => {
          const handlePress = () => {
            console.log(`Navigate to ${item.title}`);
            // You can replace this with your navigation logic
          };

          return (
            <TouchableOpacity key={index} onPress={handlePress} activeOpacity={0.7} style={{flexDirection:'row',justifyContent:'space-between',padding:10,margin:5,backgroundColor:colors.white,borderRadius:10,elevation:5}}>
              {/* <Card style={styles.card}>
                <Card.Cover source={item.image} style={styles.cardImage} />
                <Card.Content>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </Card.Content>
              </Card> */}
              <View style={{width:'70%'}}>
                <Text style={{fontWeight:'bold', fontSize:18 ,color:colors.black}}>{item.title}</Text>
                <Text style={{fontSize:14,color:colors.N400}} >{item.subtitle}</Text>
              </View>
              <Card.Cover source={item.image} style={[styles.cardImage,{width:'30%'}]} />
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
