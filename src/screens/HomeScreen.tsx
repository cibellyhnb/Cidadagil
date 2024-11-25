import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/cidadagil.jpg')} 
        style={styles.image} 
      />
      <Text style={styles.title}>
        <Text style={styles.highlightDarkBlue}>Facilite, Conecte e</Text>{' '}
        <Text style={styles.highlightBlue}>Transforme sua Cidade</Text>
      </Text>
      <CustomButton 
        text="Clique para começar" 
        onPress={() => navigation.navigate('Solicitações')} 
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAF6EE', 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 5, 
  },
  highlightDarkBlue: {
    color: '#001355', 
  },
  highlightBlue: {
    color: '#288692', 
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 10, 
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#288692',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginTop: 30, 
  },
});
