import React, { ChangeEvent, FormEventHandler, useState } from 'react'
import './style.scss'
import useStore from '../../store/useStore'
import { loginAction } from '../../store/actions/userAction'
import { Link, useNavigate } from 'react-router-dom'
import InputGroup from '../../components/inputGroup/InputGroup'

const LoginPage = () => {
    const [_, dispatch] = useStore()

    const navigate = useNavigate()

    const [userData, setUserData] = useState<{
        email: string
        password: string
    }>({
        email: '',
        password: '',
    })

    function handleChange(e: ChangeEvent) {
        let ele = e.target as HTMLInputElement
        setUserData({
            ...userData,
            [ele.name]: ele.value,
        })
    }

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()

        let errorMessage = ''
        let userDataKey: keyof { email: string; password: string }

        for (userDataKey in userData) {
            if (!userData[userDataKey]) {
                errorMessage = ''
            }
        }

        if (errorMessage) {
            alert(errorMessage)
            return
        }

        loginAction(userData, dispatch, (data) => {
            if (data) {
                navigate('/')
            }
        })
    }

    return (
        <div className="login-form">
            <h1 className="mt-5">Login Here</h1>
            <form onSubmit={handleSubmit} className="mt-5">
                <InputGroup
                    name="email"
                    label="You Email"
                    data={userData}
                    type="text"
                    placeholder="Enter Your Email"
                    handleChange={handleChange}
                />
                <InputGroup
                    name="password"
                    label="You Password"
                    data={userData}
                    type="password"
                    placeholder="Enter Password"
                    handleChange={handleChange}
                />

                <p>
                    Not an account? <Link to="/auth/registration"> create an account</Link>{' '}
                </p>

                <button type="submit" className="btn btn-primary mt-2">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
