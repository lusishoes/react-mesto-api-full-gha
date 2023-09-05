import React, {  useState } from 'react';

function Login({ onLogin }) {
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

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(formValue.password, formValue.email)
  }

    return(
        <form
          className='authorization__container'
          name='authorizationForm'
          onSubmit={handleLogin}
        >
          <h3 className="authorization__title">Вход</h3>
          <input
             
              id="input-email"
              value={formValue.email}
              placeholder="Email"
              className="authorization__input"
              name="email"
              required={true}
              onChange={handleChange}
            />
          <input
            
              id="input-password"
              value={formValue.password}
              placeholder="Пароль"
              className="authorization__input"
              name="password"
              required={true}
              type='password'
              onChange={handleChange}
            />
            <button className="authorization__button" type="submit">
                    Войти
          </button>
        </form>
    );
}

export default Login;