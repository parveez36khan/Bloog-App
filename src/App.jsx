import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header"
import Footer from "./components/footer/footer"
import authService from './appwrite/auth'
import Logo from "./components/Logo"
import { useNavigate } from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const checkSession = async () => {
          const user = await authService.getCurrentUser();
          if (!user) {
              navigate('/login');
          } else {
              setIsLoggedIn(true);
          }
      };

      checkSession();
  }, [navigate]);

 
    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) dispatch(login({ userData }));
                else dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, [dispatch]);
    useEffect(() => {
        authService.logout();  // Call logout on component mount
    }, []);

    return !loading ? (
      <div className="min-h-screen flex flex-wrap content-between bg-white-400">
          <div className="w-full block">
              <Header />
              <main>
                  <Outlet />
              </main>
          </div>
          <div className="w-full block">
              <Footer />
          </div>
      </div>
  ) : null;
}

export default App