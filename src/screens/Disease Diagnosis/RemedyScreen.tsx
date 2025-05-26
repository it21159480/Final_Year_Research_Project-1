import React, { useState } from 'react';
import { View, Text, Alert, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';  
import LottieView from 'lottie-react-native';  
import { useRoute, RouteProp } from '@react-navigation/native';
import styles from './styles/RemedyScreenStyles';  
import api from '../../api/axios';
export const REMEDY_SCREEN ='REMEDY_SCREEN'

type RemedyScreenRouteProp = RouteProp<
  { Remedy: { disease: string } },
  'Remedy'
>;

const RemedyScreen = () => {
  const route = useRoute<RemedyScreenRouteProp>();
  const { disease } = route.params;
  
  const [soilCondition, setSoilCondition] = useState('');
  const [weather, setWeather] = useState('');
  const [pestDetected, setPestDetected] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [treatment, setTreatment] = useState('');
  const [province, setProvince] = useState('');
  const [remedy, setRemedy] = useState(null);  
  const [modalVisible, setModalVisible] = useState(false); 

  const getRemedy = async () => {
    if (!soilCondition || !weather || !pestDetected || !growthStage || !treatment || !province) {
      Alert.alert('Missing Fields', 'Please complete all fields to get the remedy.');
      return;
    }

    try {
      const data = {
        SoilCondition: [soilCondition],
        Weather: [weather],
        PestDetected: [pestDetected],
        GrowthStage: [growthStage],
        Treatment: [treatment],
        Province: [province],
        Disease: [disease],
      };

      const response = await api.post('/disease/remedy', data);

      setRemedy(response.data.recommended_remedy);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching remedy:', error);
    }
  };

  const soilConditions = [
    { label: 'Loamy', value: 'Loamy' },
    { label: 'Sandy', value: 'Sandy' },
    { label: 'Clayey', value: 'Clayey' },
  ];

  const weatherConditions = [
    { label: 'Sunny', value: 'Sunny' },
    { label: 'Rainy', value: 'Rainy' },
    { label: 'Cloudy', value: 'Cloudy' },
  ];

  const pestDetection = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const growthStages = [
    { label: 'Seedling', value: 'Seedling' },
    { label: 'Vegetative', value: 'Vegetative' },
    { label: 'Flowering', value: 'Flowering' },
  ];

  const treatments = [
    { label: 'None', value: 'None' },
    { label: 'Fungicide', value: 'Fungicide' },
    { label: 'Pesticide', value: 'Pesticide' },
  ];

  const provinces = [
    { label: 'Western', value: 'Western' },
    { label: 'Central', value: 'Central' },
    { label: 'Southern', value: 'Southern' },
    { label: 'Eastern', value: 'Eastern' },
    { label: 'Northern', value: 'Northern' },
    { label: 'North Western', value: 'North Western' },
    { label: 'North Central', value: 'North Central' },
    { label: 'Sabaragamuwa', value: 'Sabaragamuwa' },
    { label: 'Uva', value: 'Uva' },
  ];

  return (
    <View style={styles.container}>
      {/* Lottie Background Animation */}
      <LottieView
        source={require('../../assets/animations/remedybackground.json')}
        autoPlay
        loop
        style={styles.lottieBackground}
      />

      {/* UI Elements on top of the animation */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          View Recommendation for the Predicted Disease: {disease}
        </Text>
        <Text style={styles.subHeader}>
          Fill in the paddy conditions to receive a personalized remedy
        </Text>

        {/* Soil Condition Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={soilCondition}
            onValueChange={setSoilCondition}
            style={styles.picker}
          >
            <Picker.Item label="Choose Soil Condition" value={null} />
            {soilConditions.map(item => (
              <Picker.Item label={item.label} value={item.value} key={item.value} />
            ))}
          </Picker>
        </View>

        {/* Weather Condition Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={weather}
            onValueChange={setWeather}
            style={styles.picker}
          >
            <Picker.Item label="Choose Weather Condition" value={null} />
            {weatherConditions.map(item => (
              <Picker.Item label={item.label} value={item.value} key={item.value} />
            ))}
          </Picker>
        </View>

        {/* Pest Detection Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pestDetected}
            onValueChange={setPestDetected}
            style={styles.picker}
          >
            <Picker.Item label="Choose Pest Detection" value={null} />
            {pestDetection.map(item => (
              <Picker.Item label={item.label} value={item.value} key={item.value} />
            ))}
          </Picker>
        </View>

        {/* Growth Stage Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={growthStage}
            onValueChange={setGrowthStage}
            style={styles.picker}
          >
            <Picker.Item label="Choose Growth Stage" value={null} />
            {growthStages.map(item => (
              <Picker.Item label={item.label} value={item.value} key={item.value} />
            ))}
          </Picker>
        </View>

        {/* Treatment Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={treatment}
            onValueChange={setTreatment}
            style={styles.picker}
          >
            <Picker.Item label="Choose Treatment" value={null} />
            {treatments.map(item => (
              <Picker.Item label={item.label} value={item.value} key={item.value} />
            ))}
          </Picker>
        </View>

        {/* Province Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={province}
            onValueChange={setProvince}
            style={styles.picker}
          >
            <Picker.Item label="Choose Province" value={null} />
            {provinces.map(item => (
              <Picker.Item label={item.label} value={item.value} key={item.value} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={getRemedy}
        >
          <Text style={styles.buttonText}>Get Remedy</Text>
        </TouchableOpacity>

        {/* Custom Modal with Animation */}
        <Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)} 
>
  <View style={styles.modalContainer}>
   

    {/* Modal Content */}
<View style={styles.modalContent}>
  {/* Title */}
  <Text style={styles.modalTitle}>Recommended Remedy</Text>

  {/* Actual Remedy */}
  <Text style={styles.modalText}>{remedy}</Text>

  {/* Close Button */}
  <TouchableOpacity 
    style={styles.closeButton} 
    onPress={() => setModalVisible(false)} // Close modal
  >
    <Text style={styles.closeButtonText}>Close</Text>
  </TouchableOpacity>
</View>
  </View>
</Modal>

      </View>
    </View>
  );
};

export default RemedyScreen;
