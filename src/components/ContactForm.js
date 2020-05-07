import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onBlur"
  });
  const onSubmit = data => {
    setData(data);
  };

  return (
    <div className="App">
      <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            name="firstName"
            id="firstName"
            placeholder="bill"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.firstName && (
            <p data-testid="first-name-error">Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            name="lastName"
            id="lastName"
            placeholder="luo"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p data-testid="last-name-error">Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input name="email" id="email" ref={register({ required: true })} />
          {errors.email && (
            <p data-testid="email-error">Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" ref={register({ required: false })} />
        </div>
        <div>
          <label htmlFor="dropdown">How did you hear about us?</label>
          <select name="dropdown" id="dropdown" ref={register({ required: false })}>
            <option value="internet">Internet</option>
            <option value="pidgeon">Carrier Pidgeon</option>
            <option value="sign-spinner">Sign Spinner</option>
          </select>
        </div>
        {data && (
          <pre data-testid="json" style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input aria-label="submit" type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
