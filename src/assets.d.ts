// src/assets.d.ts or assets.d.ts in the root of your project
declare module "*.png" {
    const value: any;
    export default value;
}

declare module "*.jpg" {
    const value: any;
    export default value;
}

declare module "*.jpeg" {
    const value: any;
    export default value;
}


// src/types/react-native-image-slider-box.d.ts or just react-native-image-slider-box.d.ts
declare module 'react-native-image-slider-box' {
    import { Component } from 'react';
    import { ImageStyle, ViewStyle, TextStyle } from 'react-native';

    interface ImageSliderBoxProps {
        images: string[]; // Array of image URLs or local image paths
        sliderBoxHeight?: number;
        onCurrentImagePressed?: (index: number) => void;
        dotColor?: string;
        inactiveDotColor?: string;
        dotStyle?: ImageStyle | ViewStyle | TextStyle;
        autoplay?: boolean;
        circleLoop?: boolean;
        imageLoadingColor?: string;
    }

    export class ImageSliderBox extends Component<ImageSliderBoxProps> { }
    export default ImageSliderBox;
}
