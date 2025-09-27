import './loginAccountSection.css'

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'

import { setUser } from '../../../RTK/userSlice';
import { useDispatch } from 'react-redux';

import spaceship from '../../../../assets/images/spaceship.png'

const validate = values =>
{
    const errors = {};
    
    if(!values.email) errors.email = 'Required!';
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Required!';

    if(!values.password) errors.password = 'Required!';
    else if(values.password.length < 4 ) errors.password = 'Must be more than 4 symbols!';

    return errors;
}

function LoginAccountSection() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: 
        {
            email: '',
            password: '',
            loginFailed: '',
        },
        validate,
        onSubmit: async (values, {setErrors}) => 
        {
            try {
                const res = await fetch('http://192.168.1.16:5000/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(values)
                })
                const data = await res.json()

                if (res.ok) {
                    console.log('Logged in:', data.username)
                    dispatch(setUser(data))
                    navigate('/')
                } else {
                    setErrors({ loginFailed: data.message || 'Log In failed' })
                }
            } catch (err) {
                console.error(err)
                setErrors({ loginFailed: 'Server error, try again later' })
              } finally {
              }
        }
    })

    return<div className='loginAccountSection'>
        <img src={spaceship} alt="spaceship" />
        <div className="loginAccount">
            <div className="headline">
                <h3>Log in account</h3>
                <span>Welcome! Enter your details and start creating, collecting and selling NFTs.</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="inputs">                    
                    <div className="wrapper"><input type="text" name='email' placeholder='Email Address' onChange={formik.handleChange} value={formik.values.email}/>{formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}</div>
                    <div className="wrapper"><input type="text" name='password' placeholder='Password' onChange={formik.handleChange} value={formik.values.password}/>{formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}</div>
                </div>
                {formik.errors.loginFailed ? <div className='error login'>{formik.errors.loginFailed}</div> : null}
                <button type='submit' disabled={formik.isSubmitting}>{formik.isSubmitting ? 'Logging in...' : 'Log In'}</button>
            </form>
            <span className='haveAccount'>Have not got an account yet? <Link to='/sign-up'>Sign up</Link></span>
        </div>
    </div>
}

export default LoginAccountSection;