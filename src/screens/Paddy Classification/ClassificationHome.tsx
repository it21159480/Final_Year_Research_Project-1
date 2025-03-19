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
import SecondBanner from '../../assets/pestHome1.png'
import { Card } from 'react-native-paper';
import classificationImage from '../../assets/Classification.png';
import Pest from '../../assets/Pest.png';
import Disease from '../../assets/Disease.png';
import Price from '../../assets/Price.png';
import { PestHomeProps, ClassificationHomeProps } from '../../Naviagtion/types';
import { PADDY_PREDICTION_SCREEN } from './PaddyPredictionScreen'; 
import { useDispatch } from 'react-redux';
import { addImage } from '../../store/actions'; // Adjust the path to your actions


export const CLASSIFICATION_HOME = 'CLASSIFICATION_HOME';
const details = [
    { image: classificationImage, title: "How do we identify an insect?", subtitle: "The world of insects is rich and varied..." },
    { image: Pest, title: "The Scientific Nomenclature for Insects", subtitle: "There are more than one million known species of insects..." },
    { image: Disease, title: "Disease Identification", subtitle: "Understanding the different types of diseases..." },
    { image: Price, title: "Agricultural Pricing", subtitle: "Learn how prices are set in the agriculture industry..." },
];
const ClassificationHome : React.FC<ClassificationHomeProps> = ({navigation}) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleImagePicked = (uri: string) => {
        if (!uri) {
            console.warn('No image selected. Please select an image before proceeding.');
            return;
        }
        dispatch(addImage(uri)); // Save the image URI to Redux
        setImageUri(uri); // Set the picked image URI
        navigation.navigate(PADDY_PREDICTION_SCREEN, { imageUri: uri }); // Navigate to the Prediction screen
    };

    return (
        <Container
            scrollView={true} // Allows the content to scroll if needed
            header={<Header
                showLogo={false}
                title={'Paddy Classification'} />}
        >
            <Card style={{ marginTop: 25 }}>
                <Card.Cover source={PestBanner} />
            </Card>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Paddy Classifier!</Text>
                <Text style={styles.description}>
                    Discover the world of paddy affecting paddy crops. Simply snap a photo or upload one from your gallery to identify any pest.
                </Text>
                <ImagePickerComponent onImagePicked={handleImagePicked} />
            </View>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.black }}>Get Start</Text>
            </View>
            <View>
                {details.map((item, index) => {
                    const handlePress = () => {
                        console.log(`Navigate to ${item.title}`);
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

export default ClassificationHome;
