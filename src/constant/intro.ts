import Diseas1 from '../assets/disease1.png';
import Disease2 from '../assets/disease2.png';
import PaddyClassification1 from '../assets/paddyclassification1.png';
import PaddyClassification2 from '../assets/paddyclassification2.jpg';
import Pest1 from '../assets/pest1.jpg';
import Pest2 from '../assets/pest2.jpg';
import Price1 from '../assets/price1.jpg';
import Price2 from '../assets/price2.jpg';

export const intro = [
    {
    title: 'Paddy Variety Classification',
    discription :'This app uses deep learning and advanced image processing to accurately classify different Sri Lankan paddy varieties from photographs. It employs a Convolutional Neural Network (CNN) combined with clustering algorithms like HDBSCAN to identify and separate multiple paddy types within a single image.',
    images: [PaddyClassification1, PaddyClassification2],
    advantages: `The system automates the traditional manual classification process, delivering fast and reliable results on mobile devices. It can handle mixed paddy samples by detecting the dominant varieties through unsupervised clustering. The app is designed with a user-friendly interface suitable for farmers and agricultural workers, requiring no technical expertise. It performs well in real-time under diverse field conditions, making it practical for use directly in farming environments.`,
    usefulness: `This tool helps farmers and agricultural officials quickly and accurately identify paddy varieties. By simplifying and speeding up classification, it supports better farming decisions and improves the overall management of paddy cultivation.`,
  },
  {
    title: 'Paddy Pest Detection',
    discription :'This app uses advanced deep learning with a YOLO-based object detection model to identify paddy pests in real-time through images taken by farmers. It uses transfer learning to fine-tune the model for local pest species, ensuring high accuracy even in complex field environments. The app provides instant pest identification and detailed pest profiles including life cycles, damage symptoms, and tailored management recommendations.',
    images: [Pest1, Pest2],
    advantages: `The system operates efficiently on mobile devices, including offline modes, making it accessible in rural areas with limited connectivity. It offers a user-friendly interface in local languages, designed for farmers with varying technical skills. Besides detection, it integrates a Pest Management Information System (PMIS) that delivers context-sensitive advice on biological, cultural, and chemical control methods, promoting sustainable farming.`,
    usefulness: `By enabling early and precise pest detection, the app helps farmers reduce crop losses and pesticide overuse, supporting environmental conservation. The continuous feedback loop allows model improvements from real-world data, making the system more accurate over time. This tool empowers farmers to make informed, timely decisions, fostering better pest control and sustainable agricultural practices across Sri Lanka.`,
  },
  {
    title: 'Paddy Disease Diagnosis',
    discription :'This app uses advanced AI and deep learning to accurately detect paddy leaf diseases from images. Powered by a sophisticated neural network, it identifies a wide range of common diseases in Sri Lanka with over 93% accuracy.',
    images: [Diseas1, Disease2],
    advantages: `It provides fast, automatic disease detection without the need for expert help. The app includes an image quality check that filters out poor or irrelevant photos, ensuring reliable results. It also delivers personalized treatment and prevention advice based on the detected disease and local farming conditions. Designed to work offline, the app is optimized for Android smartphones, making it accessible and easy to use in rural areas with limited internet connectivity.`,
    usefulness: `This tool empowers farmers by enabling early detection of diseases, which helps minimize crop losses and supports sustainable farming practices. By transforming complex AI-based diagnostics into clear, actionable guidance, it makes expert-level advice available anytime, anywhere.`,
  },
  
  {
    title: 'Paddy Price Forecasting',
    discription :'This app uses a hybrid machine learning model combining Seasonal ARIMA (SARIMA) and Long Short-Term Memory (LSTM) networks to accurately forecast paddy prices in Sri Lanka. By integrating historical price data with real-time environmental factors like rainfall, temperature, and humidity, it offers more precise and timely predictions than traditional models.',
    images: [Price1, Price2],
    advantages: `The hybrid approach captures both seasonal patterns and complex non-linear trends in the market, overcoming limitations of older forecasting methods. It works effectively in real-time and adapts to changing conditions, helping farmers, traders, and policymakers make better decisions. The mobile app provides an intuitive interface to access these forecasts and visual analytics easily.`,
    usefulness: `This tool empowers users to reduce financial risks by planning planting, harvesting, and selling times based on reliable price forecasts. It supports stable agricultural markets, better resource allocation, and sustainable farming practices by providing actionable insights directly on smartphones, accessible even in remote areas.`,
  },
  
];
