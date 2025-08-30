import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';  // <-- you forgot this import!
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import store from './Redux/store';

const root = createRoot(document.getElementById('root'));

console.log(App)
root.render(
  <Provider store={store}>
        <BrowserRouter>
          <App />
          
          <Toaster />
        </BrowserRouter>
  </Provider>
);
