import React from 'react';
import ColorDropper from './ColorDropper.js';
import Header from './Header.js';
import './style.css';

function App() {
  return (
    <div className="app">
      <Header />
          <div className="app-body m-8">
            <ColorDropper />
          </div>
    </div>
  );
}

export default App;