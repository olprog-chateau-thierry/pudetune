// shared_preferences.js
import * as SecureStore from 'expo-secure-store';

const setStore = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
}

const getStore = async (key) => {
    return await SecureStore.getItemAsync(key)
}

export {
    getStore,
    setStore
}
