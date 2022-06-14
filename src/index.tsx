import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { MoralisProvider } from 'react-moralis';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <MoralisProvider
    serverUrl="https://nttm33uutcfx.usemoralis.com:2053/server"
    appId="MvjpxdAgsgvufjo4RXshdO8yQMsr0LjwsZsMjbok"
  >
    <Provider store={store}>
      <App />
    </Provider>
  </MoralisProvider>
);

reportWebVitals();
