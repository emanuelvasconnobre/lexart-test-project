import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { AppBrowserRouter } from './routes/BrowserRouter'
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position='bottom-right'
        progressStyle={{
          color: "blue",
        }} />
      <AppBrowserRouter />
    </Provider>
  )
}

export default App
