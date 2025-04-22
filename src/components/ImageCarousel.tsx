import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';  // Import the Carousel component

// Import your images
import classificationImage from '../assets/Classification.png';
import Pest from '../assets/Pest.png';
import Disease from '../assets/Disease.png';
import Price from '../assets/Price.png';

const ImageCarousel = () => {
  const images = [
    classificationImage,
    Pest,
    Disease,
    Price,
  ];

  // Render each image in the carousel
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={renderItem}  // Render function for each carousel item
        sliderWidth={300}  // Width of the carousel container
        itemWidth={250}    // Width of each item in the carousel
        inactiveSlideScale={0.9}  // Scale for inactive slides
        inactiveSlideOpacity={0.7} // Opacity for inactive slides
        loop={true}        // Enable looping of the carousel
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  image: {
    width: 200,  // Adjust the width of the image
    height: 150, // Adjust the height of the image
    borderRadius: 10,
  },
});

export default ImageCarousel;
