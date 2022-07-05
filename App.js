import React from 'react';
import {SafeAreaView} from 'react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux'
import {persistor,store} from './redux/store'
import Auth from './auth/auth';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff",marginTop: 15}}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth />
      </PersistGate>
    </Provider>
    </SafeAreaView>
  );
}
