import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { MoralisProvider } from 'react-moralis';
import {BrowserRouter} from "react-router-dom";
import {NotificationProvider} from "web3uikit";
import {serverUrl, appId} from './shared/variable'

const container = document.getElementById('root')!;
const root = createRoot(container);


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
