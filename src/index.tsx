import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { MoralisProvider } from 'react-moralis';
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
     <MoralisProvider
      serverUrl="https://nttm33uutcfx.usemoralis.com:2053/server"
      appId="MvjpxdAgsgvufjo4RXshdO8yQMsr0LjwsZsMjbok"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </MoralisProvider>
  </BrowserRouter>
);

reportWebVitals();
