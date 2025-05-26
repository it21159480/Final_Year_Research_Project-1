import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dialog, Portal, Button } from 'react-native-paper'; // Import Dialog from react-native-paper
import colors from '../theme/colors';

const ImagePickerComponent = ({ onImagePicked }: { onImagePicked: (uri: string) => void }) => {
  const [visible, setVisible] = useState(false); // Dialog visibility
  const [errorMessage, setErrorMessage] = useState(''); // Error message to display

  const showErrorDialog = (message: string) => {
    setErrorMessage(message); // Set the error message
    setVisible(true); // Show the dialog
  };

  const hideErrorDialog = () => {
    setVisible(false); // Hide the dialog
    setErrorMessage(''); // Reset the error message
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', cameraType: 'back', saveToPhotos: true }, (response) => {
      console.log('Camera Response: ', response);
      if (response.didCancel) {
        showErrorDialog('User cancelled the camera picker.');
      } else if (response.errorCode) {
        showErrorDialog(`Camera Error: ${response.errorMessage}`);
      } else {
        if (response.assets && response.assets.length > 0) {
          const { uri } = response.assets[0]; // Get the image URI
          if (uri) {
            onImagePicked(uri); // Pass the image URI to the parent
          } else {
            showErrorDialog('No URI found for the selected image.');
          }
        } else {
          showErrorDialog('No assets found in the response.');
        }
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        showErrorDialog('User cancelled the image picker.');
      } else if (response.errorCode) {
        showErrorDialog(`Gallery Error: ${response.errorMessage}`);
      } else {
        if (response.assets && response.assets.length > 0) {
          const { uri } = response.assets[0]; // Get the image URI
          if (uri) {
            onImagePicked(uri); // Pass the image URI to the parent
          } else {
            showErrorDialog('No URI found for the selected image.');
          }
        } else {
          showErrorDialog('No assets found in the response.');
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

      {/* Error Dialog */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideErrorDialog}>
         {errorMessage && (errorMessage.length > 0) && (errorMessage !== 'User cancelled the camera picker.') && (
           <Dialog.Title>Error</Dialog.Title>)}
          <Dialog.Content>
            <Text style={{color:colors.white}}>{errorMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideErrorDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
