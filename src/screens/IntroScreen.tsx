/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// PestHome.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import colors from '../theme/colors';
import { Card } from 'react-native-paper';
import Pest from '../../assets/Pest.png';
import Disease from '../../assets/Disease.png';
import Price from '../../assets/Price.png';
import { useDispatch, useSelector } from 'react-redux';
import { intro } from '../constant/intro'; // your intro array
import { IntroScreenProps } from '../Naviagtion/types';
import { RootState } from '../store/store';

export const INTRO_SCREEN = 'INTRO_SCREEN';


const IntroScreen: React.FC<IntroScreenProps> = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.user?.access_token);

    // Now you can use `token` as needed
    console.log('Token:', token);
    const { title } = route.params;

    // Find the matching intro content by title
    const introItem = intro.find(i => i.title === title);

    if (!introItem) {
        return <Text>No details found.</Text>;
    }

    return (
        <Container
            scrollView={true} // Allows the content to scroll if needed
            header={<Header
                showLogo={false}
                title={introItem.title} />}
        >
             <Card style={{ marginTop: 25, marginBottom: 25 }}>
                <Card.Cover source={introItem.images[0]} />
            </Card>
          
        
            <Text style={{ marginBottom: 15, textAlign:'justify' }}>{introItem.discription}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.black, margin:10, marginLeft:0 }}>Advantages:</Text>
            <Text style={{ marginBottom: 15,textAlign:'justify'  }}>{introItem.advantages}</Text>
             <Card style={{ marginTop: 25, marginBottom: 25 }}>
                <Card.Cover source={introItem.images[1]} />
            </Card>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.black,margin:10, marginLeft:0 }}>Usefulness:</Text>
            <Text style={{marginBottom:15, textAlign:'justify'}}>{introItem.usefulness}</Text>
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

export default IntroScreen;
