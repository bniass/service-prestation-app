import apiClient from './apiClient';
import { getAccessToken, setAccessToken, setRefreshToken, clearTokens } from './authUtils';

// Fonction pour se connecter
export const loginUser = async ({ username, password }) => {
  try {
    // Envoi de la requête de connexion pour récupérer le token
    const response = await apiClient.post('/users/login', {
      username,
      password,
    });

    // Récupération du token et du refresh token de la réponse
    const { access_token, refresh_token } = response.data;
    //console.log(access_token)
    //console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§')
    //console.log(refresh_token)
    // Sauvegarde des tokens dans le localStorage ou autre mécanisme de stockage sécurisé
    setAccessToken(access_token);
    setRefreshToken(refresh_token);

    // Retourne les tokens ou d'autres informations si nécessaire
    return { access_token, refresh_token };
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // On lance l'erreur pour la capturer dans le composant
  }
};

// Fonction pour rafraîchir le token
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL.url}/auth/refresh`, {
      refresh_token: refreshToken,
    });

    // Récupération des nouveaux tokens
    const { access_token, refresh_token } = response.data;

    // Mise à jour des tokens dans le localStorage ou autre mécanisme de stockage sécurisé
    setAccessToken(access_token);
    setRefreshToken(refresh_token);

    return { access_token, refresh_token };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; // On lance l'erreur si le rafraîchissement échoue
  }
};

// Fonction pour déconnecter l'utilisateur
export const logoutUser = () => {
  // Supprimer les tokens du stockage local ou autre stockage
  clearTokens();
  
  // Vous pouvez aussi rediriger l'utilisateur vers la page de login après la déconnexion
  window.location.href = '/login';
};

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
  const token = getAccessToken();
  return !!token; // Retourne true si un token est présent
};
