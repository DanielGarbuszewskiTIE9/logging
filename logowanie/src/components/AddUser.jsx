import React from "react";

function AddUser(){
    return(
        <form>
            <label htmlFor="username">Username</label>
            <input id="username"/>

            <label htmlFor="age">Age</label>
            <input id="age"/>

            <button type="submit">Add user</button>
        </form>
    )
}

export default AddUser