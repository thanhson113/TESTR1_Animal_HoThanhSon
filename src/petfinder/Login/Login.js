import React, { useState } from 'react'
import './login.css'

export default function Login(props) {
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
        let valueInput = event.target.value
        let name = event.target.name
        setValue({
            ...value,
            [name]: valueInput
        })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (value.petFinderKey === '' || value.petFinderSecret === '') {
            alert('API Key và Secret không được để trống')
        } else {
            callAPI(value)
        }
    }
    return (
        <>
            <div>
                <h2>Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="container_login">
                        <label ><b>API Key</b></label>
                        <input type="text" placeholder="Enter API Key" name="petFinderKey" onChange={handleInput} />
                        <label ><b>Secret </b></label>
                        <input type="text" placeholder="Enter Secret " name="petFinderSecret" onChange={handleInput} />
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>

        </>
    )
}
