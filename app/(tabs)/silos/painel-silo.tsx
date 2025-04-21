import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import Carousel from 'react-native-reanimated-carousel';

interface SiloItem {
  id: number;
  image: any; 
}

const silos: SiloItem[] = [
  { id: 1, image: require("../../../assets/images/silo1.png") },
  { id: 2, image: require("../../../assets/images/silo2.png") },
  { id: 3, image: require("../../../assets/images/silo3.png") },
];

const PainelSilo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const carouselRef = useRef<any>(null);
  const { width } = Dimensions.get("window");

  // Função para renderizar cada item do carrossel
  const renderItem = ({ item }: { item: SiloItem }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.siloImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.welcomeText}>SEJA BEM-VINDO, AFONSO!</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Carrossel de Silos */}
      <Carousel
        loop
        width={width}
        height={200}
        data={silos}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />

      {/* Botões */}
      <TouchableOpacity style={styles.verifyButton}>
        <Text style={styles.verifyText}>Verificar Silo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>Cadastrar silo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#228B22",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  welcomeText: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  settingsButton: {
    padding: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  siloImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  verifyButton: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "70%",
    alignItems: "center",
  },
  verifyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#228B22",
    padding: 15,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PainelSilo;