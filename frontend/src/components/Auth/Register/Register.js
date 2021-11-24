import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register } from '../../../store/actions/user-actions';

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Layout from '../../Layout/Layout/Layout';

import './Register.scss'

const Register = () => {

  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();


  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true })
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();

    if (!nameInputRef.current.value || !emailInputRef.current.value || !passwordInputRef.current.value || !confirmPasswordInputRef.current.value) {
      setMessage('Proszę wypełnić pola!');
    } else if (passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
      setMessage('Hasła nie pasują do siebie!');
    }
    else {
      dispatch(register(nameInputRef.current.value, emailInputRef.current.value, passwordInputRef.current.value))
    }


  }

  return (
    <Layout>
      <div className="page-container-login">
        <div className="form">
          <div className="form-content">
            <h2>Rejestracja</h2>
            <form onSubmit={submitHandler}>
              <Input

                ref={nameInputRef}
                // label={'Email'}
                input={{
                  id: 'name',
                  type: 'text',
                  placeholder: 'Podaj imie',

                }}
              />
              <Input
                ref={emailInputRef}
                // label={'Email'}
                input={{
                  id: 'email',
                  type: 'email',
                  placeholder: 'Podaj email',

                }}
              />
              <Input
                ref={passwordInputRef}
                // label={'Hasło'}
                input={{
                  id: 'password',
                  type: 'password',
                  placeholder: 'Podaj hasło',

                }}

              />
              <Input
                ref={confirmPasswordInputRef}
                // label={'Hasło'}
                input={{
                  id: 'password2',
                  type: 'password',
                  placeholder: 'Powtórz hasło',

                }}

              />
              <Button
                type={'submit'}
                disabled={false}
              >
                Zarejestruj się
              </Button>
            </form>

          </div>
          {message && <p className="error">{message}</p>}
          <div className="info">
            <p>Masz już konto ?</p>
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Zaloguj się!</Link>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Register;