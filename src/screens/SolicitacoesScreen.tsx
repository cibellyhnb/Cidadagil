import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import { NavigationProps } from '../@types/navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SolicitacoesScreen({ navigation }: NavigationProps) {
  const [userMessage, setUserMessage] = useState(''); 
  const [userRequests, setUserRequests] = useState<string[]>([]); 

  const handleSend = () => {
    if (userMessage.trim() !== '') {
      setUserRequests([...userRequests, userMessage]); 
      setUserMessage(''); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Encontre a solução ideal para o seu problema:
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Informe aqui a sua solicitação" 
          placeholderTextColor="#aaa"
          autoFocus={false} 
          onFocus={() => console.log('Foco no campo de texto')} 
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Icon name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

     
      <Text style={styles.subtitle}>Solicitações mais frequentes:</Text>
      <ScrollView style={styles.frequentRequestsContainer}>
        <View style={styles.requestBox}>
          <Text style={styles.requestText}>Aluguel de Espaço Público</Text>
        </View>
        <View style={styles.requestBox}>
          <Text style={styles.requestText}>Manutenção de Iluminação Pública</Text>
        </View>
        <View style={styles.requestBox}>
          <Text style={styles.requestText}>Recolhimento de Entulho</Text>
        </View>
        <View style={styles.requestBox}>
          <Text style={styles.requestText}>Manutenção de Calçadas</Text>
        </View>
        <View style={styles.requestBox}>
          <Text style={styles.requestText}>Denunciar Buraco em via Pública</Text>
        </View>
      </ScrollView>


      <Text style={styles.subtitle}>Suas solicitações:</Text>
      <ScrollView style={styles.requestsContainer}>
        {userRequests.length === 0 ? (
          <Text style={styles.noRequestsText}>
            Você ainda não fez nenhuma solicitação.
          </Text>
        ) : (
          userRequests.map((request, index) => (
            <View key={index} style={styles.requestBox}>
              <Text style={styles.requestText}>{request}</Text>
            </View>
          ))
        )}
      </ScrollView>


      <View style={styles.bottomBar}>

        <TouchableOpacity
          style={styles.iconContainer} onPress={() => navigation.navigate('ChatBot')}>
          <Icon name="chatbubble-ellipses" size={24} color="#FFF" />
          <Text style={styles.iconLabel}>ChatBot</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.iconContainer}>
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
    backgroundColor: '#FAF6EE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 35, 
    marginLeft: 20, 
    marginBottom: 20,
    color: '#000',
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 35,
    marginBottom: 10,
    color: '#000',
  },
  requestsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    maxHeight: 150,
  },
  noRequestsText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
  },
  requestBox: {
    backgroundColor: '#FFF0C7',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  requestText: {
    fontSize: 16,
    color: '#333',
  },
  frequentRequestsContainer: {
    marginHorizontal: 20,
    maxHeight: 285, 
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
