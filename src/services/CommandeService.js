import apiClient from './apiClient';



export const allServices = async () => {
    
    try {
      const response = await apiClient.get('/api/demandes/services/list', {
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

  // Ajouter un nouveau service
export const addService = async (service) => {
  try {
    const response = await apiClient.post('/api/demandes/services', service);
    return response.data; // Retourne les données de la réponse de l'API
  } catch (error) {
    console.error('Error saving service:', error);
    throw error; // Lancer l'erreur pour la capturer dans le composant
  }
};

// Mettre à jour un service
export const updateService = async (service) => {
  try {
    const response = await apiClient.put('/api/demandes/services', service);
    return response.data; // Retourne les données de la réponse de l'API
  } catch (error) {
    console.error('Error updating service:', error);
    throw error; // Lancer l'erreur pour la capturer dans le composant
  }
};

// Supprimer un service
export const deleteService = async (id) => {
  try {
    const response = await apiClient.delete(`/api/demandes/services/${id}`);
    return response.data; // Retourne les données de la réponse de l'API
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error; // Lancer l'erreur pour la capturer dans le composant
  }
};
