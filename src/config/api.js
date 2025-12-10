// API Configuration
// To change the API endpoint, simply update the API_BASE_URL below
export const API_BASE_URL = 'https://api-memegen.moca.qwellco.de';

export const API_ENDPOINTS = {
  templates: `${API_BASE_URL}/templates`,
  images: `${API_BASE_URL}/images`,
  customImage: (templateId, textPaths) => `${API_BASE_URL}/images/${templateId}/${textPaths}`,
};

