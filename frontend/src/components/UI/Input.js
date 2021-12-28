import { forwardRef } from "react";


const Input = forwardRef(({ input, label, onChange }, ref) => {
  return (
    <div>
      {label && <label htmlFor={input.id}>{label}</label>}
      <input onChange={onChange} ref={ref} {...input}>
      </input>
    </div>
  )
});

export default Input;