import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  appName: {
    fontSize: 36,
    textAlign: 'center',
  },
  appSubtitle: {
    textAlign: 'center',
    marginBottom: 70,
  },
  innerContainer: {
    width: '80%',
  },
  loginButton: {
    backgroundColor: '#001f3f', // Azul marinho
    marginBottom: 8,
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
});

export default styles;
