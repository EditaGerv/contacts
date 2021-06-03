import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import ContactsForm from './components/ContactsForm';
import Questions from './components/Questions';

function App() {
  return (
    <Container>
      <Navbar bg="light" className="my-5">
        <Container>
          <Navbar.Brand href="#home">Kontaktu forma</Navbar.Brand>
        </Container>
      </Navbar>
      <ContactsForm/>
      <Navbar bg="light" className="my-5">
        <Container>
          <Navbar.Brand href="#home">Klientu uzklausos</Navbar.Brand>
        </Container>
      </Navbar>
      <Questions/>
    </Container>
  );
}

export default App;
