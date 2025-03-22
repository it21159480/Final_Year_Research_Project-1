import React, { useRef, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface BottomSheetComponentProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  name?: string;
  snapPoints?: string[];
}
export type BottomDrawerRef = {
    present: () => void;
    dismiss: () => void;
  };
const BottomSheetComponent = React.forwardRef<any, BottomSheetComponentProps>(
  ({ isVisible, onClose, children, title,snapPoints}, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Update the BottomSheet's visibility based on isVisible prop
    useEffect(() => {
      if (isVisible) {
        bottomSheetRef.current?.expand(); // Open the bottom sheet
      } else {
        bottomSheetRef.current?.close(); // Close the bottom sheet
      }
    }, [isVisible]);

    // Expose methods to control the BottomSheet externally
    useImperativeHandle(ref, () => ({
      present: () => bottomSheetRef.current?.expand(),
      dismiss: () => bottomSheetRef.current?.close(),
    }));

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={isVisible ? 0 : -1} // Control open/close based on isVisible
        snapPoints={snapPoints}
        onChange={(index) => {
          if (index === -1) {
            onClose(); // Trigger onClose when the BottomSheet is dismissed
          }
        }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {children}
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BottomSheetComponent;
