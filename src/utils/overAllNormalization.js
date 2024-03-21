import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;
const calWidth = width > height ? height : width;
const calheight = height > width ? height : width;

const scale = size => (calWidth / guidelineBaseWidth) * size;
const verticalScale = size => (calheight / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale};
