import { useCallback, useEffect, useState } from "react";

let logoutTimer;  
export const useAuth = ()=>{
    const [token, setToken] = useState();
  const [tokenExpirationDate, SetTokenExprationData] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expiration_Date) => {
    setToken(token);
    const tokenExpirationDate = expiration_Date || new Date(new Date().getDate() + 1000*60*60);
    SetTokenExprationData(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({userId: uid, token: token, expiration: tokenExpirationDate.toISOString()}))
    setUserId(uid);

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    SetTokenExprationData(null);
    setUserId(null);
    localStorage.removeItem('userData')
  }, []);

  useEffect(()=>{
    if(token && tokenExpirationDate){
      const reaminingTime = tokenExpirationDate.getTime() - new Date().getTime();
     logoutTimer = setTimeout(logout,reaminingTime)
    }else{
      clearTimeout(logoutTimer)
    }
  },[token, logout, tokenExpirationDate])

  useEffect(()=>{
    const storeData = localStorage.getItem("userData");
    if(storeData.userId && storeData.token && new Date(storeData.expiration) > new Date()){
      login(storeData.userId, storeData.token, new Date(storeData.expiration))
    }
  },[login])
  return {token, login, logout, userId}
}