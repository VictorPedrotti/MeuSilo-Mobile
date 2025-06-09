import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PerfilScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PERFIL</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Seção de informações do usuário */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account" size={60} color="#228B22" />
          </View>
          
          <Text style={styles.userName}>AFONSO PEREIRA SILVA</Text>
          <Text style={styles.userRole}>Auxiliar de produção</Text>
          <Text style={styles.userLocation}>Cascavel, Paraná</Text>
        </View>

        {/* Seção de informações da empresa */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>EMPRESA</Text>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="office-building" size={20} color="#228B22" />
            <Text style={styles.infoText}>Coopacol LTDA</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="card-account-details" size={20} color="#228B22" />
            <Text style={styles.infoText}>76.093.731/0001-90</Text>
          </View>
        </View>

        {/* Seção de localização */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>LOCALIZAÇÃO</Text>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#228B22" />
            <Text style={styles.infoText}>BR-277 - Santa Felicidade, Cascavel</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map" size={20} color="#228B22" />
            <Text style={styles.infoText}>OCUPAÇÃO: Lote 2</Text>
          </View>
        </View>

        {/* Botão de histórico */}
        <TouchableOpacity 
          style={styles.historyButton}
        >
          <Text style={styles.historyButtonText}>Histórico de pedidos</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#228B22" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22',
    padding: 15,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  content: {
    padding: 20,
    paddingTop: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  userRole: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#228B22',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  historyButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  historyButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default PerfilScreen;