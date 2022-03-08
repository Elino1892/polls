import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../../../store/actions/user-actions';
import { USER_UPDATE_PROFILE_RESET } from '../../../constants/userConstants';

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import LoadingSpinner from '../../UI/LoadingSpinner';

import classes from './Profile.module.css'

const Profile = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch();


  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [navigate, userInfo, dispatch, user, success])

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Hasła nie pasują do siebie!');
    }
    else {
      dispatch(updateUserProfile({
        'id': user.id,
        'name': name,
        'email': email,
        'password': password
      }))
      setMessage('Dane zostały zmienione!');
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
                <h2>Twoje konto</h2>
                <form onSubmit={submitHandler}>
                  <Input
                    input={{
                      id: 'name',
                      type: 'text',
                      placeholder: 'Podaj imie',
                      value: name,
                      onChange: (e) => setName(e.target.value)
                    }}
                  />
                  <Input
                    input={{
                      id: 'email',
                      type: 'email',
                      placeholder: 'Podaj email',
                      value: email,
                      onChange: (e) => setEmail(e.target.value)
                    }}
                  />
                  <Input
                    input={{
                      id: 'password',
                      type: 'password',
                      placeholder: 'Podaj hasło',
                      value: password,
                      onChange: (e) => setPassword(e.target.value)
                    }}

                  />
                  <Input
                    input={{
                      id: 'password2',
                      type: 'password',
                      placeholder: 'Powtórz hasło',
                      value: confirmPassword,
                      onChange: (e) => setConfirmPassword(e.target.value)
                    }}

                  />
                  <Button
                    type={'submit'}
                    disabled={false}
                    className='button'
                  >
                    Zaktualizuj
                  </Button>
                </form>
              </>
          }
        </div>
        {message && <p className={classes.error}>{message}</p>}


      </div>
    </div>
  )
}

export default Profile;