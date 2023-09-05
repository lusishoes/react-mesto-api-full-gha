// import custoPicture from "../images/Кусто.jpg";
import bigPencil from "../images/bigPencil.png";
import pencil from "../images/pencil.svg";
import plusSymbol from "../images/Vector+.svg";
import Card from "./Card";
// import api from "../utils/api.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const userDataContext = React.useContext( CurrentUserContext ); // подписались на контекст useContext

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__edit">
            <div className="profile__image-container">
              <img
                // src="<%=require('./images/Кусто.jpg')%>"
                src={userDataContext.avatar}
                alt="Жак Ив Кусто"
                className="profile__image"
              />
              <button
                className="profile__image-change-button"
                onClick={props.onEditAvatare}
              >
                <img
                  // src="<%=require('./images/bigPencil.png')%>"
                  src={bigPencil}
                  alt="карандашик"
                />
              </button>
            </div>
            <div className="profile__data-edit">
              <div className="profile__name-edit">
                <h1 className="profile__title">{userDataContext.name}</h1>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={props.onEditProfile}
                >
                  <img
                    // src="<%=require('./images/pencil.svg')%>"
                    src={pencil}
                    alt="карандашик"
                    className="profile__edit-image"
                  />
                </button>
              </div>
              <h2 className="profile__occupation">{userDataContext.about}</h2>
            </div>
          </div>
          <button
            className="profile__add-button-wrap"
            type="button"
            onClick={props.onAddPlace}
          >
            <img
              // src="<%=require('./images/Vector+.svg')%>"
              src={plusSymbol}
              className="profile__add-button"
              alt="кнопка добавить"
            />
          </button>
        </section>
        <section className="elements">
          {props.cards.map((card, id) => (
            <Card
              key={id} 
              card={card} 
              onCardClick={props.onCardClick} 
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} // передаем пропс 
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
