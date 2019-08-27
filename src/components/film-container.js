export const addFilmContainer = () =>
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
  </section>`;
import {createElement} from "../utils.js";

class FilmCard {
  constructor(card) {
    this._title = card.title;
    this._rating = card.rating;
    this._year = card.year;
    this._runtime = card.runtime;
    this._genre = card.genre;
    this._poster = card.poster;
    this._shortDescription = card.shortDescription;
    this._countComments = card.countComments;
    this._isWatchlist = card.isWatchlist;
    this._isViewed = card.isViewed;
    this._isFavorite = card.isFavorite;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating.toFixed(1)}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._year}</span>
      <span class="film-card__duration">${this._runtime}</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${this._shortDescription}</p>
    <a class="film-card__comments">${this._countComments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchlist && `film-card__controls-item--active`}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isViewed && `film-card__controls-item--active`}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite && `film-card__controls-item--active`}">Mark as favorite</button>
    </form>
  </article>`;
  }
}

export {FilmCard};
