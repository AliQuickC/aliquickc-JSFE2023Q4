class App {
  constructor(props) {
    this.container = document.body;
    this.store = props;
    this.init();
  }

  init() {}

  destroy() {}

  run() {
    this.render();
  }

  toHTML() {
    return `
    <main class="app">
      <div class="app__container container">
        <div class="gallows">
          <div class="gallows__picture gallows-picture"></div>
        </div>
        <div class="quiz"></div>
        <div class="keyboard"></div>
      </div>
    </main>`;
  }

  render() {
    this.container.innerHTML = this.toHTML();
    return this.container;
  }
}
export default App;
