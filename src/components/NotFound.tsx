/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Make sure you have this installed
import { Button, Card } from 'react-native-paper'; // Assuming you're using react-native-paper for the Card component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import colors from '../theme/colors'; // Adjust the import based on where your colors are defined
import { PEST_HOME } from '../screens/Pest Identification/PestHome';
// Import your NotFound icon image
import NotFoundIcon from '../assets/not-found.png'; // Replace with the actual path

const NotFound = () => {
    const navigation = useNavigation(); // Initialize navigation object
    return (
        <View style={{ marginTop: 20 }}>
            {/* Info Icon and Title */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="info" size={20} color={colors.E400} />
            <Text style={[styles.title, { marginLeft: 10, marginBottom: 0 }]}>Not found</Text>
            </View>

            {/* Image */}
            <View style={{ marginTop: 20 }}>
            <Image
                source={NotFoundIcon}
                style={{ width: '100%', height: 250 }}
                resizeMode="contain"
            />
            </View>

            {/* Retry Button and Description */}
            <View
            style={{  marginTop: 30 }}
            // Call the onRetry function passed from the parent component
            >
            <Card.Content>
                <Text style={styles.description}>
                We couldn't find any results for this image. Please try again with a different image.
                </Text>
            </Card.Content>
            </View>
            <Button
            mode="contained"
            style={{ marginTop: 20, backgroundColor: colors.GR600 }} // Updated to use a custom color
            onPress={() => navigation.navigate(PEST_HOME)} // Replace with your navigation logic    
            children={'Retry'} />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    },
    description: {
        fontSize: 14,
        color: colors.N400, // Adjust as per your theme
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default NotFound;
