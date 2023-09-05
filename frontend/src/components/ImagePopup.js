
  {/*ПОПАП ОТКРЫТИЯ КАРТИНКИ*/}
function ImagePopup(props) {

    return(
        <section className={`popup popup_theme_open-image ${props.card ? `popup_opened`: ''}`}>
        <div className="popup__wrapper">
          <button className="popup__close-icon" type="reset" onClick={props.onClose}/>
          <img
            alt={props.card?.name}
            src={props.card?.link}
            className="popup__image-block"
          />
          <h3 className="popup__image-signature">{props.card?.name}</h3>   
        </div>
      </section>
    )
}

export default ImagePopup;