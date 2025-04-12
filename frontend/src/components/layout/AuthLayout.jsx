import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,  } from 'react-router-dom';
import { getUserProfile } from '../../store/slices/userSlice';

const AuthLayout = ({children}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.loading);
   
  // console.log("userData", userData, loading, authStatus);
  
  useEffect(() => {
    if (userData === null && !loading ) {
      navigate("/login", { replace: true });
    }

  }, [userData, navigate, loading]);


  return children;
}

export default AuthLayout
