import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0ff', // Leve coloração cinza
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  appName: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'GoldenAvocadoSans',
  },
  appSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'HelveticaNeueBold',
    marginBottom: 90,
  },
  innerContainer: {
    width: '80%',
  },
  loginButton: {
    backgroundColor: '#001f3f', // Azul marinho
  },
  loginButtonText: {
    color: '#fff',
  },
  aboutButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutButtonText: {
    color: '#001f3f', // Azul marinho para o texto
  },
  languagePicker: {
    paddingTop: 12,
    width: '80%',
  },
});

export default styles;
