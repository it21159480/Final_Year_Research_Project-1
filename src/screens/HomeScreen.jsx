import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      {/* Button to navigate to PricePredictionScreen */}
      <Button
        title="Go to Prediction"
        onPress={() => navigation.navigate('PricePrediction')}
      />
    </View>
  );
};

export default HomeScreen;


// import { View, Text } from 'react-native';
// import React from 'react';

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>HomeScreen</Text>
//     </View>
//   );
// };

// export default HomeScreen;
