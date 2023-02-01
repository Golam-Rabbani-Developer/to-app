
import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseinit';



const data = [
    { id: 3, type: 'email', inputName: 'email', titleName: 'Your Email' },
    { id: 2, type: 'password', inputName: 'password', titleName: 'Your Password' }
]

const Login = ({ setLogin }) => {

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        if (user) {
            console.log(user)
        }
    }, [user])

    if (loading) {
        return <>...Loading</>;
    }
    let registrationError;
    if (error) {
        registrationError = <p className='error'>{error.message}</p>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(email, password)
    }

    return (
        <div className='form'>
            <h2 className='form_title'>Login Yourself</h2>
            <form onSubmit={handleSubmit}>
                {
                    data.map((item) =>
                        <div key={item.key} className='registration_form'>
                            <p className='input_title'>{item.titleName}</p>
                            <input name={item.inputName} className='input' type={item.type} />
                        </div>
                    )
                }
                <div>
                    {registrationError}
                </div>
                <p onClick={() => setLogin(false)} className='shift_component'>Are you New to Daily Note? Please Register</p>
                <input className='btn' type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;