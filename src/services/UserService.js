import axios from 'axios'
import { API_URL } from './API_URL'


export const loginUser = async ({username, password}) => {
    try {
      const response = await axios.post(`${API_URL.url}/users/login`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //console.log(response.data)
      const token = response.data.access_token
;

      // Ajout du token dans les en-têtes pour les prochaines requêtes
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
      return response.data; // Retourne les données de la réponse de l'API
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Lancer l'erreur pour la capturer dans le composant
    }
  };