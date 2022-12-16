import apiClient from '../api/apiClient';

class ExamplesService {
  getExamples = () => apiClient().get('/examples');
}

export default new ExamplesService();
