import {default as AbstractComponent} from './abstract';
class Statistic extends AbstractComponent {
  constructor(Title) {
    super();
    this._titleUser = Title;
  }
  getTemplate() {
    return `<section class="statistic visually-hidden">
  <p class="statistic__rank">
    You rank
<img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  <span class="statistic__rank-label">${this._titleUser}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
  <p class="statistic__filters-description">Show stats:</p>

<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
<label for="statistic-all-time" class="statistic__filters-label">All time</label>

<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
  <label for="statistic-today" class="statistic__filters-label">Today</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
  <label for="statistic-week" class="statistic__filters-label">Week</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
  <label for="statistic-month" class="statistic__filters-label">Month</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
  <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
  <li class="statistic__text-item">
  <h4 class="statistic__item-title">You watched</h4>
<p class="statistic__item-text"><span class="statistic__item-count"> </span> <span class="statistic__item-description">movies</span></p>
</li>
<li class="statistic__text-item">
  <h4 class="statistic__item-title">Total duration</h4>
<p class="statistic__item-text"><span class="statistic__item-hour"></span> <span class="statistic__item-description">h</span><span class="statistic__item-minute"></span> <span class="statistic__item-description">m</span></p>
</li>
<li class="statistic__text-item">
  <h4 class="statistic__item-title">Top genre</h4>
<p class="statistic__item-text statistic__item-text--genre">Sci-Fi</p>
  </li>
  </ul>

  <div class="statistic__chart-wrap">
  <canvas class="statistic__chart" width="1000"></canvas>
  </div>

  </section>`;
  }


  bind() {
    const element = this._element;
    const formStat = element.querySelectorAll(`.statistic__filters-input`);
    for (let item of formStat) {
      item.addEventListener(`change`, ()=> {
        if (item.value === `week`) {
          this.getStatWeek();
        } else if (item.value === `all-time`) {
          this.getStatAll();
        } else if (item.value === `month`) {
          this.getStatMonth();
        } else if (item.value === `today`) {
          this.getStatToday();
        } else if (item.value === `year`) {
          this.getStatYear();
        }
      });
    }
  }

  getStatWeek() {}
  getStatAll() {}
  getStatToday() {}
  getStatMonth() {}
  getStatYear() {}
}
export default Statistic;
