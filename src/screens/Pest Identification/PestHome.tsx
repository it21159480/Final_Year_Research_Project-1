/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// PestHome.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ImagePickerComponent from '../../components/ImagePickerComponent'; // Adjust the path accordingly
import Container from '../../components/Container';
import Header from '../../components/Header';
import colors from '../../theme/colors';
import PestBanner from '../../assets/pestHome.png';
import SecondBanner from '../../assets/pestHome1.png'
import { Card } from 'react-native-paper';

export const PEST_HOME = 'PEST_HOME';
const PestHome = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleImagePicked = (uri: string) => {
        setImageUri(uri); // Set the picked image URI
    };

    return (
        <Container
            scrollView={true} // Allows the content to scroll if needed
            header={<Header
                showLogo={false}
                title={'Pest Identification'} />}
        >
            <Card style={{marginTop:25}}>
                <Card.Cover source={PestBanner} />
            </Card>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Paddy Pest Identifier!</Text>
                <Text style={styles.description}>
                    Discover the world of pests affecting paddy crops. Simply snap a photo or upload one from your gallery to identify any pest.
                </Text>
                <ImagePickerComponent onImagePicked={handleImagePicked} />
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
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
});

export default PestHome;
