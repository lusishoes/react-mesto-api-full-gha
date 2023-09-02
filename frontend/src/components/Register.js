import React, { useState } from 'react';
import{ Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleRegister = (e) => {
    e.preventDefault();
    onRegister(formValue.password, formValue.email);
  }

    return(
        <>
        <form
          className={`authorization__container`}
          name={`authorization__container`}
          onSubmit={handleRegister}
        >
          <h3 className="authorization__title">Регистрация</h3>
          <input
             
              id="input-email"
              type="email"
              placeholder="Email"
              className="authorization__input"
              name="email"
              required={true}
              value={formValue.email}
              onChange={handleChange}
            />
          <input
             
              id="input-password"
              type="password"
              placeholder="Пароль"
              className="authorization__input"
              name="password"
              required={true}
              value={formValue.password}
              onChange={handleChange}
            />
            <button className="authorization__button" type="submit">
                 Зарегистрироваться
          </button>
          <Link to='/signin' className='authorization__link'>
              Уже зарегистрированы? Войти
          </Link>
        </form>
      </>
    );
}

export default Register;