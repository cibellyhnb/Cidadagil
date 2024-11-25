import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import InformacoesScreen from './src/screens/InformacoesScreen';
import SolicitacoesScreen from './src/screens/SolicitacoesScreen';
import ChatBotScreen from './src/screens/ChatBotScreen';
import { RootStackParamList } from './src/@types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#288692',
            },
            headerTintColor: '#FFFFFF', 
            headerTitleStyle: {
              fontWeight: 'regular',
            },
          }}
        >
          <Stack.Screen name="Inicio" component={HomeScreen} />
          <Stack.Screen name="Informações" component={InformacoesScreen} />
          <Stack.Screen name="Solicitações" component={SolicitacoesScreen} />
          <Stack.Screen name="ChatBot" component={ChatBotScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;