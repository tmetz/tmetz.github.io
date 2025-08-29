import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Resume from './components/Resume.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Resume />
      <Footer />
    </div>
  );
}

export default App;
