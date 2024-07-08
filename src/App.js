import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import { Provider } from 'react-redux';
import store from './app/store';
import Cart from './Components/Cart';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
