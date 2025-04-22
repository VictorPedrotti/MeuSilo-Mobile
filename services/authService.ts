import axios from 'axios';
// @ts-ignore
import { encode } from 'base-64';

import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = 'http://localhost:3000';

interface RegisterData {
  nome: string;  
  cpf: string;
  telefone: string;
  data_nascimento: string;
  email: string;
  senha: string;
}

interface LoginData {
  email: string;
  senha: string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cadastro`, userData);
    
    return {
      user: response.data.user,
      token: response.data.token,
      success: true
    };
  } catch (error) {
    let errorMessage = 'Erro ao realizar o cadastro';
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Sem resposta do servidor';
      }
    }
    
    return {
      success: false,
      message: errorMessage
    };
  }
};

export const loginUser = async ({ email, senha }: LoginData) => {
  const hash = encode(`${email}:${senha}`);

  try {
    const response = await axios.get(`${API_BASE_URL}/login`, {
      headers: {
        Authorization: `Basic ${hash}`,
      },
    });

    await AsyncStorage.setItem('token', response.data.token);

    return {
      user: response.data.user,
      token: response.data.token,
      success: true,
    };
  } catch (error) {
    let errorMessage = 'Erro ao realizar login';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.mensagem || errorMessage;
      } else if (error.request) {
        errorMessage = 'Sem resposta do servidor';
      }
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};