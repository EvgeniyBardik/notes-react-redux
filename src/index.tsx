import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux';
import App from './App';
import { rootReducer } from './redux/rootReducer';


const container: any = document.getElementById('root')
const root = createRoot(container)

const store = createStore(rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
)
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>

);