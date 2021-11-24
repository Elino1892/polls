import { forwardRef } from "react";


const Input = forwardRef(({ input, label }, ref) => {
  return (
    <div>
      {label && <label htmlFor={input.id}>{label}</label>}
      <input ref={ref} {...input}>
      </input>
    </div>
  )
});

export default Input;