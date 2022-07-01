import React from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import firebase from '../../../utils/Firebase';
import 'firebase/auth';

import './RegisterForm.scss'

export default function RegisterForm(props) {
  
  const { setSelectedForm } = props;
  
  const onSubmit =()=>{
    console.log('formulario enviado.');
  }

  return (
    <div className='register-form'>
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis.</h1>
      <Form onSubmit={ onSubmit }>
        <Form.Field>
          <input 
            type='text'
            name='email'
            placeholder='Correo electronico'
            icon= 'mail'
            //onChange={}
            //error={}
          />
        </Form.Field>
        <Form.Field>
          <input 
            type='password'
            name='password'
            placeholder='Contraseña'
            icon='eye'
            //onChange={}
            //error={}
          />
        </Form.Field>
        <Form.Field>
          <input 
            type='text'
            name='Username'
            placeholder='¿Cómo deberiamos llamarte?'
            icon='user circle outline'
            //onChange={}
            //error={}
          />
        </Form.Field>
        <Button type='submit'>Continuar</Button>
      </Form>

      <div className='register-form__options'>
        <p>Volver</p>
        <p>
          ¿Ya tienes Musicfy? <span>Iniciar sesión</span>
        </p>
      </div>
    </div>
  )
}
