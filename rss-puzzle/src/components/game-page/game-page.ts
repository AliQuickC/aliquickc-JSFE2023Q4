import BaseComponent from '../../core/base-component';
import { CURRENT_ROW, REZULT_ROWS } from '../../modules/reducer';
import { ActionID } from '../../types/enum';
import { Store } from '../../types/redux-type';

export default class GamePage extends BaseComponent {
  protected store: Store;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  private init(): void {
    this.container.onclick = this.cardClickHandler;
  }

  public destroy(): void {}

  private cardClickHandler = (event: Event): void => {
    if (event.target && (event.target as HTMLElement).closest('[data-card-source]')) {
      const elem = (event.target as HTMLElement).closest('[data-card-source]') as HTMLElement;
      const cardNumber = elem.getAttribute('data-card-source');
      this.store.dispatch({
        type: ActionID.MoveSorceCard,
        cardNumber: cardNumber as string,
      });
    }
    if (event.target && (event.target as HTMLElement).closest('[data-card-rezult]')) {
      const elem = (event.target as HTMLElement).closest('[data-card-rezult]') as HTMLElement;
      const cardNumber = elem.getAttribute('data-card-rezult');
      this.store.dispatch({
        type: ActionID.MoveRezultCard,
        cardNumber: cardNumber as string,
      });
    }
  };

  private getRowLayout(index: number, isShow: boolean): string {
    const { currentRezultMatrix } = this.store.getState().appData;
    const rowLayout = currentRezultMatrix[index]
      .map(
        (item) =>
          `<div class="game__word-card ${isShow ? 'game__word-card_show game__word-card_complete' : ''} rezult-card">${item.word}</div>`
      )
      .join('');

    return `<div class="game__picture-row" data-row="${index + 1}">${rowLayout}</div>`;
  }

  private getCurrentRowLayout(index: number): string {
    const { cardsInCurrentRezultRow, cardsSourceInRow, etalonRezultMatrix } = this.store.getState().appData;
    let rezultLayout = '';

    for (let i = 0; i < cardsInCurrentRezultRow.length; i += 1) {
      rezultLayout += `<div class="game__word-card game__word-card_show game__word-card_current rezult-card" data-card-rezult="${cardsInCurrentRezultRow[i]}">${etalonRezultMatrix[index][cardsInCurrentRezultRow[i]].word}</div>`;
    }

    for (let i = 0; i < cardsSourceInRow.length; i += 1) {
      rezultLayout += `<div class="game__word-card rezult-card">${etalonRezultMatrix[index][cardsSourceInRow[i]].word}</div>`;
    }

    return `<div class="game__picture-row" data-row="${index + 1}">${rezultLayout}</div>`;
  }

  private getSourceRowLayout(index: number): string {
    const { cardsSourceInRow, cardsInCurrentRezultRow, etalonRezultMatrix } = this.store.getState().appData;
    let rezultLayout = '';

    for (let i = 0; i < cardsSourceInRow.length; i += 1) {
      rezultLayout += `<div class="source-cards__card source-cards__card_show" data-type="sourceCard"  data-card-source="${cardsSourceInRow[i]}">${etalonRezultMatrix[index][cardsSourceInRow[i]].word}</div>`;
    }

    for (let i = 0; i < cardsInCurrentRezultRow.length; i += 1) {
      rezultLayout += `<div class="source-cards__card" data-type="sourceCard">${etalonRezultMatrix[index][cardsInCurrentRezultRow[i]].word}</div>`;
    }

    return rezultLayout;
  }

  private toHTML(): string {
    const randomSentenceWordLayout: string = this.getSourceRowLayout(CURRENT_ROW);

    const rowsLayout: string = new Array(REZULT_ROWS)
      .fill(null)
      .map((_, index): string =>
        index === CURRENT_ROW ? this.getCurrentRowLayout(index) : this.getRowLayout(index, index < CURRENT_ROW)
      )
      .join('');

    return `
    <div class="container game__container">
      <div class="game__picture">
        ${rowsLayout}
      </div>

      <div class="game__word-cards source-cards">
        ${randomSentenceWordLayout}
      </div>
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
