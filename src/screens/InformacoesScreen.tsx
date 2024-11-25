import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../@types/navigation';

type FilterBySectorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Informações'>;
type FilterBySectorScreenRouteProp = RouteProp<RootStackParamList, 'Informações'>;

interface Props {
  navigation: FilterBySectorScreenNavigationProp;
  route: FilterBySectorScreenRouteProp;
}

export default function InformacoesScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [sector, setSector] = useState<string | null>(null);

  // como não houve tempo para fazer a integração completa do app, foi feito alguns modelos de notícia
  const newsData = [
    { id: '1', title: 'Notícia 1 de Saúde', sector: 'Saúde' },
    { id: '2', title: 'Notícia 2 de Educação', sector: 'Educação' },
    { id: '3', title: 'Notícia 3 de Cultura', sector: 'Cultura' },
    { id: '4', title: 'Notícia 4 de Saúde', sector: 'Saúde' },
    { id: '5', title: 'Notícia 5 de Economia', sector: 'Economia' },
  ];

  const filteredNews =
    sector === 'Todos'
      ? newsData
      : sector
      ? newsData.filter((news) => news.sector === sector)
      : [];

  const handleSectorSelect = (selectedSector: string) => {
    setSector(selectedSector);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Filtrar por setor</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Text style={[styles.filterButtonText, !sector && styles.placeholderText]}>
            {sector ? sector : 'Clique para selecionar o setor'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.labelNoticia}>Notícias</Text>
        {sector === null ? (
          <Text style={styles.noNewsText}>Selecione um setor para ver as notícias.</Text>
        ) : filteredNews.length > 0 ? (
          <FlatList
            data={filteredNews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text style={styles.newsText}>{item.title}</Text>}
          />
        ) : (
          <Text style={styles.noNewsText}>
            {sector ? `Nenhuma notícia para o setor ${sector}.` : 'Selecione um setor'}
          </Text>
        )}

        {/* Modal de seleção */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecione um setor</Text>
              <ScrollView style={styles.scrollView}>
                {[ 
                  'Todos',
                  'Saúde',
                  'Educação',
                  'Assistência social',
                  'Infraestrutura',
                  'Meio ambiente',
                  'Finanças',
                  'Segurança pública',
                  'Cultura',
                  'Esportes e Lazer',
                  'Turismo',
                  'Economia',
                  'Transportes e Mobilidade Urbana',
                  'Agricultura',
                  'Comunicação',
                  'Planejamento e Inovação',
                  'Administração',
                  'Serviços Urbanos',
                  'Direitos Humanos',
                ].map((sec) => (
                  <TouchableOpacity
                    key={sec}
                    onPress={() => handleSectorSelect(sec)}
                    style={styles.modalOptionButton}
                  >
                    <Text style={styles.modalOptionText}>{sec}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

    
      <View style={styles.bottomBar}>

        <TouchableOpacity 
          style={styles.iconContainer}
          onPress={() => navigation.navigate('ChatBot')}>
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
          style={styles.iconContainer}>
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
  contentContainer: {
    flex: 1,
  },
  label: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginLeft: 20, 
    marginVertical: 20,
  },
  labelNoticia: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginLeft: 20, 
    marginTop: 35,
    marginBottom: 10,
  },
  filterButton: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFF0C7',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    color: '#aaa',
  },
  newsText: {
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    color: '#000',
  },
  noNewsText: {
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 5,
    color: '#aaa',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  scrollView: {
    maxHeight: 300,
    marginBottom: 15,
  },
  modalOptionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FFF0C7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
  },
  bottomBar: {
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