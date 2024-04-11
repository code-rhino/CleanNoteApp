import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import NoteDetail from './screens/NoteDetailScreen';
import CreateNoteScreen from './screens/CreateNoteScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // Adjust the path as needed


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />
        <Stack.Screen name="NoteDetail" component={NoteDetail} options={{ headerShown: false}} />
        <Stack.Screen name="CreateNote" component={CreateNoteScreen} options={{ headerShown: false}} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}


export default App;