import React, { useState, useCallback, useEffect } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function AddUser(){

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [errorModal, setErrorModal] = useState(null)

    function namedChangeHandler(event){
        setName(event.target.value)
        console.log(name)
    }

    function agedChangeHandler(event){
        setAge(event.target.value)
        console.log(age)
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
    
        const my_object={
            objectName: name,
            objectAge:age
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
            }

    const getDataHandler=useCallback(async()=>{
        const res = await fetch('https://logg-78864-default-rtdb.firebaseio.com//log.json')
        
        const data = await res.json()
  
        const loadedData = []
        for(const key in data){
          loadedData.push({
            name: data[key].name,
            age: data[key].age
          })
        }
        console.log(data)
        console.log(loadedData);
       
    })

    useEffect(()=>{
        getDataHandler()
        },[])

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

            <Button type="submit">Add user</Button>
        </form>
        </Card>
        </>
    )
    
}

export default AddUser