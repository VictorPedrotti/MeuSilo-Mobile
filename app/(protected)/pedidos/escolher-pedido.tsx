// app/pedidos/escolher.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EscolherPedido = () => {
  const animais = [
    { id: 1, nome: 'Suíno', icon: 'pig' },
    { id: 2, nome: 'Aves', icon: 'bird' },
    { id: 3, nome: 'Bovino: leite', icon: 'cow' },
    { id: 4, nome: 'Bovino: corte', icon: 'food-steak' },
  ];

  return (
    <View style={styles.container}>
      {/* Header idêntico ao formulário-silo */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ESCOLHER PEDIDO</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>ESCOLHA O ANIMAL</Text>
        
        {animais.map((animal) => (
          <TouchableOpacity 
            key={animal.id}
            style={styles.animalButton}
          >
            <MaterialCommunityIcons 
              name={animal.icon as any} 
              size={28} 
              color="#228B22" 
              style={styles.icon} 
            />
            <Text style={styles.animalText}>{animal.nome}</Text>
          </TouchableOpacity>
        ))}
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
  // Mantenha o restante dos seus estilos...
  content: {
    padding: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 20,
    textAlign: "center",
  },
  animalButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  animalText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
  icon: {
    marginRight: 10,
  },
});

export default EscolherPedido;