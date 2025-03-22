/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';

// Import your images
import classificationImage from '../assets/Classification.png';
import Pest from '../assets/Pest.png';
import Disease from '../assets/Disease.png';
import Price from '../assets/Price.png';
import colors from '../theme/colors';

const images = [
  classificationImage,
  Pest,
  Disease,
  Price,
];

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);  // Track the active image
  const scrollX = useRef(new Animated.Value(0)).current;  // Animation value for smooth scrolling

  // Handle image change (swipe or button press)
  const handleImageChange = (index: number) => {
    setActiveIndex(index);
  };

  // Render each image
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={item} style={styles.image}  resizeMode='contain' />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* FlatList for the image slider */}
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled  // Makes sure the scroll "snaps" to each image
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const index = Math.floor(contentOffsetX / styles.image.width); // Calculate the index based on scroll position
          setActiveIndex(index); // Update active index
        }}
      />

      {/* Dots to indicate active image */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
            onPress={() => handleImageChange(index)}
          />
        ))}
      </View>

      {/* Optional: Display text for the active image */}
      {/* <Text style={styles.text}>Image {activeIndex + 1} of {images.length}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 50,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: colors.GR700,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
});

export default ImageSlider;
