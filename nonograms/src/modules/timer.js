import Publisher from '../core/publisher';

export default class Timer extends Publisher {
  static TIMER_INTERVAL = 1000;

  static PROGRESS_MIN_VALUE = 0;

  static PROGRESS_MAX_VALUE = 5999;

  constructor(time) {
    super();
    /* eslint-disable no-underscore-dangle */
    this._timeId = null;
    this._timerValie = time || 0;
    this._active = false;
  }

  isActive() {
    return this._active;
  }

  getTimeProgress() {
    return this._timerValie;
  }

  setTimeProgress(time) {
    this._timerValie = time;
  }

  startTimer() {
    clearInterval(this._timeId);

    this._active = true;
    this._timeId = setInterval(() => {
      this._timerValie += 1;
      this._triggerEvent('changeTime', {time: this._timerValie});
      if (this._timerValie === Timer.PROGRESS_MAX_VALUE) {
        // callback();
        clearInterval(this._timeId);
        this._active = false;
      }
    }, Timer.TIMER_INTERVAL);
  }

  pauseTimer() {
    clearInterval(this._timeId);
    this._active = false;
  }

  stopTimer() {
    clearInterval(this._timeId);
    this._timerValie = 0;
    this._active = false;
  }

  destroy() {}
}
