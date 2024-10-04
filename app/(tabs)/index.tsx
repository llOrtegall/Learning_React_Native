import { View, StyleSheet,  } from 'react-native';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePiker from 'expo-image-picker';

const Placeholder = require('../../assets/background-image.png');

export default function Index() {
  const pickImageAsync = async () => {
    let result = await ImagePiker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    if(!result.canceled){
      console.log(result);
    } else {
      alert('You must pick an image to continue.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={Placeholder} />
      </View>
      <View style={styles.footerContainer}>
        <Button label='Choose a photo' theme='primary' />
        <Button label='Take a photo' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  }
});