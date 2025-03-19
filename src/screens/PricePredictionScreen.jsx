// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity  } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // Correct import
// import axios from 'axios';

// function PricePredictionScreen({ navigation }) {
//   const [riceType, setRiceType] = useState('Samba'); // Default rice type
//   const [temperature, setTemperature] = useState('');
//   const [rainfall, setRainfall] = useState('');
//   const [humidity, setHumidity] = useState('');
//   const [dollarRate, setDollarRate] = useState('');
//   const [error, setError] = useState(null);

//   // Validation function for numeric inputs
//   const validateInput = (value, field) => {
//     if (isNaN(value)) {
//       setError(`${field} must be a number!`);
//       return false;
//     }
//     if (field === 'Humidity' && value > 100) {
//       setError('Humidity cannot exceed 100!');
//       return false;
//     }
//     setError(null);
//     return true;
//   };

//   // Function to handle form submission and navigate to PredictionScreen
//   // In PricePredictionScreen
// const handleSubmit = async () => {
//   if (!temperature || !rainfall || !humidity || !dollarRate) {
//     setError('All fields are required!');
//     return;
//   }

//   if (!validateInput(temperature, 'Temperature') || 
//       !validateInput(rainfall, 'Rainfall') || 
//       !validateInput(humidity, 'Humidity') || 
//       !validateInput(dollarRate, 'Dollar Rate')) {
//     return;
//   }

//   setError(null); // Clear error message if inputs are valid

//   try {
//     // Sending POST request to Flask API
//     const response = await axios.post('http://10.0.2.2:5000/predict', {
//       rice_type: riceType,
//       temperature: parseFloat(temperature),
//       rainfall: parseFloat(rainfall),
//       humidity: parseFloat(humidity),
//       dollar_rate: parseFloat(dollarRate),
//     });

//     // Pass selected rice type and its corresponding predictions to the next screen
//     navigation.navigate('Prediction', {
//       riceType: riceType,
//       predictions: {
//         LSTM_Prediction: response.data.LSTM_Prediction,
//         SARIMA_Prediction: response.data.SARIMA_Prediction,
//         Combined_Forecast: response.data.Combined_Forecast,
//       },
//     });

//     // Reset the form fields
//     setTemperature('');
//     setRainfall('');
//     setHumidity('');
//     setDollarRate('');
//     setRiceType('Samba'); // Reset rice type to default value
//   } catch (error) {
//     console.error('API error:', error);
//     const errorMessage = error.response?.data?.message || error.message || 'Error connecting to the API';
//     setError(errorMessage);
//   }
// };


//   return (
//     <View style={styles.container}>
      

//       {/* Rice Type Dropdown */}
//       <Text style={styles.inputLabel}>Rice Type</Text>
//       <View style={styles.pickerWrapper}>
//         <Picker
//           selectedValue={riceType}
//           style={styles.picker}
//           onValueChange={(itemValue) => setRiceType(itemValue)}
//         >
//           <Picker.Item label="Samba" value="Samba" />
//           <Picker.Item label="Nadu" value="Nadu" />
//           <Picker.Item label="Kekulu White" value="Kekulu White" />
//           <Picker.Item label="Kekulu Red" value="Kekulu Red" />
//         </Picker>
//       </View>

//       {/* Temperature Input */}
//       <Text style={styles.inputLabel}>Temperature</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Temperature"
//         value={temperature}
//         onChangeText={(text) => {
//           setTemperature(text);
//           validateInput(text, 'Temperature');
//         }}
//         keyboardType="numeric"
//       />

//       {/* Rainfall Input */}
//       <Text style={styles.inputLabel}>Rainfall</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Rainfall in mm"
//         value={rainfall}
//         onChangeText={(text) => {
//           setRainfall(text);
//           validateInput(text, 'Rainfall');
//         }}
//         keyboardType="numeric"
//       />

//       {/* Humidity Input */}
//       <Text style={styles.inputLabel}>Humidity</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Humbidity 0-100%"
//         value={humidity}
//         onChangeText={(text) => {
//           setHumidity(text);
//           validateInput(text, 'Humidity');
//         }}
//         keyboardType="numeric"
//       />

//       {/* Dollar Rate Input */}
//       <Text style={styles.inputLabel}>Dollar Rate</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Dollar Rate"
//         value={dollarRate}
//         onChangeText={(text) => {
//           setDollarRate(text);
//           validateInput(text, 'Dollar Rate');
//         }}
//         keyboardType="numeric"
//       />

//       {/* Error Message */}
//       {error && <Text style={styles.error}>{error}</Text>}

//       {/* Submit Button */}
//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Predict</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: 'white',
//   },

//   inputLabel: {
//     fontSize: 16,
//     color: 'black',
//     fontWeight: '800',
//     marginBottom: 5,
//   },
//   input: {
//     height: 45,
//     borderColor: 'gray', // Gray for other sides
//     borderWidth: 1, // All sides gray
//     borderBottomColor: '#548235', // Green bottom border
//     borderBottomWidth: 4, // Thicker bottom border
//     marginBottom: 20,
//     paddingLeft: 8,
//     fontSize: 16,
//     color: 'black', // Text color black
//     borderRadius: 7.5, // Rounded corners for picker
//   },
//   button: {
//     height: 50,
//     backgroundColor: '#548235', // Green background color
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 7.5, // Rounded corners
//     marginBottom: 20,
//     marginTop: 5
//   },
//   buttonText: {
//     color: 'white', // White text
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   pickerWrapper: {
//     height: 50,
//     borderWidth: 1, // Gray for other sides
//     marginBottom: 20,
//     justifyContent: 'center',
//     borderRadius: 7.5, // Rounded corners for picker
//     borderBottomColor: '#548235', // Green bottom border
//     borderBottomWidth: 4, // Thicker bottom border
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     fontSize: 16,
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
// });

// export default PricePredictionScreen;

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

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

      navigation.navigate('Prediction', {
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Primary color
  },
});

export default PricePredictionScreen;
