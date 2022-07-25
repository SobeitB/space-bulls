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
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const container = document.getElementById('root')!;
const root = createRoot(container);

Sentry.init({
   dsn: "http://093559544062463ea1701f40cdc905e3@sentry.8gen.team/4",
   integrations: [new BrowserTracing()],
   tracesSampleRate: 1.0,
});

root.render(
  <>
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
  </>
);

reportWebVitals();
