export class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    // карточки не мои
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'GET',
        }).then(this._handleResponse);
    }
    // получаем дефолтную инфу 
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
          }).then(this._handleResponse);
    }

    // отправляем добавленную инфу 
    setUserInfo({name, about}) { 
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
        }).then(this._handleResponse);
    }
    // добавлени новой карточки 
    getCreatedCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${data.name}`,
                link: `${data.link}`,
            })  
        }).then(this._handleResponse);
    }
    // удаление карточки 
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse);  
    }

    setUserProfileImage(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar}`,
            })
        }).then(this._handleResponse); 
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers,
            }).then(this._handleResponse);
        }
        else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers,
            }).then(this._handleResponse);
        }
      }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
    authorization: '9ed4e7b7-8680-4f86-8c38-42efc846be5c',
    'Content-Type': 'application/json'
    }
});

export default api;