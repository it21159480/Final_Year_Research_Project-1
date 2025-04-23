import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { PREDICTED_SCREEN } from './PredictedScreen';

export const PRICE_PREDICTION_SCREEN = 'PRICE_PREDICTION_SCREEN';

function PricePredictionScreen({ navigation }) {
  const [riceType, setRiceType] = useState('Samba'); // Default rice type
  const [temperature, setTemperature] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [humidity, setHumidity] = useState('');
  const [dollarRate, setDollarRate] = useState('');
  const [error, setError] = useState(null);

  // Validation function for numeric inputs
  const validateInput = (value, field) => {
    if (isNaN(value)) {
      setError(`${field} must be a number!`);
      return false;
    }
    if (field === 'Humidity' && value > 100) {
      setError('Humidity cannot exceed 100!');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!temperature || !rainfall || !humidity || !dollarRate) {
      setError('All fields are required!');
      return;
    }

    if (!validateInput(temperature, 'Temperature') || 
        !validateInput(rainfall, 'Rainfall') || 
        !validateInput(humidity, 'Humidity') || 
        !validateInput(dollarRate, 'Dollar Rate')) {
      return;
    }

    setError(null);

    try {
      const response = await axios.post('http://10.0.2.2:5000/predict', {
        rice_type: riceType,
        temperature: parseFloat(temperature),
        rainfall: parseFloat(rainfall),
        humidity: parseFloat(humidity),
        dollar_rate: parseFloat(dollarRate),
      });

      navigation.navigate(PREDICTED_SCREEN, {
        riceType: riceType,
        predictions: {
          LSTM_Prediction: response.data.LSTM_Prediction,
          SARIMA_Prediction: response.data.SARIMA_Prediction,
          Combined_Forecast: response.data.Combined_Forecast,
        },
      });

      setTemperature('');
      setRainfall('');
      setHumidity('');
      setDollarRate('');
      setRiceType('Samba');
    // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      console.error('API error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error connecting to the API';
      setError(errorMessage);
    }
  };

  return (
    <ImageBackground source={require('./paddy.jpeg')} style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Enter Data for Prediction</Text>
          <View style={styles.underline}/>
        </View>
        <Text style={styles.inputLabel}>Rice Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={riceType} style={styles.picker} onValueChange={(itemValue) => setRiceType(itemValue)}>
            <Picker.Item label="Samba" value="Samba" />
            <Picker.Item label="Nadu" value="Nadu" />
            <Picker.Item label="Kekulu White" value="Kekulu White" />
            <Picker.Item label="Kekulu Red" value="Kekulu Red" />
          </Picker>
        </View>

        <Text style={styles.inputLabel}>Temperature</Text>
        <TextInput
          style={styles.input}
          placeholder="Temperature"
          value={temperature}
          onChangeText={(text) => {
            setTemperature(text);
            validateInput(text, 'Temperature');
          }}
          keyboardType="numeric"
        />
        <Text style={styles.inputLabel}>Rainfall</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Rainfall in mm"
          value={rainfall}
          onChangeText={(text) => {
            setRainfall(text);
            validateInput(text, 'Rainfall');
          }}
          keyboardType="numeric"
        />
        <Text style={styles.inputLabel}>Humidity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Humidity 0-100%"
          value={humidity}
          onChangeText={(text) => {
            setHumidity(text);
            validateInput(text, 'Humidity');
          }}
          keyboardType="numeric"
        />
        <Text style={styles.inputLabel}>Dollar Rate</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Dollar Rate"
          value={dollarRate}
          onChangeText={(text) => {
            setDollarRate(text);
            validateInput(text, 'Dollar Rate');
          }}
          keyboardType="numeric"
        />

        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Predict</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.79)', // Adds a slight overlay to dim the background image
    borderRadius: 10,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: '800',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderBottomColor: '#548235',
    borderBottomWidth: 4,
    marginBottom: 20,
    paddingLeft: 8,
    fontSize: 16,
    color: 'black',
    borderRadius: 7.5,
  },
  button: {
    height: 50,
    backgroundColor: '#548235',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7.5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 7.5,
    borderBottomColor: '#548235',
    borderBottomWidth: 4,
  },
  picker: {
    height: 50,
    width: '100%',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  textContainer: {
    marginBottom: 15, // Adds some spacing between the text and underline
  },
  underline: {
    height: 3,     // Controls the thickness of the underline
    backgroundColor: '#548235', // Color of the underline
    width: '77%', // Ensures the underline spans the full width of the text
  },
  // header: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: 'black', // Primary color
  // },
});

export default PricePredictionScreen;
