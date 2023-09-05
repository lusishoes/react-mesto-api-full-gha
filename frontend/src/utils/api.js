export class Api {
    constructor({ baseUrl }) { //headers
        this._baseUrl = baseUrl;
        // this._headers = headers;
    }
    // карточки не мои
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'GET',
        }).then(this._handleResponse);
    }
    // получаем дефолтную инфу 
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
          }).then(this._handleResponse);
    }

    // отправляем добавленную инфу 
    setUserInfo({name, about}) { 
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(this._handleResponse);  
    }

    setUserProfileImage(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                avatar: `${avatar}`,
            })
        }).then(this._handleResponse); 
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }).then(this._handleResponse);
        }
        else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
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
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    baseUrl: 'https://api.lusishoes.students.nomoredomainsicu.ru',
});

export default api;