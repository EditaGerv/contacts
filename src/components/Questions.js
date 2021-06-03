import React, {useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import firebase from '../firebase';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    //ka vykdysim, kokiam kintamajam pasikeitus
    useEffect(()=>{ 
        let unsubscribe = firebase
                        .firestore()
                        .collection('contacts') // toks koks duomenu bazeje yra aprasytas
                        .onSnapshot((snap)=>{ //mato irasu id ir iraso duomenis, visus stalciukus
                            const newQuestions = snap.docs.map((doc)=>( //parsinesim objekta, doc- susikuriu laikina vidini kintamaji
                              {
                                  id: doc.id,
                                  ...doc.data() //pasidarome kopija visu duomenu esanciu tame dokumento id
                              }  
                            ))
                            setQuestions(newQuestions); //kai turiu duomenu kopija, uzsetinu i state ka turiu duomenu bazej
                        });
        return ()=> unsubscribe();
                         
    } , [])
    console.log(questions)
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Question</th>
                    </tr>
                </thead>
                <tbody>
            {
                questions.map((question, index)=>( //isprintinam klausimus
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{question.name}</td>
                    <td>{question.email}</td>
                    <td>{question.message}</td>
                    </tr>
                )) 
            } 
            </tbody>
        </Table>
        </div>
    )
}

export default Questions
