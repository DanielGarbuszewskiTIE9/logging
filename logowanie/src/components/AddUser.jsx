import React, { useState } from "react";
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

    function addUserHandler(event){
        event.preventDefault()
        if(+age<1)
        {
            setErrorModal(
                {
                    title:'Błędny wiek',
                    msg:"Wiek większy od zera"
                }
            )
        }
        if(name=='')
        {
            setErrorModal(
                {
                    title:'Błędna nazwa',
                    msg:"Nazwa nie może być pusta"
                }
            )
        }

        setName('')

        setAge('')
    }

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