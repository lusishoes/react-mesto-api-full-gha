const mongoose = require('mongoose');
const cardShema = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const OkStatus = 200;
const CreatedStatus = 201;

const getCards = (req, res, next) => {
  cardShema.find()
    .then((cards) => res.status(OkStatus).send(cards))
    .catch(((err) => {
      next(err);
    }));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return cardShema.create({ name, link, owner })
    .then((card) => {
      res.status(CreatedStatus).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  cardShema.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
        return;
      } if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Вы не являетесь владельцем карточки'));
        return;
      }
      cardShema.deleteOne(card)
        .orFail()
        .then(() => {
          res.status(OkStatus).send({ message: 'карточка удалена.' });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError('Такой карточки не существует'));
          } else {
            next(err);
          }
        });
    });
};
// Добавление лайка с некорректным id карточки
//  1. Ошибка валидации поймана при помощи Joi
const putCardLike = (req, res, next) => {
  cardShema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(CreatedStatus).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Добавление лайка с некорректным id карточки'));
      } else {
        next(err);
      }
    });
};
// Удаление лайка у карточки с некорректным id
//  1. Ошибка валидации поймана при помощи Joi
const deleteCardLike = (req, res, next) => {
  cardShema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(OkStatus).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Удаление лайка у карточки с некорректным id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
};
