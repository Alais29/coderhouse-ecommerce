import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from 'store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/index.scss';

const rootElement = document.getElementById('root');

if (rootElement?.hasChildNodes()) {
  ReactDOM.hydrate(
    <HelmetProvider>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </HelmetProvider>,
    rootElement,
  );
} else {
  ReactDOM.render(
    <HelmetProvider>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </HelmetProvider>,
    rootElement,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
