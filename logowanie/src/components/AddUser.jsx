import React, { useState, useCallback, useEffect } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function AddUser(){

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loadedData, setLoadedData] = useState([])

    const [errorModal, setErrorModal] = useState(null)

    function namedChangeHandler(event){
        setName(event.target.value)
        console.log(name)
    }

    function agedChangeHandler(event){
        setAge(event.target.value)
        console.log(age)
    }

    function emailedChangeHandler(event){
        setEmail(event.target.value)
        console.log(email)
    }

    function passwordedChangeHandler(event){
        setPassword(event.target.value)
        console.log(password)
    }

    async function addUserHandler(event){
        event.preventDefault();
        if(+age<1)
        {
            setErrorModal(
                {
                    title:'Błędny wiek',
                    msg:"Wiek większy od zera"
                }
            )
            return null
        }
        if(name=='')
        {
            setErrorModal(
                {
                    title:'Błędna nazwa',
                    msg:"Nazwa nie może być pusta"
                }
            )
            return null
        }
        if(email=='')
        {
            setErrorModal(
                {
                    title:'Błędny email',
                    msg:"email nie może być pusty"
                }
            )
            return null
        }
        if(password=='')
        {
            setErrorModal(
                {
                    title:'Błędne haslo',
                    msg:"haslo nie może być puste"
                }
            )
            return null
        }
    
        const my_object={
            objectName:name,
            objectAge:age,
            objectPassword:password,
            objectEmail:email,
        }
    
        console.log(my_object);
    
        const res = await fetch('https://logg-78864-default-rtdb.firebaseio.com//log.json',
        {
            method: 'POST',
            body: JSON.stringify(my_object),
            headers:{
            'Content-Type': 'application.json'
            }
    
        }) ;
            const data = await res.json() ;
        setName('')
        setAge('')
        setPassword('')
        setEmail('')
        }

    const getDataHandler=useCallback(async()=>{
        const res = await fetch('https://logg-78864-default-rtdb.firebaseio.com//log.json')
        
        const data = await res.json()
  
        const ld = []
        for(const key in data){
          ld.push({
            key: key,
            name: data[key].objectName,
            age: data[key].objectAge,
            password: data[key].objectPassword,
            email: data[key].objectEmail
          })
        }
        setLoadedData(ld) ;
        console.log(data) ;
        console.log(loadedData);
        
       
    })

    useEffect(()=>{
        getDataHandler()
        },[getDataHandler])

    return(     
        <>
        {errorModal && <ErrorModal title={errorModal.title} msg={errorModal.msg}/>}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            
            <label htmlFor="username">Username</label>
            <input id="username" onChange={namedChangeHandler}
            value={name}/>

            <label htmlFor="age">Age</label>
            <input id="age" onChange={agedChangeHandler}
            value={age}/>

            <label htmlFor="password">Password</label>
            <input id="password" onChange={passwordedChangeHandler}
            value={password}/>

            <label htmlFor="Email">Email</label>
            <input id="email" onChange={emailedChangeHandler}
            value={email}/>

            <Button type="submit">Add user</Button>
        </form>
        </Card>
        <ul>
            {
              loadedData.map( item => <li key={item.key}>Username: {item.name} | Age: {item.age} | Email: {item.email} | Password: {item.password}</li>)
            }
        </ul>
        </>
    )
    
}

export default AddUser;

// {loadedData.map((item)=><p>{item}</p>)}