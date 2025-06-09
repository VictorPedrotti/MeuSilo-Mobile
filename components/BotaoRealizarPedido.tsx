import { router } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.70; // 80% da tela
const buttonHeight = buttonWidth * (60 / 210); // mantém proporção original

export default function PedidoButton() {
  return (
    <TouchableOpacity style={[styles.button, { width: buttonWidth, height: buttonHeight }]}
                      onPress={() => router.push('/pedidos/escolher-pedido')}>
      <Image
        source={require('../assets/images/delivery.png')}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Realizar</Text>
        <Text style={styles.text}>pedido!</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff7a00',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
  },
});