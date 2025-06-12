import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from './components/Loader';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Sandbox from './components/Sandbox';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContainer>
      <Loader hidden={!isLoading} />
      <Background />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Sandbox />
      <Contact />
      <Footer />
    </AppContainer>
  );
}

export default App;