import Component from './component';
import Timer from '../modules/timer';
import {getTimeString} from '../core/utils';

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
    return getTimeString(timerValue);
  }

  renewTime = (time) => {
    this.container.textContent = getTimeString(time);
  };

  render = () => {
    this.container.textContent = this.toHTML();
    return this.container;
  };
}
