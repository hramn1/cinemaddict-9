import {default as Popup} from '../components/popup.js';
import {isEscPressed, Position, render, unrender} from "../utils";
import {default as FilmCard} from "../components/film-card";
const bodyContainer = document.querySelector(`body`);


class MovieController {
  constructor(films, containerCard, count, onDataChange, onChangeView, commentArr) {
    this._film = films;
    this._count = count;
    this._commentArr = commentArr;
    this._containerCard = containerCard;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
  }

  openPopup(popup) {

    this._onChangeView();
    render(bodyContainer, popup.getElement(), Position.BEFOREEND);
    bodyContainer.classList.add(`hide-overflow`);
    const onCloseBtnClick = (evtClose) => {
      if (evtClose.target.classList.contains(`film-details__close-btn`)) {
        MovieController.closePopup(popup);
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    popup.getElement().addEventListener(`click`, onCloseBtnClick);
    const onEscKeydown = (evtEsc) => {
      if (isEscPressed(evtEsc.key)) {
        MovieController.closePopup(popup);
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    document.addEventListener(`keydown`, onEscKeydown);
    const commentAdd = popup.getElement().querySelector(`.film-details__comment-input`);
    commentAdd.addEventListener(`focus`, function () {
      document.removeEventListener(`keydown`, onEscKeydown);
    });
    commentAdd.addEventListener(`blur`, function () {
      document.addEventListener(`keydown`, onEscKeydown);
    });
  }
  static closePopup(popup) {
    unrender(popup.getElement());
    popup.removeElement();
    bodyContainer.classList.remove(`hide-overflow`);
  }

  setDefaultView(popup) {
    const popupEl = document.querySelector(`.film-details`);
    if (document.contains(popupEl)) {
      unrender(popupEl);
      popup.removeElement();
    }
  }
  init() {

    const arrFilmSlice = this._film.slice(0, this._count);
    const filmToggle = (evt, popup, film) => {
      popup.changePopUp = () => {
        getNewMokData(``, popup, film);
      };
      this.setDefaultView(popup);
      const togglers = [`film-card__poster`, `film-card__title`, `film-card__comments`];
      if (togglers.some((cls) => evt.target.classList.contains(cls))) {
        this.openPopup(popup);
      }
    };
    let film = {};
    let popup = {};

    for (let i = 0; i < arrFilmSlice.length; i++) {

        film = new FilmCard(this._film[i]);
        film.onMarkAsWatchedClick = (evt) => {
          evt.preventDefault();
          popup = new Popup(this._film[i], this._commentArr[i]);
          getNewMokData(`watched`, popup, this._film[i]);
        };
        film.onFavoriteClick = (evt) => {
          evt.preventDefault();
          popup = new Popup(this._film[i], this._commentArr[i]);
          getNewMokData(`favorites`, popup, this._film[i]);
        };
        film.onAddToWatchlistClick = (evt) => {
          evt.preventDefault();
          popup = new Popup(this._film[i], this._commentArr[i]);
          getNewMokData(`watchlist`, popup, this._film[i]);
        };

        film.onToggleFilm = (evt) => {
          popup = new Popup(this._film[i], this._commentArr[i]);
          filmToggle(evt, popup, this._film[i]);
        };

        render(this._containerCard, film.getElement(), Position.BEFOREEND);
    }
    const getNewMokData = (nameOfList, popups, oldData) => {
      const formData = new FormData(popups.getElement().querySelector(`.film-details__inner`));
      const switchTrueFalse = (v) => !v;
      const userRatio = formData.getAll(`score`);

      const entry = {
        controls: {
          isFavorite: Boolean(formData.get(`favorites`)),
          isAddedToWatchlist: Boolean(formData.get(`watchlist`)),
          isMarkedAsWatched: Boolean(formData.get(`watched`)),
          userRatio: `Your rate ${userRatio}`,
        }
      };
      switch (nameOfList) {
        case `favorites`:
          entry.controls.isFavorite = switchTrueFalse(entry.controls.isFavorite);
          break;
        case `watchlist`:
          entry.controls.isAddedToWatchlist = switchTrueFalse(entry.controls.isAddedToWatchlist);
          break;
        case `watched`:
          entry.controls.isMarkedAsWatched = switchTrueFalse(entry.controls.isMarkedAsWatched);
          break;
      }
      this._onDataChange(entry, this._containerCard, oldData);
    };
  }
}
export default MovieController;