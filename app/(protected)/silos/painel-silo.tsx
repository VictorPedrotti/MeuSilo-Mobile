import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, Platform, ActivityIndicator } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGuard from "@/components/AuthGuard";
import { router } from "expo-router";
import type { ICarouselInstance } from 'react-native-reanimated-carousel';

interface SiloItem {
  id: number;
  image: any;
}

interface UserData {
  nome: string;
}

const silos: SiloItem[] = [
  { id: 1, image: require("../../../assets/images/silo1.png") },
  { id: 2, image: require("../../../assets/images/silo2.png") },
  { id: 3, image: require("../../../assets/images/silo3.png") },
];

const PainelSilo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [userName, setUserName] = useState<string>('Carregando...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const carouselRef = useRef<ICarouselInstance>(null);
  const { width } = Dimensions.get("window");
  const SafeCarousel = Carousel as any;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');

        if (userDataString) {
          const userData: UserData = JSON.parse(userDataString);
          setUserName(userData.nome);
        } else {
          setUserName('Usuário');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setUserName('Erro ao carregar');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['token', 'userData']);
    router.replace('/(auth)/login');
  };

  const renderItem = ({ item }: { item: SiloItem }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.siloImage} resizeMode="contain" />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#228B22" />
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
          <Text style={styles.welcomeText}>BEM-VINDO, {userName.toUpperCase()}!</Text>
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
          <SafeCarousel
            loop
            width={width}
            height={300}
            data={silos}
            renderItem={renderItem}
            onSnapToItem={setActiveIndex}
            ref={carouselRef}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
          />
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.verifyButton} /*onPress={() => router.push('/silos/verificar')} */>
            <Text style={styles.buttonText}>Verificar Silo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/silos/formulario-silo')} >
            <Text style={styles.buttonText}>Cadastrar Silo</Text>
          </TouchableOpacity>
        </View>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    marginHorizontal: 10,
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
});

export default PainelSilo;