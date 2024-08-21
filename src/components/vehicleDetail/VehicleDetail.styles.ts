import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyTextDate: {
    fontSize: 12,
  },
  historyFuel: {
    fontSize: 12,
    backgroundColor: 'red',
  },
  historyTextPosition: {fontSize: 12},
});

export default styles;
