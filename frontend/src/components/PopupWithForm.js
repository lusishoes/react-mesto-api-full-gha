import React from "react";

function PopupWithForm(props) {
    return(
      <section className={`popup popup_theme_${props.name} ${props.isOpen ? `popup_opened`: ""}`}>
      <div className="popup__container">
        <form
          className={`popup__form popup__form_theme_${props.name}`}
          name={`popup__form_${props.name}`}
          onSubmit={props.onSubmit}
          noValidate=""
        >
          <button className="popup__close-icon" type="reset" onClick={props.onClose}/>
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
          <button className="popup__button" type="submit" onSubmit={props.onSubmit}>
              Сохранить
          </button>
        </form>
      </div>
    </section>
    )
}

export default PopupWithForm; 