import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { register } from '../../../store/actions/user-actions';

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import LoadingSpinner from '../../UI/LoadingSpinner';

import classes from './Register.module.css'

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
    <div className={classes['page-container-login']}>
      <div className={classes.form}>
        <div className={classes['form-content']}>
          {loading ? <LoadingSpinner />
            : error ? <h2>Błąd: {error}</h2>
              :
              <>
                <h2>Rejestracja</h2>
                <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Input

                    ref={nameInputRef}
                    input={{
                      id: 'name',
                      type: 'text',
                      placeholder: 'Podaj imie',

                    }}
                  />
                  <Input
                    ref={emailInputRef}
                    input={{
                      id: 'email',
                      type: 'email',
                      placeholder: 'Podaj email',

                    }}
                  />
                  <Input
                    ref={passwordInputRef}
                    input={{
                      id: 'password',
                      type: 'password',
                      placeholder: 'Podaj hasło',

                    }}

                  />
                  <Input
                    ref={confirmPasswordInputRef}
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
              </>
          }
        </div>
        {message && <p className={classes.error}>{message}</p>}
        <div className={classes.info}>
          <p>Masz już konto ?</p>
          <NavLink className={classes.info} to={'/login'}>Zaloguj się!</NavLink>
        </div>

      </div>
    </div>
  )
}

export default Register;