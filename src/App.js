import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';

function App({classes}) {
  
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}

export default App;
