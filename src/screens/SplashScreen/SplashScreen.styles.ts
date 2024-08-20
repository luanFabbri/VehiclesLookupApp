import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width > 1024 ? 1024 : width * 0.8, // 80% da largura da tela ou 1024px, o que for menor
    height: width > 1024 ? 1024 : width * 0.8, // 80% da altura da tela ou 1024px, o que for menor
  },
});

export default styles;
