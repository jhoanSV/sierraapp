import React , { useState } from "react";
import firebase from "./utils/Firebase";
import "firebase/compat/auth";
import Auth from "./pages/Auth";


function App() {
  const [user, setUser]= useState(true);
  const [isLoading, setIsLoading] = useState(true);

   firebase.auth().onAuthStateChanged(currentUser => {
    if (!currentUser){
      setUser(null)
    } else {
      setUser(currentUser)
    }
    setIsLoading(false);
   });

   if (isLoading){
    return null;
   }

  return !user ? <Auth /> : <UserLogged/>;
}

function UserLogged(){
  
  const logout = () =>{
    firebase.auth().signOut();
  };

  return (
    <div
      style={{
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh"
      }}
      >
        <h1>Usuario Logueado</h1>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
  );
}
export default App;
