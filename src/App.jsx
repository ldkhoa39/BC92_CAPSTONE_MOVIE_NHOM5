import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { renderRoutes } from './routes';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {renderRoutes()}

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;