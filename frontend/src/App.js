import './App.css';
import Header from './components/Header';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Parameteres from './components/Parameteres';
import { useSelector } from 'react-redux';
import ChartPage from './components/ChartPage';
import { getExamples } from './apiOperations/example';
import { useEffect } from 'react';

function App() {
  const { display } = useSelector((state) => state.displayReducer);
  useEffect(() => {
    getExamples();
  }, []);
  return (
    <div className="App">
      <Header />
      {display === 'form' ? <Parameteres /> : <ChartPage />}
    </div>
  );
}

export default App;
