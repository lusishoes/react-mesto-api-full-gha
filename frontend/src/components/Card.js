import React from "react";
import Trash from "../images/Trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    // подписка на контекст
    const userDataContext = React.useContext( CurrentUserContext );

    const isOwn = props.card.owner._id === userDataContext._id;
    
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === userDataContext._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = ( 
      `elements__icon ${isLiked && 'elements__icon_active'}` 
    );

    function handleDeleteClick() {
      props.onCardDelete(props.card); 
    }

    function handleLikeClick() {
      props.onCardLike(props.card);
    }
  
    function handleClick() {
        props.onCardClick(props.card);
    } 

  return (
    <article className="elements__card">
      <img 
        src={Trash} 
        alt="корзина" 
        className={`elements__card-bucket ${isOwn ? '' : 'elements__card-bucket_type-disabled'}`} 
        onClick={handleDeleteClick}
      />
      <img 
        alt={props.card.name} 
        src={props.card.link} 
        className='elements__card-image' 
        onClick={handleClick}
      />
      <div className="elements__description">
        <h2 className="elements__text">{props.card.name}</h2>
        <div className="elements__like-metrics">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button> 
          <p className="elements__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;