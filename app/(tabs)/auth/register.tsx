import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Link, router, useFocusEffect } from 'expo-router';
import { TextInputMask } from 'react-native-masked-text';
import { registerUser } from '@/services/authService';

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
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.replace('/auth/login');
    } else {
      Alert.alert('Erro', result.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              {/** Nome Completo */}
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999"
                onChangeText={handleChange('nomeCompleto')}
                onBlur={handleBlur('nomeCompleto')}
                value={values.nomeCompleto}
              />
              {touched.nomeCompleto && errors.nomeCompleto && (
                <Text style={styles.errorText}>{errors.nomeCompleto}</Text>
              )}

              {/** CPF com máscara */}
              <Text style={styles.label}>CPF</Text>
              <TextInputMask
                style={styles.input}
                placeholder="Digite seu CPF"
                placeholderTextColor="#999"
                type={'cpf'}
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                value={values.cpf}
                keyboardType="numeric"
              />
              {touched.cpf && errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

              {/** Telefone com máscara */}
              <Text style={styles.label}>Telefone</Text>
              <TextInputMask
                style={styles.input}
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
              {touched.telefone && errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}

              {/** Data de Nascimento */}
              <Text style={styles.label}>Data de Nascimento</Text>
              <View style={styles.dateContainer}>
                <TextInputMask
                  style={[styles.input, styles.dateInput]}
                  placeholder="Digite sua data de nascimento"
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
              </View>
              {touched.dataNascimento && errors.dataNascimento && (
                <Text style={styles.errorText}>{errors.dataNascimento}</Text>
              )}

              {/** E-mail */}
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              {/** Senha */}
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                secureTextEntry
              />
              {touched.senha && errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

              {/** Confirmar Senha */}
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
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

              {/** Botão de Cadastro */}
              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

              {/** Link para Login */}
              <Link href="/auth/login">
                <Text style={styles.textLink}>Já tem uma conta? <Text style={styles.link}>Faça login</Text></Text>
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingVertical: 20,
  },
  titleContainer: {
    top: 30,
    backgroundColor: '#228B22',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 50,
    minWidth: 250,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    width: '80%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  dateContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 5,
  },
  dateInput: {
    flex: 1,
    paddingRight: 40,
  },
  calendarIcon: {
    position: 'absolute',
    right: 15,
  },
  button: {
    backgroundColor: '#228B22',
    padding: 12,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  textLink: {
    marginTop: 15,
  },
  link: {
    color: '#228B22',
    fontWeight: 'bold',
  },
});