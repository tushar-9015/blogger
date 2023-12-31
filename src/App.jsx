import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/slices/authSlice";
import toast from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer, Loader } from "./components";
import { getAllPost } from "./store/slices/postSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return !loading ? (
    <div className="min-h-screen w-full flex flex-wrap content-between">
      <div className="w-full block text-white">
        <Header />
        <main className="min-h-[90vh] text-black">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="h-screen">
      <Loader height={"90vh"} />
    </div>
  );
}

export default App;
