import Documents from './app/pages/documents/Documents.js'
import './index.scss'; 
import { Provider } from 'react-redux'
import store from './app/Redux/store';
import { Routes, Route } from "react-router-dom";
import Counter from './app/pages/counter/Counter';
import { useState } from 'react';

function App() {
  const [text, setText ] = useState('hi')
  function changeText() { 
    setText(text + ' and hello ')
  }

  return (
    <Provider store={store}>
      <button onClick={changeText}>change text { text} </button>
      <Routes>
        <Route path="/documents" element={<Documents />} />
        <Route path="/counter" element={<Counter text={text}/>} />
      </Routes>
    </Provider>
  );
}

export default App;
