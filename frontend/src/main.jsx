import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store";
import { Provider } from "react-redux";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AdminHomeScreen from "./screens/adminScreens/AdminHomeScreen.jsx";
import { UserManagementScreen } from "./screens/adminScreens/UserManagementScreen.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import AdminLoginScreen from "./screens/adminScreens/AdminLoginScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index={true} path="/" element={<HomeScreen></HomeScreen>}></Route>
      <Route
        index={true}
        path="/login"
        element={<LoginScreen></LoginScreen>}
      ></Route>
      <Route
        index={true}
        path="/register"
        element={<RegisterScreen></RegisterScreen>}
      ></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>


      {/* **************admin*************************** */}

      <Route path="/admin" element={<AdminHomeScreen />} />
      
      <Route path="/admin/login" element={<AdminLoginScreen/>} />

        {/* Private Routes */}
       
      <Route path="/admin/get-user" element={<UserManagementScreen/>} />
      
      {/* Private Routes */}



    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  </Provider>
);
