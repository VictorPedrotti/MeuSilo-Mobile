import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const listaCulturas = async() => {
    try {
        const response = await axios.get(`${API_BASE_URL}/culturas`);
        return {
          id: response.data.id,
          descricao: response.data.descricao,
          success: true
        };
      } catch (error) {
        let errorMessage = 'Erro ao retornar culturas';
        
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
}
