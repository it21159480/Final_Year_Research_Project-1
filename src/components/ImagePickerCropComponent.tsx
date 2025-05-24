import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dialog, Portal, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import colors from '../theme/colors';

const ImagePickerCropComponent = ({ onImagePicked }: { onImagePicked: (uri: string) => void }) => {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const colorScheme = useColorScheme();

  const showErrorDialog = (message: string) => {
    setErrorMessage(message);
    setVisible(true);
  };

  const hideErrorDialog = () => {
    setVisible(false);
    setErrorMessage('');
  };

  const requestCameraPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const result = await request(permission!);
    return result === RESULTS.GRANTED;
  };

  const requestGalleryPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: Number(Platform.Version) >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });


    const result = await request(permission!);
    return result === RESULTS.GRANTED;
  };

  const openCamera = async () => {
    const granted = await requestCameraPermission();
    if (!granted) {
      showErrorDialog('Camera permission denied.');
      return;
    }

    ImagePicker.openCamera({
      width: 640,
      height: 640,
      cropping: true,
      cropperToolbarTitle: 'Crop Image to 640x640',
      freeStyleCropEnabled: false, // Prevent resizing
      cropperCircleOverlay: false, // Optional: keep square crop
    })
      .then((image) => {
        if (image?.path) {
          onImagePicked(image.path);
        } else {
          showErrorDialog('No image path returned from the camera.');
        }
      })
      .catch((error) => {
        if (error?.message !== 'User cancelled image selection') {
          showErrorDialog(`Camera Error: ${error.message}`);
        }
      });
  };

  const openGallery = async () => {
    const granted = await requestGalleryPermission();
    if (!granted) {
      showErrorDialog('Gallery permission denied.');
      return;
    }

    ImagePicker.openPicker({
      width: 640,
      height: 640,
      cropping: true,
      cropperToolbarTitle: 'Crop Image to 640x640',
      freeStyleCropEnabled: false,
      cropperCircleOverlay: false,
    })
      .then((image) => {
        if (image?.path) {
          onImagePicked(image.path);
        } else {
          showErrorDialog('No image path returned from the gallery.');
        }
      })
      .catch((error) => {
        if (error?.message !== 'User cancelled image selection') {
          showErrorDialog(`Gallery Error: ${error.message}`);
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
          {errorMessage && errorMessage !== 'User cancelled image selection' && (
            <Dialog.Title>Error</Dialog.Title>
          )}
          <Dialog.Content>
            <Text style={{ color: colorScheme === 'dark' ? colors.white : colors.black }}>
              {errorMessage}
            </Text>
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
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.white,
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ImagePickerCropComponent;
