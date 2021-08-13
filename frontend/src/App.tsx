import React from 'react';
import Router from './Router';
import "./assets/css/reset.css";
import "./assets/css/style.css";
import { Header } from './components/organisms/index';

const App = () => {
  return (
    <>
      <Header />
        <main className="c-main">
          <Router />
        </main>
    </>
  )
}

export default App;
