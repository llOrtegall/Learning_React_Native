import { View, StyleSheet, Image } from 'react-native';

const Placeholder = require('../../assets/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={Placeholder} style={styles.image} />
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
    flex: 1
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  }
});