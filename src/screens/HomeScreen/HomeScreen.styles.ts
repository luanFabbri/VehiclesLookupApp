import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 20,
  },
  logo: {
    height: 60,
    resizeMode: 'contain',
    marginLeft: 130,
  },
  map: {
    flex: 1,
  },
});

export default styles;
