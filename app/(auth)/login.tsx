import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "@/services/authService";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    
    if (!usuario.trim() || !senha.trim()) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    const result = await loginUser({ email: usuario, senha });
    setLoading(false);

    if (result.success) {
      await login(result.token, result.user);
    } else {
      setError(result.message || "Usuário ou senha inválidos");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>MEU SILO</Text>
      </View>

      {/* Exibe mensagem de erro se existir */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Usuário</Text>
      <TextInput 
        style={[styles.input, error ? styles.inputError : null]} 
        placeholder="Digite seu usuário" 
        placeholderTextColor="#999"
        value={usuario}
        onChangeText={(text) => {
          setUsuario(text);
          setError(""); 
        }}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput 
        style={[styles.input, error ? styles.inputError : null]} 
        placeholder="Digite sua senha" 
        placeholderTextColor="#999"
        secureTextEntry 
        value={senha}
        onChangeText={(text) => {
          setSenha(text);
          setError(""); 
        }}
      />

      <Text style={styles.forgotPassword}>Esqueci senha</Text>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.registerText}>Não tem cadastro? <Text style={styles.link}>Cadastre-se</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Entrando..." : "Entrar"}</Text>
      </TouchableOpacity>
    </View>
  ); 
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#F2F2F2" 
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
  
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#fff" 
  },
  
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  
  input: { 
    width: "80%", 
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff", 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  
  inputError: {
    borderColor: '#E74C3C',
    backgroundColor: '#FDEDEC',
  },
  
  errorText: {
    color: '#E74C3C',
    marginBottom: 15,
    textAlign: 'center',
    width: '80%',
    fontSize: 14,
    fontWeight: '500',
  },
  
  fieldError: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
    width: '80%',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  
  forgotPassword: { 
    fontSize: 14, 
    color: "#7F8C8D", 
    marginBottom: 20,
    alignSelf: 'flex-end',
    marginRight: '10%',
  },
  
  registerText: { 
    fontSize: 14, 
    color: '#34495E',
    marginBottom: 20,
  },
  
  link: { 
    color: "#228B22", 
    fontWeight: "bold" 
  },
  
  button: { 
    backgroundColor: "#228B22", 
    padding: 15, 
    borderRadius: 8, 
    width: "80%", 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  
  buttonText: { 
    color: "white", 
    fontWeight: "bold",
    fontSize: 16,
  },
  
  buttonDisabled: {
    backgroundColor: "#BDC3C7",
  },
});