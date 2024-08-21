import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileData: {
    width: '100%',
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 36,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  languagePicker: {
    width: '80%',
  },
  pofileButton: {
    width: '100%',
    backgroundColor: 'grey',
    marginBottom: 8,
  },
  profileButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  profileOptionsView: {
    width: '100%',
  },
});

export default styles;
