import React from 'react';
import { Routes as Rout, Route } from 'react-router-dom';

//pages

import Home from '../pages/home';

export default function Routes() {
  return (
    <Rout>
        <Route path='/' element={<Home/>} />
    </Rout>
  );
}
