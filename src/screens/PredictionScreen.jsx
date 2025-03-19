import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';

function PredictionScreen({ route, navigation }) {
  const { riceType, predictions } = route.params;

  const handleNavigate = () => {
    // Navigate to PricePredictionScreen when the button is pressed
    navigation.navigate('PricePrediction');
  };

  return (
    <ImageBackground source={require('./paddy.jpeg')} style={styles.container}>
      <View style={styles.overlay}>
         <View style={styles.textContainer}>
         <Text style={styles.header}>Prediction Results</Text>
         <View style={styles.underline}/>
          </View>
        <ScrollView style={styles.tableWrapper}>
          <View style={styles.tableRow}>
            <Text style={styles.cellHeader}>Predicted Rice Type</Text>
            <Text style={styles.cell}>{riceType}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.cellHeader}>LSTM Prediction</Text>
            <Text style={styles.cell}>{parseFloat(predictions.LSTM_Prediction).toFixed(2)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.cellHeader}>SARIMA Prediction</Text>
            <Text style={styles.cell}>{parseFloat(predictions.SARIMA_Prediction).toFixed(2)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.cellHeader}>Combined Forecast</Text>
            <Text style={styles.cell}>{parseFloat(predictions.Combined_Forecast).toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Predict Again</Text>
          </TouchableOpacity>
        </ScrollView>      
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between', // Distribute space between content and button
    backgroundColor: 'rgba(255, 255, 255, 0.79)', // Increased opacity for better visibility
    borderRadius: 10,
    padding: 20,
    width: '100%', // Ensure overlay takes most of the width
    height: '90%', // Ensure overlay covers almost the full screen height
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableWrapper: {
    marginTop: 10,
    borderRadius: 7.5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20, // Add margin to space it from the button
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 15,
    justifyContent: 'space-between',
  },
  cellHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#548235',
    textAlign: 'left',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  button: {
    height: 50,
    backgroundColor: '#548235', // Green background color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7.5,
    marginTop: 20
  },
  buttonText: {
    color: 'white', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },

  textContainer: {
    marginBottom: 15, // Adds some spacing between the text and underline
    justifyContent: 'center',
    alignItems: 'center'
  },
  underline: {
    height: 4,     // Controls the thickness of the underline
    backgroundColor: '#548235', // Color of the underline
    width: '60%', // Ensures the underline spans the full width of the text
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Primary color
    textAlign: 'center',
    marginBottom: 1,
    color: '#333',
  },
});

export default PredictionScreen;


