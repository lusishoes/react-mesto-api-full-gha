import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }, [props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      }
    
    return(
    <PopupWithForm
      name={'edit-profile'} 
      title={'Редактировать профиль'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={(
      <>
        <input
          value={name || ''} 
          id="input-name"
          type="text"
          placeholder="Имя"
          className="popup__input popup__input_type_name"
          name="userName"
          minLength={2}
          maxLength={40}
          required=""
          onChange={handleChangeName}
        />
        <span id="input-name-error" className="popup__input-error" />
        <input
          value={description || ''}
          id="input-link"
          type="text"
          placeholder="О себе"
          className="popup__input popup__input_type_occupation"
          name="userOccupation"
          minLength={2}
          maxLength={200}
          required=""
          onChange={handleChangeDescription}
        />
        <span id="input-link-error" className="popup__input-error" />
      </>
    )}
    />     
  
    )
} 

export default EditProfilePopup;