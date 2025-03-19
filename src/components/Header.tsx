/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../theme/colors'; // Assuming you have a colors theme file
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  showLogo?: boolean;
  backtext?: String;
  title?:String;// Add a prop to control conditional rendering
}

const Header: React.FC<HeaderProps> = ({
  showLogo = true,
  backtext,
  title,
}) => {
  return (

    <View style={styles.headerContainer}>
      {/* Conditionally render the logo */}
      {showLogo && (
        <>
          <Image
            source={require('../assets/logo.png')} // Add your logo image in the assets folder
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Agri-Frontier</Text>
        </>
      )}
      {title && (
        <View style={{padding:10, flexDirection: 'row', alignItems: 'center',}}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Align logo and text vertically
    alignItems: 'center', // Center the logo and text
    justifyContent: 'center',
  },
  logo: {
    width: 100, // Adjust width of the logo
    height: 100, // Adjust height of the logo
  },
  title: {
    fontSize: 24, // Adjust text size
    fontWeight: '500', // Adjust font weight
    color: colors.black, // Use a color from your theme
  },
});

export default Header;
