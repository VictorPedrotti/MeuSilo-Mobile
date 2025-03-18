import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEU SILO</Text>

      <TextInput style={styles.input} placeholder="Usuário" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

      <Text style={styles.forgotPassword}>Esqueci senha</Text>

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.registerText}>Não tem cadastro? <Text style={styles.link}>Cadastre-se</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F2F2F2" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", backgroundColor: "green", padding: 20, borderRadius: 10, marginBottom: 20 },
  input: { width: "80%", padding: 10, borderRadius: 5, backgroundColor: "#fff", marginBottom: 10 },
  forgotPassword: { fontSize: 12, color: "gray", marginBottom: 10 },
  registerText: { fontSize: 14 },
  link: { color: "green", fontWeight: "bold" },
  button: { backgroundColor: "green", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});