const Button = ({ type, onClick, disabled, className, children }) => {
  return <button
    type={type || 'button'}
    className={className || null}
    onClick={onClick}
    disabled={disabled || false}
  >
    {children}
  </button>
}

export default Button;