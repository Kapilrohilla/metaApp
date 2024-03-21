import React from 'react';
import {View, StyleSheet, Appearance} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RouteProvider from './src/Navigation/RouteProvider';
import {NativeBaseProvider} from 'native-base';
import {PaperProvider} from 'react-native-paper';
// import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import store from './ReduxToolkit/store';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
// import OrderCreate from './src/Screens/OrderCreate';
// import OrderSuccess from './src/Screens/OrderSuccess';
// import NewAccountStart from './src/Screens/AccountSetup/NewAccountStart';
// import NewAccountRegistration from './src/Screens/AccountSetup/NewAccountRegistration';
// import OpenDemoAccount from './src/Screens/AccountSetup/OpenDemoAccount';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};
const App = () => {
  Appearance.setColorScheme('dark');
  LogBox.ignoreAllLogs();
  return (
    <>
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <NativeBaseProvider>
          <PaperProvider>
            <NavigationContainer>
              <GestureHandlerRootView style={{flex: 1}}>
                <View style={styles.AppContainer}>
                  <RouteProvider />
                  {/* <NewAccountStart /> */}
                  {/* <NewAccountRegistration /> */}
                  {/* <OpenDemoAccount /> */}
                </View>
              </GestureHandlerRootView>
            </NavigationContainer>
          </PaperProvider>
        </NativeBaseProvider>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
};

export default App;
const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    backgroundColor: '#16181a',
  },
});
