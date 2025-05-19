import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';
import { listaCulturas } from '@/services/culturaService';

const FormularioSilo = () => {
  const { userData } = useAuth();

  const [formData, setFormData] = useState({
    nome: '',
    capacidade: '',
    armazenado: '',
    cultura_id: ''
  });

  const [culturas, setCulturas] = useState<Array<{ id: string, descricao: string }>>([]);
  const [loadingCulturas, setLoadingCulturas] = useState(true);

  const [errors, setErrors] = useState({
    nome: '',
    capacidade: '',
    armazenado: '',
    cultura_id: ''
  });

  useEffect(() => {
    const carregarCulturas = async () => {
      try {
        const resultado = await listaCulturas();
        
        if (resultado.success) {
          setCulturas(resultado.culturas);
        } else {
          Alert.alert('Erro', resultado.message || 'Erro ao carregar culturas');
        }
      } catch (error) {
        console.error('Erro ao carregar culturas:', error);
        Alert.alert('Erro', 'Não foi possível carregar as culturas');
      } finally {
        setLoadingCulturas(false);
      }
    };

    carregarCulturas();
  }, []);

  // Função para validar números decimais
  const validateNumber = (value: string) => {
    return /^\d*\.?\d*$/.test(value); // Permite números com ponto decimal
  };

  const validateField = (name: string, value: string) => {
    let error = '';

    if (!value.trim()) {
      error = 'Campo obrigatório';
    } else if ((name === 'capacidade' || name === 'armazenado') && !validateNumber(value)) {
      error = 'Digite um número válido';
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (name: string, value: string) => {
    // Para campos numéricos, remove caracteres não numéricos exceto ponto decimal
    if (name === 'capacidade' || name === 'armazenado') {
      value = value.replace(/[^0-9.]/g, '');
      // Garante que só tenha um ponto decimal
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    // Validação em tempo real para campos numéricos
    if ((name === 'capacidade' || name === 'armazenado') && value) {
      validateField(name, value);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token || !userData?.id) {
        Alert.alert('Erro', 'Faça login para cadastrar um silo');
        return;
      }

      // Converter valores numéricos
      const capacidade = parseFloat(formData.capacidade);
      const armazenado = parseFloat(formData.armazenado);

      // Validar valores
      if (isNaN(capacidade)) {
        Alert.alert('Erro', 'Capacidade inválida');
        return;
      }

      if (isNaN(armazenado)) {
        Alert.alert('Erro', 'Quantidade armazenada inválida');
        return;
      }

      if (armazenado > capacidade) {
        Alert.alert('Erro', 'Armazenado não pode ser maior que a capacidade');
        return;
      }

      if (!formData.cultura_id) {
        Alert.alert('Erro', 'Selecione uma cultura');
        return;
      }

      const payload = {
        nome: formData.nome.trim(),
        capacidade,
        armazenado,
        cultura_id: Number(formData.cultura_id),
        usuario_id: userData.id
      };

      console.log(payload);

      const response = await fetch('http://localhost:3000/silos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        // Mostrar mensagem mais detalhada do backend
        throw new Error(data.erro || data.message || 'Erro ao cadastrar silo');
      }

      Alert.alert('Sucesso', 'Silo cadastrado com sucesso!');
      router.back();
    } catch (error: any) {
      console.error('Erro completo:', error);
      Alert.alert('Erro', error.message || 'Erro ao conectar com o servidor');
    }
  };

  return (
    <View style={styles.container}>
      {/* Menu Superior - Estilo idêntico ao anterior */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CADASTRAR SILO</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          {/* Campo Nome */}
          <Text style={styles.label}>Nome do Silo</Text>
          <TextInput
            style={[styles.input, errors.nome ? styles.inputError : null]}
            placeholder="Digite o nome do silo"
            placeholderTextColor="#999"
            value={formData.nome}
            onChangeText={(text) => handleChange('nome', text)}
            onBlur={() => validateField('nome', formData.nome)}
          />
          {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}

          {/* Campo Capacidade (agora aceita decimais) */}
          <Text style={styles.label}>Capacidade (toneladas)</Text>
          <TextInput
            style={[styles.input, errors.capacidade ? styles.inputError : null]}
            placeholder="Ex: 50.5"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
            value={formData.capacidade}
            onChangeText={(text) => handleChange('capacidade', text)}
            onBlur={() => validateField('capacidade', formData.capacidade)}
          />
          {errors.capacidade ? <Text style={styles.errorText}>{errors.capacidade}</Text> : null}

          {/* Campo Armazenado (agora aceita decimais) */}
          <Text style={styles.label}>Armazenado (toneladas)</Text>
          <TextInput
            style={[styles.input, errors.armazenado ? styles.inputError : null]}
            placeholder="Ex: 25.75"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
            value={formData.armazenado}
            onChangeText={(text) => handleChange('armazenado', text)}
            onBlur={() => validateField('armazenado', formData.armazenado)}
          />
          {errors.armazenado ? <Text style={styles.errorText}>{errors.armazenado}</Text> : null}

          {/* Campo Cultura */}
         <Text style={styles.label}>Cultura</Text>
          <View style={[styles.pickerContainer, errors.cultura_id ? styles.inputError : null]}>
            {loadingCulturas ? (
              <Text style={styles.loadingText}>Carregando culturas...</Text>
            ) : (
              <Picker
                selectedValue={formData.cultura_id}
                onValueChange={(itemValue) => handleChange('cultura_id', itemValue)}
                style={styles.picker}
                onBlur={() => validateField('cultura_id', formData.cultura_id)}
              >
                <Picker.Item label="Selecione uma cultura" value="" />
                {culturas.map((cultura) => (
                  <Picker.Item 
                    key={cultura.id} 
                    label={cultura.descricao} 
                    value={cultura.id} 
                  />
                ))}
              </Picker>
            )}
          </View>
          {errors.cultura_id ? <Text style={styles.errorText}>{errors.cultura_id}</Text> : null}

          {/* Botão de Salvar */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>SALVAR SILO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Estilos mantidos exatamente como antes
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
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 30,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    width: '80%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#E74C3C',
    backgroundColor: '#FDEDEC',
  },
  pickerContainer: {
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  button: {
    backgroundColor: '#228B22',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
   loadingText: {
    padding: 15,
    textAlign: 'center',
    color: '#666',
  },
});

export default FormularioSilo;