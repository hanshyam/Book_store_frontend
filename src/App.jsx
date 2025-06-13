import "./App.css";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Book from "./pages/Book.jsx";
import BookstoreAdmin from "./pages/BookStoreAdmin.jsx";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/search/book" element={<SearchPage />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/admin" element={<BookstoreAdmin />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
