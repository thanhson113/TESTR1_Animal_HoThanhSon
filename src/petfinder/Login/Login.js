import React, { useState } from 'react'
import './login.css'
import {  } from 'react-router-dom'
export default function Login(props) {
    console.log(props)
    const [value, setValue] = useState({
        petFinderKey: '',
        petFinderSecret: '',
    })
    const callAPI = async (value) => {
        const { petFinderKey, petFinderSecret } = value;
        const params = new URLSearchParams();

        params.append('grant_type', 'client_credentials')
        params.append('client_id', petFinderKey)
        params.append('client_secret', petFinderSecret)

        try {
            let result = await fetch(
                "https://api.petfinder.com/v2/oauth2/token",
                {
                    method: 'POST',
                    body: params
                }

            );
            let data = await result.json()
            localStorage.setItem('USER_LOGIN', JSON.stringify(data.access_token));
            props.history.push('/home')
        } catch (err) {
            console.log(err)
        }


    }

    const handleInput = (event) => {
        let value_input = event.target.value;
        let name = event.target.name
        setValue({
            ...value,
            [name]: value_input
        })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        callAPI(value)
    }
    return (
        <>
            <div>
                <h2>Login Form</h2>
                <form onSubmit={handleSubmit} method="post">
                    <div className="container_login">
                        <label htmlFor="uname"><b>KEY</b></label>
                        <input type="text" placeholder="Enter KEY" name="petFinderKey" onChange={handleInput} />
                        <label htmlFor="psw"><b>Secret </b></label>
                        <input type="text" placeholder="Enter Secret " name="petFinderSecret" onChange={handleInput} />
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>

        </>
    )
}
