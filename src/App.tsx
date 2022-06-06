import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './views/homepage';
import SignIn from './views/auth/signin/signin';
import SignOut from './views/auth/signout/signout';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;