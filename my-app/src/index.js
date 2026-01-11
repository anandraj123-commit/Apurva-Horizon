import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ListProvider } from './Admin/content-type/store/contentcontext';
import '@aws-amplify/ui-react/styles/reset.layer.css'
import '@aws-amplify/ui-react/styles/base.layer.css'
import '@aws-amplify/ui-react/styles/button.layer.css'
import { AuthProvider } from './Admin/context/AuthContext';
import { store } from "./web/Redux/store";
import { Provider } from "react-redux";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ListProvider>
    <React.StrictMode>
      <AuthProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </AuthProvider>
    </React.StrictMode>
  </ListProvider>
);


reportWebVitals();
