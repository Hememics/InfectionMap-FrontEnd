import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './views/homepage';
import SignIn from './views/auth/signin/signin';
import SignOut from './views/auth/signout/signout';
import SignUp from './views/auth/signup/signup';
import MyTests from './views/profile/MyTests';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<SignOut />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/mytests" element={<MyTests />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;