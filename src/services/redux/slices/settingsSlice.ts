// src/services/redux/settingsSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@services/i18n/i18n';

interface SettingsState {
  darkMode: boolean;
  language: string;
}

const initialState: SettingsState = {
  darkMode: false, // valor inicial
  language: i18n.language || 'en', // valor inicial
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      AsyncStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      AsyncStorage.setItem('language', state.language);
    },
    loadSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      const {darkMode, language} = action.payload;
      if (darkMode !== undefined) state.darkMode = darkMode;
      if (language) state.language = language;
    },
  },
});

export const {toggleDarkMode, setLanguage, loadSettings} =
  settingsSlice.actions;

export default settingsSlice.reducer;
