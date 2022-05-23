import React, { useState, useEffect } from 'react'
import './homepet.css'
import noimg from '../../asset/img/noimg.jpg'

export default function PetFinder(props) {
    let accessToken = JSON.parse(localStorage.getItem('USER_LOGIN'))
    const [pets, setPet] = useState([])
    const callAPI = async () => {
        const petResults = await fetch(
            "https://api.petfinder.com/v2/animals",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await petResults.json()
        setPet(data)

    }
    useEffect(() => {
        if (accessToken == undefined) {
            props.history.push('/login')
        } else {
            callAPI()
        }
    }, [])

    const renderPet = () => {
        return pets.animals?.map(pet => {
            return (
                <div className="header__col l-3" key={pet.id}>
                    <div className="card">
                        <img src={pet.photos == '' ? noimg : pet.photos[0]?.full} alt="Avatar" />
                        <div className="header__content">
                            <h3><b>{pet.name}</b></h3>
                            <p>Age : {pet.age}</p>
                            <p>Gender : {pet.gender}</p>
                            <p style={{ color: 'red' }}>Contact : {pet.contact.phone}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div>
            <div className="header">
                <a style={{ cursor: 'pointer' }} className="logo">Home Pet</a>
                <div className="header-right">
                    <a className="active" href="#home">Home</a>
                    <a href="#contact">Contact</a>
                    <a style={{ cursor: "pointer" }} onClick={() => {
                        props.history.push('/login')
                        localStorage.removeItem('USER_LOGIN')
                        window.location.reload()
                    }}>Logout</a>
                </div>
            </div>
            <div className="header__container wide">
                <div className="header__row">
                    {renderPet()}
                </div>
            </div>
        </div>

    )
}
