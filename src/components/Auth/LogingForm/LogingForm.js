import React, { useState } from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { validateEmail } from '../../../utils/Validations';
import firebase from '../../../utils/Firebase';
import 'firebase/compat/auth';


import './LoginForm.scss'

export default function LogingForm(props) {
  const { setSelectedForm }= props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);    

  const handlerShowPassword = () =>{
    setShowPassword(!showPassword)
  };

  const onChange = e =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit =()=>{
    setFormError({});
    let errors = {};
    let formOk = true;

    if(!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
     
    setFormError(errors);

    if(formOk) {
      setIsLoading(true);
      firebase.auth().signInWithEmailAndPassword(formData.email, formData.password ).then(response => {
        setUser(response.user);
        setUserActive(response.user.emailVerified);
        if(!response.user.emailVerified) {
          console.log('para poder hacer login, tienes que verificar la cuenta');
        }
      }).catch(err => {
        console.log(err);
        handlerErrors(err.code)
      }).finally(()=>{
        setIsLoading(false);
      })
    }
  };

  return (
    <div className='login-form'>
      <h1>Inicia sesión</h1>

      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Form.Input
            type='text'
            name='email'
            placeholder='Correo electronico'
            icon='mail outline'
            error={formError.email}
          />
          {formError.email && (
            <span className='error-text'>
              Introdusca un correo electronico valido
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Form.Input
            type={showPassword ? 'text': 'password'}
            name='password'
            placeholder='Contraseña'
            icon={
              showPassword ? (
                <Icon name ='eye slash outline' link onClick={handlerShowPassword}/>
                ) : (
                <Icon name ='eye' link onClick={handlerShowPassword}/>
                )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className='error-text'>
              Introdusca una contraseña mayor a 6 digitos.
            </span>
          )}
        </Form.Field>
        <Button type='submit' loading={isLoading}>
          Iniciar sesion
        </Button>
      </Form>

      {!userActive && (
        <ButtonResetSendEmailVerification 
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}

      <div className='login-form__options'>
        <p onClick={()=> setSelectedForm(null)}>Volver</p>
        <p>
          ¿No tienes cuenta? 
          <span onClick={()=> setSelectedForm('register')}>Registrate</span>
        </p>
      </div>
    </div>
  )
}

function ButtonResetSendEmailVerification(props){
  const { user, setIsLoading, setUserActive } = props;

  const resendVerificationEmail = () => {
    user.sendEmailVerification().then(()=>{
      console.log('Se ha enviado el email de verificación')
    }).catch(err =>{
      handlerErrors(err.code)
    }).finally(()=>{
      setIsLoading(false);
      setUserActive(true)
    })
  }

  return (
    <div className='resend-verification-email'>
      <p>
        Si no has recibido el email de verificación puedes volver a enviarlo haciendo click 
        <span onClick={resendVerificationEmail}> aqui </span>
      </p>

    </div>
  )
}

function handlerErrors(code) {
  switch (code) {
    case 'auth/wrong-password':
        console.log('El usuario o la contraseña son incorrectos')
      break;
    case 'auth/too-many-requests':
        console.log('has enviado demasiadas solicitudes de reenvio de confirmacion de emil en muy poco tiempo')
      break;
    case 'auth/user-not-found':
        console.log('El usuario o la contraseña son incorrectos')
      break;
    default:
      break;
  }
}

function defaultValueForm() {
  return {
    email: '',
    password: ''
  }
}
