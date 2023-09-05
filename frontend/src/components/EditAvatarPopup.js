import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const avatar = avatarInputRef.current.value; 
    props.onUpdateAvatar({
      avatar: avatar,
    });
  }

  React.useEffect(() => {
    avatarInputRef.current.value = "";
  }, [props.isOpen]);

  return (
    <>
      {/* ПОПАП ИЗМЕНЕНИЯ КАРТИНКИ АВТОРА */}
      <PopupWithForm
        name={"change-image"}
        title={"Обновить аватар"}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        children={
          <>
            <input
              id="input-profile-image"
              type="url"
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_image-link"
              name="imageLink"
              ref={avatarInputRef}
              required
            />
            <span id="input-profile-image-error" className="popup__input-error"></span>
          </>
        }
      />
    </>
  );
}

export default EditAvatarPopup;
