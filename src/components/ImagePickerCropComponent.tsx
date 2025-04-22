import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';
import ImagePicker from 'react-native-image-crop-picker';

const ImagePickerCropComponent = ({ onImagePicked }: { onImagePicked: (uri: string) => void }) => {
  const openCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true, // Enables cropping directly after taking the photo
    }).then((image) => {
      if (image?.path) {
        onImagePicked(image.path); // Pass the cropped image URI to the parent
      }
    }).catch((error) => {
      console.error('Camera Error: ', error);
    });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true, // Enables cropping directly after selecting from gallery
    }).then((image) => {
      if (image?.path) {
        onImagePicked(image.path); // Pass the cropped image URI to the parent
      }
    }).catch((error) => {
      console.error('Gallery Error: ', error);
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

export default ImagePickerCropComponent;
