import axios from 'axios'
import { API_URL } from './API_URL'


export const allServices = async () => {
    
    try {
      const response = await axios.get(`${API_URL.url}/api/demandes/services/list`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data; // Retourne les données de la réponse de l'API
    } catch (error) {
      console.error('Error getting services:', error);
      throw error; // Lancer l'erreur pour la capturer dans le composant
    }
  };