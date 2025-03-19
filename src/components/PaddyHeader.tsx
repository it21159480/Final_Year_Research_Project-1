import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

type PaddyHeaderProps = {
  imageUri: string; // This will be passed as a prop for the background image
};

const PaddyHeader = ({ imageUri }: PaddyHeaderProps) => {
  return (
    <ImageBackground source={{ uri: imageUri }} style={styles.container} resizeMode="stretch">
      {/* <View style={styles.overlay}>
        <Text style={styles.headerText}>PRHeader</Text>
      </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300, // Adjust height as needed
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
  },
  overlay: {
    flex: 1, // Ensures overlay takes full space of the background image
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional: Adds a slight dark overlay for better text visibility
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White color for the text
  },
});

export default PaddyHeader;
