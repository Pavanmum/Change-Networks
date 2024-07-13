
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtools } from 'react-query/devtools'

import { BrowserRouter} from "react-router-dom";

import "./assets/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "./routes/index.jsx";

// pages for this kit
import store from "./store";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider  client={queryClient}  contextSharing>
  <Provider store={store}>
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
