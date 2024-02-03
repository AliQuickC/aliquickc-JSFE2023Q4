import Component from './component';
import Timer from '../modules/timer';

export default class GameTimer extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {
    const {timerValue} = this.store.getState().userData;
    this.timer = new Timer(timerValue);
    this.timer.addEventListener('changeTime', this.changeTimeHandler);
  }

  startTimer = () => {
    this.timer.startTimer();
  };

  pauseTimer = () => {
    this.timer.pauseTimer();
  };

  changeTimeHandler = (event) => {
    this.store.dispatch({
      type: 'RENEW_TIMER_VALUE',
      time: this.timer.getTimeProgress(),
    });
    this.renewTime(event.time);
  };

  isActive = () => {
    return this.timer.isActive();
  };

  destroy() {
    if (this.timer) {
      this.timer.stopTimer();
      this.timer.removeEventListener('changeTime', this.changeTimeHandler);
      delete this.timer;
    }
  }

  toHTML() {
    const {timerValue} = this.store.getState().userData;
    return this.getTimeString(timerValue);
  }

  getTimeString(time) {
    const secomds = (time % 60).toString(10).padStart(2, '0');
    const minuts = Math.floor(time / 60)
      .toString(10)
      .padStart(2, '0');
    return `${minuts}:${secomds}`; // 00:00-99:99
  }

  renewTime = (time) => {
    this.container.textContent = this.getTimeString(time);
  };

  render = () => {
    this.container.textContent = this.toHTML();
    return this.container;
  };
}
