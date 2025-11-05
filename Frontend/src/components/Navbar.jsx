import React from 'react';
import { Routes, Route } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Signup" element={<SignUpPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Settings" element={<SettingsPage />} />
        </Routes>
      </Navbar>
    </div>
  );
}

export default Navbar;
