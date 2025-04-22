import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Link, router, useFocusEffect } from 'expo-router';
import { TextInputMask } from 'react-native-masked-text';
import { registerUser } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';

interface FormValues {
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

const validationSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required('Nome completo é obrigatório'),
  cpf: Yup.string()
    .required('CPF é obrigatório')
    .transform(value => value ? value.replace(/\D/g, '') : '')
    .length(11, 'CPF deve ter exatamente 11 dígitos'),
  telefone: Yup.string()
    .required('Telefone é obrigatório')
    .transform(value => value ? value.replace(/\D/g, '') : '')
    .length(11, 'Telefone deve ter exatamente 11 dígitos'),
  dataNascimento: Yup.string()
    .required('Data de nascimento é obrigatória')
    .transform(value => value ? value.replace(/\D/g, '') : '')
    .test('len', 'Data completa requerida', val => val?.length === 8),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: Yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
});

export default function RegisterScreen() {
  const formikRef = React.useRef<FormikProps<FormValues>>(null);
  const { login } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        formikRef.current?.resetForm();
      };
    }, [])
  );

  const formatDateToISO = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const cleanValues = {
        nome: values.nomeCompleto,
        cpf: values.cpf.replace(/\D/g, ''),
        telefone: values.telefone.replace(/\D/g, ''),
        data_nascimento: formatDateToISO(values.dataNascimento),
        email: values.email,
        senha: values.senha
      };

      const result = await registerUser(cleanValues);

      if (result.success) {
        await login(result.token, result.user);
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao cadastrar');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>REGISTRE-SE</Text>
        </View>

        <Formik
          innerRef={formikRef}
          initialValues={{
            nomeCompleto: '',
            cpf: '',
            telefone: '',
            dataNascimento: '',
            email: '',
            senha: '',
            confirmarSenha: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              {/* Nome Completo */}
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={[styles.input, touched.nomeCompleto && errors.nomeCompleto ? styles.inputError : null]}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999"
                onChangeText={handleChange('nomeCompleto')}
                onBlur={handleBlur('nomeCompleto')}
                value={values.nomeCompleto}
              />
              {touched.nomeCompleto && errors.nomeCompleto && (
                <Text style={styles.errorText}>{errors.nomeCompleto}</Text>
              )}

              {/* CPF */}
              <Text style={styles.label}>CPF</Text>
              <TextInputMask
                style={[styles.input, touched.cpf && errors.cpf ? styles.inputError : null]}
                placeholder="Digite seu CPF"
                placeholderTextColor="#999"
                type={'cpf'}
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                value={values.cpf}
                keyboardType="numeric"
              />
              {touched.cpf && errors.cpf && (
                <Text style={styles.errorText}>{errors.cpf}</Text>
              )}

              {/* Telefone */}
              <Text style={styles.label}>Telefone</Text>
              <TextInputMask
                style={[styles.input, touched.telefone && errors.telefone ? styles.inputError : null]}
                placeholder="Digite seu telefone"
                placeholderTextColor="#999"
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                value={values.telefone}
                keyboardType="phone-pad"
              />
              {touched.telefone && errors.telefone && (
                <Text style={styles.errorText}>{errors.telefone}</Text>
              )}

              {/* Data de Nascimento */}
              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInputMask
                style={[styles.input, touched.dataNascimento && errors.dataNascimento ? styles.inputError : null]}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }}
                onChangeText={handleChange('dataNascimento')}
                onBlur={handleBlur('dataNascimento')}
                value={values.dataNascimento}
                keyboardType="numeric"
              />
              {touched.dataNascimento && errors.dataNascimento && (
                <Text style={styles.errorText}>{errors.dataNascimento}</Text>
              )}

              {/* Email */}
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Senha */}
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={[styles.input, touched.senha && errors.senha ? styles.inputError : null]}
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                secureTextEntry
              />
              {touched.senha && errors.senha && (
                <Text style={styles.errorText}>{errors.senha}</Text>
              )}

              {/* Confirmar Senha */}
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                style={[styles.input, touched.confirmarSenha && errors.confirmarSenha ? styles.inputError : null]}
                placeholder="Confirme sua senha"
                placeholderTextColor="#999"
                onChangeText={handleChange('confirmarSenha')}
                onBlur={handleBlur('confirmarSenha')}
                value={values.confirmarSenha}
                secureTextEntry
              />
              {touched.confirmarSenha && errors.confirmarSenha && (
                <Text style={styles.errorText}>{errors.confirmarSenha}</Text>
              )}

              {/* Botão de Cadastro */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

              {/* Link para Login */}
              <Link href="/(auth)/login" style={styles.linkContainer}>
                <Text style={styles.textLink}>Já tem uma conta? <Text style={styles.linkText}>Faça login</Text></Text>
              </Link>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F2F2F2',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  titleContainer: {
    backgroundColor: '#228B22',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  linkContainer: {
    marginTop: 15,
  },
  textLink: {
    fontSize: 14,
    color: '#34495E',
  },
  linkText: {
    color: '#228B22',
    fontWeight: 'bold',
  },
});