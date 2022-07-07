import React, { useState } from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { validateEmail } from '../../../utils/Validations'
import firebase from '../../../utils/Firebase';
import 'firebase/compat/auth';

import './RegisterForm.scss'

export default function RegisterForm(props) {
  
  const { setSelectedForm } = props;
  const [formData, setformdata] = useState(defaultValueForm());
  const [showPassword, setshowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handlerShowPassword = () =>{
    setshowPassword(!showPassword)
  };

  const onChange = e => {
    setformdata({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit =()=>{
    setFormError({});
    let errors = {};
    let formDK = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formDK = false;
    }

    if (formData.password.length < 6) {
      errors.password = true;
      formDK = false;
    }

    if (!formData.Username) {
      errors.Username = true;
      formDK = false;
    }

    setFormError(errors);

    if (formDK) {
      setIsLoading(true);
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(()=>{
        console.log('Registro completado');
        changeUserName();
        sendVerificationEmail();
      }).catch(()=>{
        console.log('error al crear la cuenta');
      }).finally(()=>{
        setIsLoading(false);
        setSelectedForm(null);
      });
    }
  };


  const changeUserName = () =>{
    firebase.auth().currentUser.updateProfile({
      displayName: formData.Username,
    }).catch(()=> {
      console.log('error al asignar el nombre de usuario')
    });
  };

  const sendVerificationEmail =() =>{
    firebase.auth().currentUser.sendEmailVerification().then(() =>{
      console.log('Se ha enviado un email de verificación')
    }).catch(()=>{
      console.log('error al enviar email de verificación.')
    })
  }
  
  return (
    <div className='register-form'>
      <h1>Tus aliados estrategicos.</h1>
      <Form onSubmit={ onSubmit } onChange={ onChange }>
        <Form.Field>
          <Form.Input 
            type='text'
            name='email'
            placeholder='Correo electronico'
            icon= 'mail'
            error={ formError.email }
          />
          {formError.email && (
            <span className='error-text'>
              Por favor, introdusca un correo electronico valido.
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
            error={ formError.password }
          />
        {formError.email && (
            <span className='error-text'>
              Introdusca una contraseña mayor a 6 digitos.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Form.Input 
            type='text'
            name='Username'
            placeholder='¿Cómo deberiamos llamarte?'
            icon='user circle outline'
            error={ formError.Username }
          />
           {formError.email && (
            <span className='error-text'>
              Introdusca un usuario.
            </span>
          )}
        </Form.Field>
        <Button type='submit' loading={isLoading}>Continuar</Button>
      </Form>

      <div className='register-form__options'>
        <p onClick={()=> setSelectedForm(null)}>Volver</p>
        <p>
          ¿Ya tienes Musicfy? <span onClick={()=> setSelectedForm('login') }>Iniciar sesión</span>
        </p>
      </div>
    </div>
  )
}

function defaultValueForm() {
  return {
    email: '',
    password: '',
    Username: ''
  }
}
