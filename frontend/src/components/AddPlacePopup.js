import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const nameInputRef = useRef();
    const linkInputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const name = nameInputRef.current.value;
        const link = linkInputRef.current.value;
        props.onAddPlace({
            name: name,
            link: link,
          });
    }

    React.useEffect(() => {
        nameInputRef.current.value = "";
        linkInputRef.current.value = "";
      }, [props.isOpen]);
    
    return(
        <>
            <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
            <>
                <input
                id="input-place-name"
                minLength={2}
                maxLength={30}
                type="text"
                placeholder="Название"
                className="popup__input popup__input_type_place-name"
                name="placeName"
                ref={nameInputRef}
                required=""
                />
                <span id="input-place-name-error" className="popup__input-error" />
                <input
                id="input-image-link"
                type="url"
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_image-link"
                name="imageLink"
                ref={linkInputRef}
                required=""
                />
                <span id="input-image-link-error" className="popup__input-error" />
            </>
            }
            />
        </>
    )
}

export default AddPlacePopup;