import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRE-SE</Text>

      <TextInput style={styles.input} placeholder="Nome completo" />
      <TextInput style={styles.input} placeholder="CPF" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Telefone / Celular" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Data de Nascimento" />
      <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar Senha" secureTextEntry />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F2F2F2" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", backgroundColor: "green", padding: 20, borderRadius: 10, marginBottom: 20 },
  input: { width: "80%", padding: 10, borderRadius: 5, backgroundColor: "#fff", marginBottom: 10 },
  button: { backgroundColor: "green", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});