import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

   
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light gray background
  },
  logo: {
    width: 350, // Adjust the logo width as per your requirement
    height: 350, // Adjust the logo height as per your requirement
    marginBottom: 30,  // Space between the logo and the title
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',  // Green color for the title
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555', // Dark gray text color for description
    paddingHorizontal: 20,  // To prevent text from touching the sides
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,  // Add shadow for Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default styles;
