import axios from 'axios';
import { API_URL } from './API_URL';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from './authUtils'; // Utilitaires pour gérer les tokens

// Créer une instance axios
const apiClient = axios.create({
  baseURL: API_URL.url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes - ajouter le token dans les en-têtes
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses - gérer l'expiration du token
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    //console.log(error)
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Si le status est 401, c'est probablement parce que le token a expiré
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          // Appeler l'API pour rafraîchir le token
          const response = await refreshAccessToken(refreshToken);
          const newAccessToken = response.data.access_token;
          const newRefreshToken = response.data.refresh_token;

          // Mettre à jour les tokens dans localStorage ou autre mécanisme de stockage
          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          // Ajouter le nouveau token aux en-têtes de la requête
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // Réessayer la requête initiale avec le nouveau token
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error refreshing token", refreshError);
        // Si le refresh échoue, rediriger l'utilisateur vers la page de login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Fonction pour rafraîchir le token
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL.url}/users/refreshtoken`, {
      refresh_token: refreshToken,
    });

    return response; // Retourner la réponse avec les nouveaux tokens
  } catch (error) {
    throw error;
  }
};

// Exports de l'apiClient pour les requêtes API
export default apiClient;
