import BaseComponent from '../../core/base-component';
import { MAX_REZULT_ROWS } from '../../modules/constants';
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
    if (event.target && (event.target as HTMLElement).closest('[data-type="sourceCard"]')) {
      const elem = (event.target as HTMLElement).closest('[data-type="sourceCard"]') as HTMLElement;
      const cardNumber = elem.getAttribute('data-card-number');
      this.store.dispatch({
        type: ActionID.MoveSorceCard,
        cardNumber: cardNumber as string,
      });
    } else if (event.target && (event.target as HTMLElement).closest('[data-type="rezultCard"]')) {
      const elem = (event.target as HTMLElement).closest('[data-type="rezultCard"]') as HTMLElement;
      const cardNumber = elem.getAttribute('data-card-number');
      this.store.dispatch({
        type: ActionID.MoveRezultCard,
        cardNumber: cardNumber as string,
      });
    } else if (event.target && (event.target as HTMLElement).closest('[data-type="continueButton"]')) {
      const { sentenceSuccess, roundComplete } = this.store.getState().appData;
      if (sentenceSuccess && !roundComplete) {
        this.store.dispatch({
          type: ActionID.NextSentence,
        });
      } else if (sentenceSuccess && roundComplete) {
        this.store.dispatch({
          type: ActionID.NextRound,
        });
      }
    }
  };

  private getRowLayout(sentenceNumber: number, isShow: boolean): string {
    const { currentRezultMatrix } = this.store.getState().appData;
    const rowLayout = currentRezultMatrix[sentenceNumber]
      .map(
        (item) =>
          `<div class="game__word-card ${isShow ? 'game__word-card_show game__word-card_complete' : ''} rezult-card">${item.word}</div>`
      )
      .join('');

    return `<div class="game__picture-row" data-row="${sentenceNumber + 1}">${rowLayout}</div>`;
  }

  private getCurrentRowLayout(sentenceNumber: number): string {
    const { cardsInCurrentRezultRow, cardsSourceInRow, etalonRezultMatrix } = this.store.getState().appData;
    let rezultLayout = '';

    for (let i = 0; i < cardsInCurrentRezultRow.length; i += 1) {
      rezultLayout += `<div class="game__word-card game__word-card_show game__word-card_current rezult-card" data-type="rezultCard" data-card-number="${cardsInCurrentRezultRow[i]}">${etalonRezultMatrix[sentenceNumber][cardsInCurrentRezultRow[i]].word}</div>`;
    }

    for (let i = 0; i < cardsSourceInRow.length; i += 1) {
      rezultLayout += `<div class="game__word-card rezult-card">${etalonRezultMatrix[sentenceNumber][cardsSourceInRow[i]].word}</div>`;
    }

    return `<div class="game__picture-row" data-row="${sentenceNumber + 1}">${rezultLayout}</div>`;
  }

  private getSourceRowLayout(sentenceNumber: number): string {
    const { roundComplete, cardsSourceInRow, cardsInCurrentRezultRow, etalonRezultMatrix } =
      this.store.getState().appData;
    let rezultLayout = '';

    if (roundComplete) {
      return '<div class="source-cards__card"></div>';
    }

    for (let i = 0; i < cardsSourceInRow.length; i += 1) {
      rezultLayout += `<div class="source-cards__card source-cards__card_show" data-type="sourceCard"  data-card-number="${cardsSourceInRow[i]}">${etalonRezultMatrix[sentenceNumber][cardsSourceInRow[i]].word}</div>`;
    }

    for (let i = 0; i < cardsInCurrentRezultRow.length; i += 1) {
      rezultLayout += `<div class="source-cards__card" data-type="sourceCard">${etalonRezultMatrix[sentenceNumber][cardsInCurrentRezultRow[i]].word}</div>`;
    }

    return rezultLayout;
  }

  private toHTML(): string {
    const { sentenceSuccess, currentSentenceNumber } = this.store.getState().appData;
    const sourceRowLayout: string = this.getSourceRowLayout(currentSentenceNumber);

    const rowsLayout: string = new Array(MAX_REZULT_ROWS)
      .fill(null)
      .map((_, index): string => {
        if (index === currentSentenceNumber && !sentenceSuccess) {
          return this.getCurrentRowLayout(index);
        } else {
          const isShow = index < currentSentenceNumber || (index === currentSentenceNumber && sentenceSuccess);
          return this.getRowLayout(index, isShow);
        }
      })
      .join('');

    return `
    <div class="container game__container">
      <div class="game__picture">
        ${rowsLayout}
      </div>

      <div class="game__word-cards source-cards">
        ${sourceRowLayout}
      </div>

      <button class="game__continue-button" data-type="continueButton" ${sentenceSuccess ? '' : 'disabled'}>Continue</button>
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
