import classes from './LoadingSpinner.module.css';
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        height: '100px',
        width: '100px',
        margin: 'auto',
        display: 'block'
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default LoadingSpinner;
