// TODO - Resolver as gambiarras de posicionamento

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyTextDate: {
    fontSize: 12,
    marginRight: 95,
  },
  historyTextPosition: {fontSize: 12},
  historyFuel: {
    fontSize: 12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
