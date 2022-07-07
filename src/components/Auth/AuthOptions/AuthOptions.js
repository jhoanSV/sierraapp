import React from 'react';
import { Button } from 'semantic-ui-react';
import './AuthOptions.scss';

export default function authOptions(props) {
  const {setSelectedForm} = props;

  return (
    <div className='auth-options'>
      <h2>Tus aliados estrategicos</h2>
      <Button className='register' onClick={() => setSelectedForm("register")}>
        Registrate gratis
      </Button>
      <Button className='login' onClick={()=> setSelectedForm("login")}>
        iniciar sesion
      </Button>
    </div>
  )
}
