import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Task } from './index';

export type RootStackParamList = {
  Inicio: undefined;
  'Informações': undefined;
  'Solicitações': undefined;
  'ChatBot': undefined;
};

export type NavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};