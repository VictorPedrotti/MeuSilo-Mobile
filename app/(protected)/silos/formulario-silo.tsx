import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const FormularioSilo = () => {
  const [formData, setFormData] = useState({
    nome: '',
    capacidade: '',
    armazenado: '',
    cultura: ''
  });
  const [errors, setErrors] = useState({
    nome: '',
    capacidade: '',
    armazenado: '',
    cultura: ''
  });

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

  const handleSubmit = () => {
    let isValid = true;
    
    // Validar todos os campos
    Object.entries(formData).forEach(([key, value]) => {
      const fieldValid = validateField(key, value);
      if (!fieldValid) isValid = false;
    });

    // Validação adicional para valores numéricos
    if (isValid && parseFloat(formData.armazenado) > parseFloat(formData.capacidade)) {
      setErrors(prev => ({
        ...prev,
        armazenado: 'Não pode ser maior que a capacidade'
      }));
      isValid = false;
    }

    if (!isValid) {
      Alert.alert('Erro', 'Verifique os campos destacados');
      return;
    }

    // Converter para double antes de enviar
    const dadosParaEnviar = {
      ...formData,
      capacidade: parseFloat(formData.capacidade),
      armazenado: parseFloat(formData.armazenado)
    };

    console.log('Dados validados:', dadosParaEnviar);
    Alert.alert('Sucesso', 'Silo cadastrado com sucesso!');
    router.back();
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
          <View style={[styles.pickerContainer, errors.cultura ? styles.inputError : null]}>
            <Picker
              selectedValue={formData.cultura}
              onValueChange={(itemValue) => handleChange('cultura', itemValue)}
              style={styles.picker}
              onBlur={() => validateField('cultura', formData.cultura)}
            >
              <Picker.Item label="Selecione uma cultura" value="" />
              <Picker.Item label="Milho" value="milho" />
              <Picker.Item label="Soja" value="soja" />
              <Picker.Item label="Trigo" value="trigo" />
            </Picker>
          </View>
          {errors.cultura ? <Text style={styles.errorText}>{errors.cultura}</Text> : null}

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
});

export default FormularioSilo;