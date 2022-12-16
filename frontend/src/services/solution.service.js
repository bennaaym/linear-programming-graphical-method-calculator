import apiClient from '../api/apiClient';

class SolutionService {
  solve = (body) => apiClient().post('/', body);
}

export default new SolutionService();
