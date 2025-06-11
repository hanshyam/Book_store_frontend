import './App.css';
import Home from './pages/Home.jsx';
import SearchPage from './pages/searchPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout.jsx';
import Book from './pages/book.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/search/book' element={<SearchPage />} />
          <Route path='/book' element={<Book/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
