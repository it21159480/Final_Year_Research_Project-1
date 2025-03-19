/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

const ImagePickerComponent = ({ onImagePicked }: { onImagePicked: (uri: string) => void }) => {
  const openCamera = () => {
    launchCamera({ mediaType: 'photo', cameraType: 'back', saveToPhotos: true }, (response) => {
      console.log('Camera Response: ');
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const { uri } = response.assets[0]; // Get the image URI
          if (uri) {
            onImagePicked(uri); // Pass the image URI to the parent
          } else {
            console.log('No URI found for the selected image');
          }
        } else {
          console.log('No assets found in the response');
        }
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Gallery Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const { uri } = response.assets[0]; // Get the image URI
          if (uri) {
            onImagePicked(uri); // Pass the image URI to the parent
          } else {
            console.log('No URI found for the selected image');
          }
        } else {
          console.log('No assets found in the response');
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Ionicons name={'camera'} size={80} color={'white'} />
        <Text style={styles.buttonText}>Snap a Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openGallery} style={styles.button}>
        <Ionicons name={'images'} size={80} color={'white'} />
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.GR600,
    borderRadius: 15,
    marginHorizontal: 5, // Adjust space between buttons
  },
  buttonText: {
    color: colors.white,
    marginTop: 5, // Space between icon and text
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ImagePickerComponent;
