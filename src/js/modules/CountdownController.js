/* eslint-disable no-throw-literal */
// eslint-disable-next-line max-classes-per-file
class FormatCountdown {
  constructor() {
    this.second = 0;
    this.minutes = 0;
  }

  format(countdown) {
    this.minutes = Math.floor(countdown / 60);
    this.second = countdown % 60;

    if (this.second < 10) this.second = `0${this.second}`;
    if (this.minutes < 10) this.minutes = `0${this.minutes}`;

    return `${this.minutes}:${this.second}`;
  }
}

export default class CountdownController {
  constructor(countdown) {
    this.countdown = countdown;
  }

  start(fun) {
    if (this.interval) throw 'timer is already there';

    const formatCountdown = new FormatCountdown();

    this.interval = window.setInterval(() => {
      if (!this.isPause) {
        if (this.countdown === 0) return this.clear();

        this.countdown -= 1;

        fun(formatCountdown.format(this.countdown));
      }
    }, 1000);
  }

  replay() {
    if (!this.isPause) throw 'Timer is not paused';

    this.isPause = false;
  }

  clear() {
    if (this.interval) return clearInterval(this.interval);

    throw 'There is no Timer';
  }

  pause() {
    if (this.interval) {
      this.isPause = true;

      return;
    }

    throw 'There is no Timer';
  }
}
