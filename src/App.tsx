import Home from './pages/home';
import { Provider } from 'react-redux';
import { store } from './store';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
