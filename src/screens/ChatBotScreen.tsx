import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../@types/navigation';

type ChatBotScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatBot'>;
type ChatBotScreenRouteProp = RouteProp<RootStackParamList, 'ChatBot'>;

interface Props {
  navigation: ChatBotScreenNavigationProp;
  route: ChatBotScreenRouteProp;
}

export default function ChatBotScreen({ navigation }: Props) {
  const [userMessage, setUserMessage] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSend = () => {
    console.log('Mensagem enviada:', userMessage);
    setUserMessage('');
  };

  const handleOptionSelect = (message: string) => {
    setUserMessage(message); 
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
        <Text style={styles.greetingText}>Olá, cidadão!{"\n"}Posso ajudar?</Text>

        <View style={styles.optionsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect('Solicitar requerimento')}>
              <Text style={styles.optionText}>Solicitar requerimento</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect('Horários de ônibus')}>
              <Text style={styles.optionText}>Horários de ônibus</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.centralOptionButton}
            onPress={() => handleOptionSelect('Realizar denúncia')}>
            <Text style={styles.optionText}>Realizar denúncia</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.inputContainer,
            { marginBottom: isKeyboardVisible ? 160 : 100 }, 
          ]}>
          <TextInput
            style={styles.textInput}
            placeholder="Pergunte ao Cidadágil"
            value={userMessage}
            onChangeText={setUserMessage}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Icon name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="chatbubble-ellipses" size={24} color="#FFF" />
          <Text style={styles.iconLabel}>ChatBot</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Solicitações')}>
          <Icon name="clipboard" size={24} color="#FFF" /> 
          <Text style={styles.iconLabel}>Solicitações</Text> 
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Informações')}>
          <Icon name="information-circle" size={24} color="#FFF" />
          <Text style={styles.iconLabel}>Informações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F2',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  greetingText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 270,
  },
  optionsContainer: {
    alignItems: 'center',
    marginTop: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    height: '21%',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#FFF0C7',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralOptionButton: {
    backgroundColor: '#FFF0C7',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: 'light',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0C7',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#288692',
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#288692',
    height: 70,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,                    
    height: 60,  
  },
  iconLabel: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 4,                
    textAlign: 'center',  
  },
}); 