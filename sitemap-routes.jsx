import React from 'react';
import { Route, Routes } from 'react-router';

export default (
  <Routes>
    <Route path="/">
      <Route path="profile" />
      <Route path="banlist" />
      <Route path="leaders" />
    </Route>
  </Routes>
);
