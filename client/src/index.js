import React, { createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import heroStore from './store/heroStore';


export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value= {{
    heroes: new heroStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

