import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "@/services/authService";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const result = await loginUser({ email: usuario, senha });
    setLoading(false);

    if (result.success) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.push('/silos/painel-silo');
    } else {
      Alert.alert("Erro", result.message || "Falha ao fazer login");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>MEU SILO</Text>
      </View>

      <Text style={styles.label}>Usuário</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Digite seu usuário" 
        placeholderTextColor="#999"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Digite sua senha" 
        placeholderTextColor="#999"
        secureTextEntry 
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.forgotPassword}>Esqueci senha</Text>

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.registerText}>Não tem cadastro? <Text style={styles.link}>Cadastre-se</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Entrando..." : "Entrar"}</Text>
      </TouchableOpacity>
    </View>
  ); 
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F2F2F2" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  input: { width: "80%", padding: 10, borderRadius: 5, backgroundColor: "#fff", marginBottom: 10 },
  forgotPassword: { fontSize: 12, color: "gray", marginBottom: 10 },
  registerText: { fontSize: 14 },
  link: { color: "green", fontWeight: "bold" },
  button: { backgroundColor: "green", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  titleContainer: {
    top: 30,
    backgroundColor: '#228B22',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
});