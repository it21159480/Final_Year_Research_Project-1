/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { PredictionScreenProps } from '../../Naviagtion/types'
import colors from '../../theme/colors'
import Container from '../../components/Container'
import PRHeader from '../../components/PRHeader'

export const PREDICTION_SCREEN = 'PREDICTION_SCREEN'
const PredictionScreen: React.FC<PredictionScreenProps> = ({ route, navigation }) => {

  const { imageUri } = route.params
  console.log(imageUri)

  return (
    <Container
      scrollView={true}
      imageTop={true}
      customStyle={styles.con}
      header={
        <PRHeader
          imageUri={imageUri}
        />
      }
    >
      <View style={{backgroundColor:'white',marginTop:20}}>
        <Text>ho</Text>
      </View>
    </Container>

  )
}
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
  con: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,

  }
});
export default PredictionScreen