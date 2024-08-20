import {RootState} from '@services/redux/store';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const useGlobalStyles = () => {
  const darkMode = useSelector((state: RootState) => state.settings.darkMode);

  return StyleSheet.create({
    container: {
      backgroundColor: darkMode ? '#3b3b3b' : '#f0f0ff', // Preto para dark mode, cinza claro para light mode
    },
    commonTextSmall: {
      fontSize: 14,
      color: darkMode ? '#ffffff' : '#3b3b3b', // Branco para dark mode, cinza para light mode
    },
    commonTextMedium: {
      fontSize: 16,
      color: darkMode ? '#ffffff' : '#3b3b3b',
    },
    commonTextBig: {
      fontSize: 32,
      color: darkMode ? '#ffffff' : '#3b3b3b',
    },
    aboutButtonText: {
      fontSize: 16,
      color: darkMode ? '#ffffff' : '#001f3f',
    },
  });
};

export default useGlobalStyles;
