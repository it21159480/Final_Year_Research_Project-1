/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// PestHome.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePickerComponent from '../../components/ImagePickerComponent'; // Adjust the path accordingly
import Container from '../../components/Container';
import Header from '../../components/Header';
import colors from '../../theme/colors';
import PestBanner from '../../assets/pestHome.png';
import DiseaseDiagnosis from '../../assets/DiseaseDiagnosis.png';
import SecondBanner from '../../assets/pestHome1.png'
import { Card } from 'react-native-paper';
import classificationImage from '../../assets/Classification.png';
import Pest from '../../assets/Pest.png';
import Disease from '../../assets/Disease.png';
import Price from '../../assets/Price.png';
import { DiseaseHomeScreenProps } from '../../Naviagtion/types';
// import { PREDICTION_SCREEN } from './PredictionScreen';
import { DIAGNOSIS_SCREEN } from './DiagnosisScreen';
import { useDispatch } from 'react-redux';
import { addImage } from '../../store/actions'; // Adjust the path to your actions
import { INTRO_SCREEN } from '../IntroScreen';
export const DISEASE_HOME_SCREEN = "DISEASE_HOME_SCREEN"

const details = [
    {
        image: classificationImage,
        title: 'Paddy Variety Classification',
        subtitle: 'AI-powered classification of Sri Lankan paddy types with fast, reliable results and a user-friendly interface.',
    },
    {
        image: Pest,
        title: 'Paddy Pest Detection',
        subtitle: 'Real-time pest identification using deep learning, offering offline access and tailored pest management advice.',
    },
    {
        image: Disease,
        title: 'Paddy Disease Diagnosis',
        subtitle: 'AI-based leaf disease detection with 93% accuracy and personalized treatment, optimized for offline use.',
    },
    {
        image: Price,
        title: 'Paddy Price Forecasting',
        subtitle: 'Hybrid ML models predict paddy prices using historical and environmental data for timely market insights.',
    },
];
const DeseaseHome: React.FC<DiseaseHomeScreenProps> = ({ navigation }) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleImagePicked = (uri: string) => {
        if (!uri) {
            console.warn('No image selected. Please select an image before proceeding.');
            return;
        }
        dispatch(addImage(uri)); // Save the image URI to Redux
        setImageUri(uri); // Set the picked image URI
        // navigation.navigate(PREDICTION_SCREEN, { imageUri: uri }); // Navigate to the Prediction screen
        navigation.navigate(DIAGNOSIS_SCREEN, { imageUri: uri }); // Navigate to the Diagnosis screen
    };

    return (
        <Container
            scrollView={true} // Allows the content to scroll if needed
            header={<Header
                showLogo={false}
                title={'Disease Diagnosis'} />}
        >
            <Card style={{ marginTop: 25 }}>
                <Card.Cover source={DiseaseDiagnosis} />
            </Card>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Paddy Disease Diagnosis!</Text>
                <Text style={styles.description}>
                    Instantly diagnose paddy diseases with a simple image and receive expert remedies, offering a one-stop solution to ensure your crops thrive and flourish.</Text>
                <ImagePickerComponent onImagePicked={handleImagePicked} />
            </View>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.black }}>Get Start</Text>
            </View>
            <View>
                {details.map((item, index) => {
                    const handlePress = () => {
                        navigation.navigate(INTRO_SCREEN, { title: item.title }); // Navigate to the IntroScreen
                        // You can replace this with your navigation logic
                    };

                    return (
                        <TouchableOpacity key={index} onPress={handlePress} activeOpacity={0.7} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, margin: 5, backgroundColor: colors.white, borderRadius: 10, elevation: 5 }}>
                            <View style={{ width: '70%', gap: 15 }}>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: colors.black }}>{item.title}</Text>
                                <Text style={{ fontSize: 12, color: colors.N400 }}>{item.subtitle}</Text>
                            </View>
                            <Card.Cover source={item.image} style={[styles.cardImage, { width: '30%' }]} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 20,
        color: colors.N400,
    },
    cardImage: {
        height: 100, // Reduce the height of the image inside the card
        borderTopLeftRadius: 10, // Optional: Rounded corners for the card image
        borderTopRightRadius: 10, // Optional: Rounded corners for the card image
    },
});

export default DeseaseHome;
