import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../firebase';

const ContactsForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (e)=>{
        e.preventDefault(); // sustabdom, kad nepersikrautu forma
        // pasidarom patikrinima kiekvieno input lauko
        if(name.length < 3){
            alert('Uzpildykite savo varda');
            return
        }
        if(email===""){
            alert("Užpildykite savo e-mail");
            return
        }
        if(message.length < 10 && message.length > 400){
            alert('Iveskite klausima nuo 10 iki 400 simboliu');
            return
        }

        //cia rasysime firebase funkcionaluma
        firebase
        .firestore() //taskas reikalingas, kad gauti to objekto metoda - issaugok i duombaze
        .collection('contacts').add({ //skliausteliuose duomenu paketas, kuri siusiu, add - metodas
            name: name, //stalciukai, ka siusime - kam lygus is vietiniu
            email: email,
            message: message,
            created: firebase.firestore.FieldValue.serverTimestamp(), // kada sukurta
        })

        //kai nusiusime i firebase irasus, issivalome laukus, kad nebebutu uzpildyti
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}> 
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Jusu vardas</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Iveskite varda" 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" 
                    placeholder="Iveskite el. pasta"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Jusu klausimas man</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Iveskite savo klausima"
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Siusti
                </Button>
            </Form>
        </div>
    )
}

export default ContactsForm
