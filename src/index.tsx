import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { MoralisProvider } from 'react-moralis';
import {BrowserRouter} from "react-router-dom";
import {NotificationProvider} from "web3uikit";

const container = document.getElementById('root')!;
const root = createRoot(container);

const serverUrl = 'https://nttm33uutcfx.usemoralis.com:2053/server' // https://mcyppafmgype.usemoralis.com:2053/server
const appId = 'MvjpxdAgsgvufjo4RXshdO8yQMsr0LjwsZsMjbok' // kFxaD7mClqJil1JZWN6sEkYopAFr6B1AVqFcLbu5

root.render(
  <BrowserRouter>
     <MoralisProvider
      serverUrl={serverUrl}
      appId={appId}
    >
      <NotificationProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NotificationProvider>
    </MoralisProvider>
  </BrowserRouter>
);

reportWebVitals();
