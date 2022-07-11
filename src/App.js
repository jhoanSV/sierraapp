import React , { useState } from "react";
//import { ToastContainer } from 'react-toastify';
import firebase from "./utils/Firebase";
import "firebase/compat/auth";
import Auth from "./pages/Auth";
import Firebase from "./utils/Firebase";
import LoggedLayout from "./layouts/LoggetLayout";

function App() {
  const [user, setUser]= useState(true);
  const [isLoading, setIsLoading] = useState(true);

   firebase.auth().onAuthStateChanged(currentUser => {
    console.log(currentUser);

    if(!currentUser?.emailVerified) {
      //firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);
    
    //console.log(currentUser);
   //
    //if (!currentUser){
    //  setUser(null)
    //} else {
    //  setUser(currentUser)
    //}
    //setIsLoading(false);
   });

   if (isLoading){
    return null;
   }

  return !user ? <Auth /> : <LoggedLayout user={user}/>;

  //return (
  //  <>
  //    {!user ? <Auth /> : <UserLogged/>}
  //
  //    <ToastContainer 
  //      position="top-center"
  //      autoClose={5000}
  //      hideProgressBar
  //      newestOnTop
  //      closeOnClick
  //      rtl={false}
  //      //pauseOnVisibilityChange
  //      draggable
  //      pauseOnHover={true}
  //
  //    />
  //
  //  </>
  //)
}


export default App;
