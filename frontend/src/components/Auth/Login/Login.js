import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom';
import { login } from '../../../store/actions/user-actions';

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import LoadingSpinner from '../../UI/LoadingSpinner';

import classes from './Login.module.css'

const Login = () => {

  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate('/admin/userlist', { replace: true })
    } else if (userInfo) {
      navigate('/polls', { replace: true })
    }
  }, [navigate, userInfo, dispatch])

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(emailInputRef.current.value, passwordInputRef.current.value))
    if (error && error === 'No active account found with the given credentials') {
      const errorMessage = 'Nie ma takiego konta!';
      setMessage(errorMessage);
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
                <h2>Logowanie</h2>
                <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Input
                    ref={emailInputRef}
                    input={{
                      id: 'email',
                      type: 'email',
                      placeholder: 'Podaj email'
                    }}
                  />
                  <Input
                    ref={passwordInputRef}
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
          <NavLink className={classes.info} to={'/register'}>Zarejestruj się!</NavLink>
        </div>

      </div>
    </div>
  )
}

export default Login;