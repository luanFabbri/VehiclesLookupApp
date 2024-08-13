import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  model: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default styles;
