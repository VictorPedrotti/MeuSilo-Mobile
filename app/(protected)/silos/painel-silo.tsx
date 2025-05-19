import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, Platform, ActivityIndicator, Alert } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGuard from "@/components/AuthGuard";
import { router } from "expo-router";
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useFocusEffect } from "@react-navigation/native";

interface SiloItem {
  id: number;
  nome: string;
  capacidade: number;
  armazenado: number;
  cultura_id?: number;
  usuario_id: number;
}

interface UserData {
  id: number;
  nome: string;
}

const PainelSilo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userSilos, setUserSilos] = useState<SiloItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const carouselRef = useRef<ICarouselInstance>(null);
  const { width } = Dimensions.get("window");
  const SafeCarousel = Carousel as any;

  const loadSilos = async () => {
    try {
      setIsLoading(true);
      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) throw new Error('Dados do usuário não encontrados');

      const userData: UserData = JSON.parse(userDataString);
      setUserData(userData);

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      const response = await fetch(`http://localhost:3000/usuarios/${userData.id}/silos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erro ao carregar silos');

      const silos: SiloItem[] = await response.json();
      setUserSilos(silos);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os silos');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadSilos();
      return () => {};
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['token', 'userData']);
    router.replace('/(auth)/login');
  };

  const renderItem = ({ item }: { item: SiloItem }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.siloName}>{item.nome}</Text>
      <View style={styles.card}>
        <Image 
          source={require("../../../assets/images/silo1.png")} 
          style={styles.siloImage} 
          resizeMode="contain" 
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#228B22" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Erro ao carregar dados do usuário</Text>
      </View>
    );
  }

  return (
    <AuthGuard>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={28} color="#228B22" />
          </View>
          <Text style={styles.welcomeText}>BEM-VINDO, {userData.nome.toUpperCase()}!</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.settingsButton}>
              <MaterialCommunityIcons name="cog" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <MaterialCommunityIcons name="logout" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Carrossel de Silos */}
        <View style={styles.carouselContainer}>
          {userSilos.length > 0 ? (
            <SafeCarousel
              loop={false}
              width={width}
              height={350}
              data={userSilos}
              renderItem={renderItem}
              onSnapToItem={setActiveIndex}
              ref={carouselRef}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
            />
          ) : (
            <View style={styles.noSilosContainer}>
              <Text style={styles.noSilosText}>Nenhum silo cadastrado</Text>
              <TouchableOpacity 
                style={styles.registerButton} 
                onPress={() => router.push('/silos/formulario-silo')}
              >
                <Text style={styles.buttonText}>Cadastrar Primeiro Silo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Botões de Ação */}
        {userSilos.length > 0 && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.verifyButton}
              //onPress={() => router.push(`/silos/verificar/${userSilos[activeIndex].id}`)}
            >
              <Text style={styles.buttonText}>Verificar Silo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={() => router.push('/silos/formulario-silo')}
            >
              <Text style={styles.buttonText}>Cadastrar Novo Silo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </AuthGuard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#228B22",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  welcomeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  settingsButton: {
    padding: 5,
    marginLeft: 10
  },
  logoutButton: {
    padding: 5,
    marginLeft: 10
  },
  carouselContainer: {
    marginBottom: 30,
    width: '100%'
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  siloName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#228B22',
    marginBottom: 10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '90%',
    height: 300,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  siloImage: {
    width: '100%',
    height: '100%',
    resizeMode: "contain",
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  verifyButton: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  registerButton: {
    backgroundColor: "#228B22",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noSilosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  noSilosText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20
  },
  errorText: {
    fontSize: 18,
    color: 'red'
  }
});

export default PainelSilo;