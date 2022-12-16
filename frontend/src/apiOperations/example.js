import examplesService from '../services/examples.service';

export const getExamples = async () => {
  await examplesService.getExamples().then((response) => {
    console.log(response);
    localStorage.setItem('examples', JSON.stringify(response.data.examples));
  });
};
