import Nav from './components/Nav';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Work from './components/Work';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import CoffeeCursor from './components/CoffeeCursor';
import './styles/globals.css';

export default function App() {
  return (
    <>
      <CoffeeCursor />
      <Nav />
      <main>
        <Hero />
        <Brands />
        <Work />
        <Testimonials />
      </main>
      <Contact />
    </>
  );
}
