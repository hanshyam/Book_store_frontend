import axios from 'axios';
import { toast } from 'react-hot-toast';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const baseUrl = 'https://book-store-backend-m6sa.onrender.com/api';
axios.defaults.baseURL = baseUrl;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("bookToken"));
  const [searchSuggestion,setSearchSuggestion] = useState([]);

  // Automatically set token in axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Login Function
  const login = async (payload) => {
    try {
      const { data } = await axios.post('/auth/login', payload);
      if (data.success) {
        setUser(data.userData);
        setToken(data.token);
        localStorage.setItem("bookToken", data.token);
        toast.success("Login successful!");
      } else {
        toast.error("Login failed.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Register Function
  const register = async (payload) => {
    try {
      const { data } = await axios.post('/auth/register', payload);
      if (data.success) {
        toast.success("Registration successful! Logging you in...");
        await login({
          email: payload.email,
          password: payload.password,
        });
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("bookToken");
    toast.success("Logged out successfully.");
  };

//   const check user
 const checkUser = async () => {
  try {
    const { data } = await axios.get('/auth/check');
    if (data.success) {
      setUser(data.userData);
    } else {
      logout();
    }
  } catch (error) {
    console.error("Auth check failed:", error.message);
    logout();  // log out on 401
  }
};

// get search suggestion
const getSearchSuggestions = async () =>{
  try {
     const { data } = await axios.get('/search/');
    if(data.success){
      setSearchSuggestion(data.searchSuggessionData);
    }else{
      setSearchSuggestion([]);
    }
  }
  catch(error){
    toast.error(error.message);
  }
}


useEffect(() => {
  const localToken = localStorage.getItem("bookToken");
  if (localToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localToken}`;
    setToken(localToken);
    checkUser();
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}, []);

  const value = {
    user,
    token,
    axios,
    login,
    register,
    logout,
    searchSuggestion,
    getSearchSuggestions
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
