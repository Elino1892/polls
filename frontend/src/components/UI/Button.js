import classes from './Button.module.css'

const Button = ({ type, onClick, disabled, className, children, style }) => {
  return <button
    type={type || 'button'}
    className={className ? className : classes.button}
    onClick={onClick}
    disabled={disabled || false}
    style={{ margin: '0 auto' }}
  >
    {children}
  </button>
}

export default Button;