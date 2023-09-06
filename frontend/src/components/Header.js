import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ email, onSignOut }) {
  const location = useLocation();
  console.log(email);
  const signOut = () => {
    onSignOut();
  };
  return (
    <header className="header">
      <img
        src={logo}
        alt="логотип"
        className="header__logo"
      />

      {location.pathname === "/signin" && (
        <Link to={"/signup"} className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/signup" && (
        <Link to={"/signin"} className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === "/" && (
        <div className="header__container">
          <h1 className="header__email">{ email }</h1> 
          <h1 className="header__signout" onClick={signOut}>
            Выйти
          </h1>
        </div>
      )}
    </header>
  );
}

export default Header;
