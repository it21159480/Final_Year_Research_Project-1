import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    position: 'relative',  // Allows stacking of elements
  },
  lottieBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 30,
    right: 30,
    opacity: 0.8, 
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#548235',
    textAlign: 'center',
    marginBottom: 60,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#548235',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  picker: {
    height: 50,
    backgroundColor: '#ffffff',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#548235',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  // Custom modal container with the Lottie animation as background
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    position: 'relative', // Allow stacking of content
  },
  modalAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,  // Ensure animation stays in the background
  },
  modalContent: {
    position: 'absolute',
    top: '50%', // Center the modal content
    left: '45%',
    transform: [{ translateX: -150 }, { translateY: -50 }],
    width: 350,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,  // Ensure content stays on top of the animation
  },
  modalTitle: {
    fontSize: 22,  // Larger size for the title
    fontWeight: 'bold',
    color: '#548235',
    marginBottom: 10, // Space between title and remedy text
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20, // Space between text and button
  },
  closeButton: {
    backgroundColor: '#548235',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
