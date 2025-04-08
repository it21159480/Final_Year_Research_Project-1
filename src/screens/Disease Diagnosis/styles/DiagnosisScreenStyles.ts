import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
      // Light background color for contrast
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',  // Green color for the title
    textAlign: 'center',
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,  // Shadow for Android
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#888',  // Lighter gray for loading text
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#d0eedf',  // Light gray container for result
    padding: 20,
    borderRadius: 8,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',  // Darker text for result display
  },
  remedyLink: {
    marginTop: 15,
    color: '#007BFF',  // Blue color for the remedy link
    fontSize: 18,
    fontWeight: 'bold',
  },
  lottieAnimation: {
    width: 320,
    height: 320,
    position: 'absolute',  // Position it absolutely to the bottom of the screen
    bottom: 50,  // Adjust this value based on how far from the bottom you want it
  },
  bannerImage: {
    width: '100%',
    height: 150,  // Adjust based on your design
    resizeMode: 'cover',  // Ensures the image covers the space properly
  },
  
  
});

export default styles;
