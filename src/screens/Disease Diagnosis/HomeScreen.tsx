import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles/HomeScreenStyles';
import logo from '../../assets/logo.png'
import { DiseaseHomeScreenProps } from '../../Naviagtion/types';
import {DIAGNOSIS_SCREEN} from '../Disease Diagnosis/DiagnosisScreen'
export const DISEASE_HOME_SCREEN = "DISEASE_HOME_SCREEN"
const HomeScreen : React.FC<DiseaseHomeScreenProps> = ({ navigation }) => {
  return (
    
    <View style={styles.container}>

      {/* Logo Image at the Top Center */}
      <Image
        source={logo} 
        style={styles.logo}  
      />
      
      {/* Title */}
      <Text style={styles.title}>Paddy Disease Diagnosis</Text>

      {/* Description */}
      <Text style={styles.description}>
      Instantly diagnose paddy diseases with a simple image and receive expert remedies, offering a one-stop solution to ensure your crops thrive and flourish.
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(DIAGNOSIS_SCREEN)}
      >
        <Text style={styles.buttonText}>Start Diagnosing</Text>
      </TouchableOpacity>
    </View>
  
  );
};

export default HomeScreen;
