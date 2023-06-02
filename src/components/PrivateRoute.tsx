import {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext.jsx';

export const PrivateRoute = () => {
  const { user }: {user} = useContext(AuthContext);
  return user ? <Outlet /> :  <Navigate to="/sign-in" />;
};
