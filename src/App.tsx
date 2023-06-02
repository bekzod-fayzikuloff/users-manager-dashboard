import './App.css'
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {UsersManager} from "./components/Users";
import {AuthProvider} from "./context/AuthContext.jsx"
import {PrivateRoute} from "./components/PrivateRoute";
import {UnblockedRoute} from "./components/UnblockedRoute";
import {NotFound} from "./components/NotFound";

export const App = () => {
  return (
    <>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<UnblockedRoute/>}>
            <Route path="/" element={<UsersManager/>}/>
            <Route path={"*"} element={<NotFound />}/>
          </Route>
        </Route>
        <Route path="/sign-in" element={<Login/>}/>
        <Route path="/sign-up" element={<Register/>}/>
      </Routes>
      </AuthProvider>
    </>
  )
}
