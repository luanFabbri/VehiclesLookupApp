import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    paddingBottom: 20,
    height: 80,
    lineHeight: 80,
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  map: {
    flex: 1,
  },
});

export default styles;
