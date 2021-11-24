import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../../store/actions/user-actions';

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Layout from '../../Layout/Layout/Layout';
import LoadingSpinner from '../../UI/LoadingSpinner';

import classes from './Login.module.css'

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState('');

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true })
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(emailInputRef.current.value, passwordInputRef.current.value))
    if (error && error === 'No active account found with the given credentials') {
      const errorMessage = 'Nie ma takiego konta!';
      setMessage(errorMessage);
    }
  }

  return (
    <Layout>
      <div className={classes['page-container-login']}>
        <div className={classes.form}>

          <div className={classes['form-content']}>


            {loading ? <LoadingSpinner />
              : error ? <h2>Błąd: {error}</h2>
                :
                <>
                  <h2>Logowanie</h2>
                  <form onSubmit={submitHandler}>
                    <Input
                      ref={emailInputRef}
                      // label={'Email'}
                      input={{
                        id: 'email',
                        type: 'email',
                        placeholder: 'Podaj email'
                      }}
                    />
                    <Input
                      ref={passwordInputRef}
                      // label={'Hasło'}
                      input={{
                        id: 'password',
                        type: 'password',
                        placeholder: 'Podaj hasło'
                      }}

                    />
                    <Button
                      type={'submit'}
                      disabled={false}
                    >
                      Zaloguj się
                    </Button>
                  </form>
                </>
            }
          </div>

          {message && <p className={classes.error}>{message}</p>}
          <div className={classes.info}>
            <p>Nie masz konta ?</p>
            <Link className={classes.info} to={redirect ? `/register?redirect=${redirect}` : '/register'}>Zarejestruj się!</Link>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Login;