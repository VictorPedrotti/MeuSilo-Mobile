import axios from 'axios';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

const API_BASE_URL = 'http://localhost:3000';

interface dadosSilo {
    nome: string,
    capacidade: Double,
    armazenado: Double,
    usuario_id: number,
    cultura_id: number
}

export const cadastrarSilo = async (siloData: dadosSilo) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/silos`, siloData);
  
      return {
        nome: response.data.nome,
        success: true
      };
    } catch (error) {
      let errorMessage = 'Erro ao cadastro novo silo';
      
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