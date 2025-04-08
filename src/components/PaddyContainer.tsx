import React from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../theme/colors'; // Assuming you have a theme/colors.js file

// const { height } = Dimensions.get('window');

function PaddyContainer({
  children,
  customStyle,
  footerCustomStyle,
  renderFooter,
  scrollView = false,
  touchable = false,
  header,
  imageTop = false,
}: {
  children: React.ReactNode;
  customStyle?: any;
  footerCustomStyle?: boolean;
  renderFooter?: () => React.ReactNode;
  scrollView?: boolean;
  touchable?: boolean;
  header?: React.ReactNode;
  imageTop?: boolean;
}) {
  //   const insets = useSafeAreaInsets();

  const defaultStyle = {
    // marginTop: 20,
    // marginBottom: 20,
    marginHorizontal: 15,
  };

  const Wrap = scrollView ? ScrollView : View;

  const renderContent = (
    <View style={styles.container}>
      <View style={[styles.container, { backgroundColor: colors.white }]}>
        {/* SafeAreaView to handle the safe area on iPhones with notches */}
        {!imageTop && <SafeAreaView edges={['top']} style={[styles.topBar, { backgroundColor: colors.gray }]} />}
        {imageTop && <StatusBar
          barStyle="light-content"
          backgroundColor={colors.transparent}
          translucent={true}
        />}
        {header && <View>{header}</View>}

        <SafeAreaView edges={['left', 'right']} style={[styles.flexbox, customStyle]}>
          <Wrap style={[styles.flexbox, defaultStyle]} keyboardShouldPersistTaps="always">
            {children}
          </Wrap>
        </SafeAreaView>

        {footerCustomStyle && <View style={styles.footer}>{renderFooter?.()}</View>}
      </View>
    </View>
  );

  return touchable ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      {renderContent}
    </TouchableWithoutFeedback>
  ) : (
    renderContent
  );
}

const styles = StyleSheet.create({
  flexbox: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  topBar: {
    flex: 0,
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.white,
    paddingTop: 20,
  },
});

export default PaddyContainer;
