import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  headerCellLeft: {
    width: '30%',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  headerCellMiddle: {
    width: '30%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerCellRight: {
    width: '40%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cellLeft: {
    width: '30%',
    textAlign: 'left',
    fontSize: 14,
  },
  cellMiddle: {
    width: '30%',
    textAlign: 'center',
    fontSize: 14,
  },
  cellRight: {
    textAlign: 'right',
    fontSize: 14,
  },
  positionCell: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'flex-end', // Centraliza os itens horizontalmente
  },
});

export default styles;
