import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import LoginScreen from './screens/LoginScreen';
import LobbyScreen from './screens/LobbyScreen';
import ChatScreen from './screens/ChatScreen';
import { rootReducer } from './data/Reducer';

const store = configureStore({
  reducer: rootReducer, 
});

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Lobby' component={LobbyScreen}/>
          <Stack.Screen name='Chat' component={ChatScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

