import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../../store/actions/user-actions';

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Layout from '../../Layout/Layout/Layout';

import './Login.scss'

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();

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
  }

  return (
    <Layout>
      <div className="page-container-login">
        <div className="form">
          <div className="form-content">
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

          </div>
          <div className="info">
            <p>Nie masz konta ?</p>
            <Link className="info" to={redirect ? `/register?redirect=${redirect}` : '/register'}>Zarejestruj się!</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login;