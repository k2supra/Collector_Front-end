import './createAccountSection.css'

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'

import spaceship from '../../../../assets/images/spaceship.png'

import { useDispatch } from 'react-redux';
import { setUser } from '../../../RTK/userSlice';
import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;

const validate = values =>
{
    const errors = {};
    
    if(!values.username) errors.username = 'Required!';
    else if(values.username.length < 3 || values.username.length > 100) errors.username = 'Must be from 3 to 100 symbols';
    
    if(!values.email) errors.email = 'Required!';
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Required!';

    if(!values.password) errors.password = 'Required!';
    else if(values.password.length < 4 ) errors.password = 'Must be more than 4 symbols!';

    if(!values.confirmPassword) errors.confirmPassword = 'Required!';
    else if(values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords must match!';

    return errors;
}

function CreateAccountSection() {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: 
        {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate,
        onSubmit: async (values, {setSubmitting, setErrors}) => 
        {
            try {
                const res = await fetch(`${API_URL}:${PORT}/register`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username: values.username, email: values.email, password: values.password})
                })
                const data = await res.json()

                if (res.ok) {
                console.log('Registered:', data)
                dispatch(setUser(data))
                navigate('/')
                } else {
                setErrors({ email: data.error || 'Registration failed' })
                }
            } catch (err) {
                console.error(err)
                setErrors({ email: 'Server error, try again later' })
              } finally {
                setSubmitting(false)
              }
        }
    })

    return<div className='createAccountSection'>
        <img src={spaceship} alt="spaceship" />
        <div className="createAccount">
            <div className="headline">
                <h3>Create account</h3>
                <span>Welcome! Enter your details and start creating, collecting and selling NFTs.</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="inputs">
                    <div className="wrapper"><input type="text" name='username' placeholder='Username' onChange={formik.handleChange} value={formik.values.username}/>{formik.errors.username ? <div className='error'>{formik.errors.username}</div> : null}</div>
                    <div className="wrapper"><input type='text' name='email' placeholder='Email Address' onChange={formik.handleChange} value={formik.values.email}/>{formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}</div>
                    <div className="wrapper"><input type={showPassword?'text':'password'} name='password' placeholder='Password' onChange={formik.handleChange} value={formik.values.password}/>{formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}</div>
                    <div className="wrapper"><input type={showPassword?'text':'password'} name='confirmPassword' placeholder='Confirm Password' onChange={formik.handleChange} value={formik.values.confirmPassword}/>{formik.errors.confirmPassword ? <div className='error'>{formik.errors.confirmPassword}</div> : null}</div>
                </div>
                <label htmlFor="showPassword"><input type="checkbox" id="showPassword" onChange={()=>setShowPassword(state => !state)}/>Show Password</label>
                <button type='submit' disabled={formik.isSubmitting}>{formik.isSubmitting ? 'Creating...' : 'Create account'}</button>
            </form>
            <span className='haveAccount'>Already have an account? <Link to='/login'>Log in</Link></span>
        </div>
    </div>
}

export default CreateAccountSection;