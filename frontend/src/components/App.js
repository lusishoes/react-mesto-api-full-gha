import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import * as mestoAuth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // данные пользователя при монтировании
  useEffect(() => {
    if(isLoggedIn === true) {
      api.getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  
    api.getInitialCards()
      .then((cardsResponse) => {
        setCards(cardsResponse);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isLoggedIn]);
  // постановка лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((elem) => elem !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // изменение данных юзера
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // изменение аватара юзера
  function handleUpdateAvatar(data) {
    api.setUserProfileImage(data.avatar).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }
  // дабавление новой карточки
  function handleAddPlaceSubmit(data) {
    api.getCreatedCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setisInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    mestoAuth.getContent(jwt)
      .then((data) => {
        if (!data) {
          return;
        }
        // setEmail(data);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((e) => {
        setIsLoggedIn(false);
        console.log(e);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleOnRegister = (password, email) => {
    mestoAuth.register(password, email)
      .then(() => {
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(true);
        navigate("/signin");
      })
      .catch((err) => {
        setisInfoTooltipOpen(true);
        setIsInfoTooltip(false);
        console.log(err);
      });
  };

  const handleOnLogin = (password, email) => {
    mestoAuth.login(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setEmail(email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/signin");
  };
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSignOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatare={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route path="/signin" element={<Login onLogin={handleOnLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleOnRegister} />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          messegeState={isInfoTooltip}
        />
        <PopupWithForm name={"delete-card"} title={"Вы уверены?"} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
