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
    this.container.ontouchstart = this.cardMousedownHandler;
    this.container.onmousedown = this.cardMousedownHandler;
  }

  public destroy(): void {}

  private cardMousedownHandler = (event: MouseEvent | TouchEvent): void => {
    if (event.target && (event.target as HTMLElement).closest('[data-type="sourceCard"]')) {
      let shiftX: number;
      let shiftY: number;
      let pageX!: number;
      let pageY!: number;

      // readyMoveCardFromSourceToRezult
      let readyMoveCardFromSourceToRezult: boolean = false;

      const { currentSentenceNumber } = this.store.getState().appData;
      const rezultRowElement = this.container.querySelector(`[data-row="${currentSentenceNumber + 1}"]`) as HTMLElement;
      const { left, right, top, bottom } = rezultRowElement.getBoundingClientRect();

      const elem = (event.target as HTMLElement).closest('[data-type="sourceCard"]') as HTMLElement;
      const elemClone: HTMLElement = elem.cloneNode(true) as HTMLElement;
      const cardNumber: number = +(elem.getAttribute('data-card-number') as string);

      const onMouseMove = (elem: HTMLElement, elemClone: HTMLElement) => {
        return (event: MouseEvent | TouchEvent): void => {
          let pageX!: number;
          let pageY!: number;
          if (event instanceof TouchEvent) {
            pageX = event.changedTouches['0'].pageX;
            pageY = event.changedTouches['0'].pageY;
          } else if (event instanceof MouseEvent) {
            pageX = event.pageX;
            pageY = event.pageY;
          }
          // check leave the screen
          if (pageX <= 0 || pageX >= window.innerWidth || pageY <= 0 || pageY >= window.innerHeight) {
            onMouseUpHandler();
            return;
          }
          const rectCard = elemClone.getBoundingClientRect();
          // check over rezultRowElement
          if (
            ((rectCard.top > top && rectCard.top < bottom) || (rectCard.bottom > top && rectCard.bottom < bottom)) &&
            ((rectCard.left > left && rectCard.left < right) || (rectCard.right > left && rectCard.right < right))
          ) {
            rezultRowElement.classList.add('game__picture-row_red');
            readyMoveCardFromSourceToRezult = true;
          } else {
            rezultRowElement.classList.remove('game__picture-row_red');
            readyMoveCardFromSourceToRezult = false;
          }
          moveAt(pageX, pageY, elemClone);
        };
      };

      const onMouseUp = (elem: HTMLElement, elemClone: HTMLElement) => {
        return (): void => {
          document.removeEventListener('mousemove', onMouseMoveHandler);
          document.removeEventListener('touchmove', onMouseMoveHandler);
          document.removeEventListener('mouseup', onMouseUpHandler);
          document.removeEventListener('touchend', onMouseUpHandler);
          const elemRect = elem.getBoundingClientRect();
          const elemCloneRect = elemClone.getBoundingClientRect();

          if (readyMoveCardFromSourceToRezult) {
            const { cardsInCurrentRezultRow } = this.store.getState().appData;
            const lastCardNumber = cardsInCurrentRezultRow.length;
            let cardLeftPosition: number;

            if (lastCardNumber === 0) {
              cardLeftPosition = left;
            } else {
              const lastElementInRezultRow = rezultRowElement.querySelector(
                `.rezult-card:nth-child(${lastCardNumber})`
              );
              cardLeftPosition = (lastElementInRezultRow as HTMLElement).getBoundingClientRect().right;
            }

            elemClone.style.transition = 'left 0.6s, top 0.6s';
            elemClone.style.left = cardLeftPosition + 'px';
            elemClone.style.top = top + 'px';

            rezultRowElement.classList.remove('game__picture-row_red');
            readyMoveCardFromSourceToRezult = false;

            setTimeout(() => {
              this.store.dispatch({
                type: ActionID.MoveSorceCard,
                cardNumber: cardNumber,
              });
            }, 600);
            return;
          }

          rezultRowElement.classList.remove('game__picture-row_red');
          readyMoveCardFromSourceToRezult = false;

          // check mouse click
          if (Math.abs(elemRect.left - elemCloneRect.left) < 6 && Math.abs(elemRect.top - elemCloneRect.top) < 6) {
            this.store.dispatch({
              type: ActionID.MoveSorceCard,
              cardNumber: cardNumber,
            });
          }

          elemClone.style.transition = 'left 0.6s, top 0.6s';
          elemClone.style.left = elemRect.left + 'px';
          elemClone.style.top = elemRect.top + 'px';
          setTimeout(() => {
            elemClone.remove();
            elem.style.visibility = 'visible';
          }, 600);
        };
      };

      const moveAt = function (pageX: number, pageY: number, element: HTMLElement): void {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
      };

      const onMouseMoveHandler = onMouseMove(elem, elemClone);
      const onMouseUpHandler = onMouseUp(elem, elemClone);

      elemClone.style.position = 'absolute';
      elemClone.style.zIndex = '100';
      elemClone.style.transition = 'left 0.0s, top 0.0s';
      elemClone.style.width = elem.offsetWidth + 'px';
      elemClone.style.height = elem.offsetHeight + 'px';
      document.body.append(elemClone);

      const rect = elem.getBoundingClientRect();

      if (event instanceof TouchEvent) {
        shiftX = event.changedTouches['0'].pageX - rect.left;
        shiftY = event.changedTouches['0'].pageY - rect.top;
        pageX = event.changedTouches['0'].pageX;
        pageY = event.changedTouches['0'].pageY;
      } else if (event instanceof MouseEvent) {
        shiftX = event.pageX - rect.left;
        shiftY = event.pageY - rect.top;
        pageX = event.pageX;
        pageY = event.pageY;
      }

      moveAt(pageX, pageY, elemClone);

      if (event instanceof TouchEvent) {
        document.addEventListener('touchmove', onMouseMoveHandler);
        document.addEventListener('touchend', onMouseUpHandler);
      } else if (event instanceof MouseEvent) {
        document.addEventListener('mousemove', onMouseMoveHandler);
        document.addEventListener('mouseup', onMouseUpHandler);
      }

      elem.style.visibility = 'hidden';
    } else if (event.target && (event.target as HTMLElement).closest('[data-type="rezultCard"]')) {
      let shiftX: number;
      let shiftY: number;
      let pageX!: number;
      let pageY!: number;

      // readyMoveCardFromRezultToSource
      let readyMoveCardFromRezultToSource: boolean = false;
      let readyMoveCardFromRezultToRezult: boolean = false;
      let prevCardNumbAfter: number | null = null;

      const { currentSentenceNumber, cardsInCurrentRezultRow, haveFeedbackWordOrder } = this.store.getState().appData;
      const rezultRowElement = this.container.querySelector(`[data-row="${currentSentenceNumber + 1}"]`) as HTMLElement;
      const {
        left: rezLeft,
        right: rezRight,
        top: rezTop,
        bottom: rezBottom,
      } = rezultRowElement.getBoundingClientRect();
      const rezultCards = rezultRowElement.querySelectorAll('[data-type="rezultCard"]');
      const centerPosRezultCards: number[] = Array.from(rezultCards).map((item) =>
        Math.round(item.getBoundingClientRect().left + item.getBoundingClientRect().width / 2)
      );

      if (haveFeedbackWordOrder) {
        rezultCards.forEach((element) => {
          element.classList.remove('game__word-card_fail');
          element.classList.remove('game__word-card_success');
        });
      }

      const sourceRowElement = this.container.querySelector('.source-cards') as HTMLElement;
      const { left, right, top, bottom } = sourceRowElement.getBoundingClientRect();

      const elem = (event.target as HTMLElement).closest('[data-type="rezultCard"]') as HTMLElement;
      const elemClone: HTMLElement = elem.cloneNode(true) as HTMLElement;
      const cardNumber = +(elem.getAttribute('data-card-number') as string);
      const startPosMoveCard = cardsInCurrentRezultRow.indexOf(cardNumber);
      let posCardAfterEndPosMoveCard = startPosMoveCard;

      const onMouseMove = (elem: HTMLElement, elemClone: HTMLElement) => {
        return (event: MouseEvent | TouchEvent): void => {
          let pageX!: number;
          let pageY!: number;
          if (event instanceof TouchEvent) {
            pageX = event.changedTouches['0'].pageX;
            pageY = event.changedTouches['0'].pageY;
          } else if (event instanceof MouseEvent) {
            pageX = event.pageX;
            pageY = event.pageY;
          }
          // check leave the screen
          if (pageX <= 0 || pageX >= window.innerWidth || pageY <= 0 || pageY >= window.innerHeight) {
            onMouseUpHandler();
            return;
          }
          const rectCard: DOMRect = elemClone.getBoundingClientRect();
          const cardCenter = rectCard.width / 2;
          // check over sourceRowElement
          if (
            ((rectCard.top > top && rectCard.top < bottom) || (rectCard.bottom > top && rectCard.bottom < bottom)) &&
            ((rectCard.left > left && rectCard.left < right) || (rectCard.right > left && rectCard.right < right))
          ) {
            sourceRowElement.classList.add('source-cards_red');
            readyMoveCardFromRezultToSource = true;
          } else {
            sourceRowElement.classList.remove('source-cards_red');
            readyMoveCardFromRezultToSource = false;
          }
          // check over rezultRowElement
          if (
            ((rectCard.top > rezTop && rectCard.top < rezBottom) ||
              (rectCard.bottom > rezTop && rectCard.bottom < rezBottom)) &&
            ((rectCard.left > rezLeft && rectCard.left < rezRight) ||
              (rectCard.right > rezLeft && rectCard.right < rezRight))
          ) {
            const moveCardCenterPos = Math.round(rectCard.left + cardCenter);

            posCardAfterEndPosMoveCard = getCardNumberAfterInsert(moveCardCenterPos, centerPosRezultCards);

            // change cardr positon
            if (prevCardNumbAfter !== posCardAfterEndPosMoveCard) {
              if (prevCardNumbAfter !== null) {
                // unmark
                if (prevCardNumbAfter === cardsInCurrentRezultRow.length) {
                  rezultCards[prevCardNumbAfter - 1].classList.remove('game__word-card_red-end');
                } else {
                  rezultCards[prevCardNumbAfter].classList.remove('game__word-card_red');
                }

                const moveCardPos = cardsInCurrentRezultRow.indexOf(cardNumber);

                // check, can move card?
                if (posCardAfterEndPosMoveCard !== moveCardPos && posCardAfterEndPosMoveCard !== moveCardPos + 1) {
                  if (posCardAfterEndPosMoveCard === cardsInCurrentRezultRow.length) {
                    rezultCards[posCardAfterEndPosMoveCard - 1].classList.add('game__word-card_red-end');
                  } else {
                    rezultCards[posCardAfterEndPosMoveCard].classList.add('game__word-card_red');
                  }
                  readyMoveCardFromRezultToRezult = true;
                }
              }
              prevCardNumbAfter = posCardAfterEndPosMoveCard;
            }
          } else {
            if (prevCardNumbAfter !== null) {
              // unmark
              if (prevCardNumbAfter === cardsInCurrentRezultRow.length) {
                rezultCards[prevCardNumbAfter - 1].classList.remove('game__word-card_red-end');
              } else {
                rezultCards[prevCardNumbAfter].classList.remove('game__word-card_red');
              }
              readyMoveCardFromRezultToRezult = false;
            }
          }
          moveAt(pageX, pageY, elemClone);
        };
      };

      const getCardNumberAfterInsert = function (moveCardCoord: number, cardCoordArray: number[]): number {
        if (moveCardCoord < cardCoordArray[0]) {
          return 0;
        }
        if (moveCardCoord > cardCoordArray[cardCoordArray.length - 1]) return cardCoordArray.length;
        for (let i = 1; i < cardCoordArray.length; i++) {
          if (cardCoordArray[i - 1] <= moveCardCoord && moveCardCoord <= cardCoordArray[i]) {
            return i;
          }
        }
        return 0;
      };

      const onMouseUp = (elem: HTMLElement, elemClone: HTMLElement) => {
        return (): void => {
          document.removeEventListener('mousemove', onMouseMoveHandler);
          document.removeEventListener('touchmove', onMouseMoveHandler);
          document.removeEventListener('mouseup', onMouseUpHandler);
          document.removeEventListener('touchend', onMouseUpHandler);
          const elemRect = elem.getBoundingClientRect();
          const elemCloneRect = elemClone.getBoundingClientRect();

          rezultCards[cardsInCurrentRezultRow.length - 1].classList.remove('game__word-card_red-end');
          rezultCards.forEach((item) => item.classList.remove('game__word-card_red'));

          if (readyMoveCardFromRezultToRezult) {
            if (posCardAfterEndPosMoveCard === cardsInCurrentRezultRow.length) {
              const { right: cardLRightPosition, top: cardTopPosition } =
                rezultCards[posCardAfterEndPosMoveCard - 1].getBoundingClientRect();
              elemClone.style.transition = 'left 0.6s, top 0.6s';
              elemClone.style.left = Math.ceil(cardLRightPosition) + 'px';
              elemClone.style.top = cardTopPosition + 'px';
            } else {
              const { left: cardLeftPosition, top: cardTopPosition } =
                rezultCards[posCardAfterEndPosMoveCard].getBoundingClientRect();
              elemClone.style.transition = 'left 0.6s, top 0.6s';
              elemClone.style.left = Math.ceil(cardLeftPosition) + 'px';
              elemClone.style.top = cardTopPosition + 'px';
            }
            readyMoveCardFromRezultToRezult = false;

            setTimeout(() => {
              this.store.dispatch({
                type: ActionID.replaceRezultCard,
                startPosMoveCard,
                posCardAfterEndPosMoveCard,
              });
            }, 600);
            return;
          }

          if (readyMoveCardFromRezultToSource) {
            const { cardsSourceInRow } = this.store.getState().appData;
            const lastCardNumber = cardsSourceInRow.length;
            let cardLeftPosition: number;

            if (lastCardNumber === 0) {
              cardLeftPosition = left;
            } else {
              const lastElementInRezultRow = sourceRowElement.querySelector(
                `[data-type="sourceCard"]:nth-child(${lastCardNumber})`
              );
              cardLeftPosition = (lastElementInRezultRow as HTMLElement).getBoundingClientRect().right;
            }

            elemClone.style.transition = 'left 0.6s, top 0.6s';
            elemClone.style.left = cardLeftPosition + 'px';
            elemClone.style.top = top + 4 + 'px';

            sourceRowElement.classList.remove('source-cards_red');
            readyMoveCardFromRezultToSource = false;

            setTimeout(() => {
              this.store.dispatch({
                type: ActionID.MoveRezultCard,
                cardNumber,
              });
            }, 600);
            return;
          }

          sourceRowElement.classList.remove('game__picture-row_red');
          readyMoveCardFromRezultToSource = false;
          readyMoveCardFromRezultToRezult = false;

          // check mouse click
          if (Math.abs(elemRect.left - elemCloneRect.left) < 6 && Math.abs(elemRect.top - elemCloneRect.top) < 6) {
            this.store.dispatch({
              type: ActionID.MoveRezultCard,
              cardNumber: cardNumber,
            });
          }

          elemClone.style.transition = 'left 0.6s, top 0.6s';
          elemClone.style.left = elemRect.left + 'px';
          elemClone.style.top = elemRect.top + 'px';
          setTimeout(() => {
            elemClone.remove();
            elem.style.visibility = 'visible';
          }, 600);
        };
      };

      const moveAt = function (pageX: number, pageY: number, element: HTMLElement): void {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
      };

      const onMouseMoveHandler = onMouseMove(elem, elemClone);
      const onMouseUpHandler = onMouseUp(elem, elemClone);

      elemClone.style.position = 'absolute';
      elemClone.style.zIndex = '100';
      elemClone.style.transition = 'left 0.0s, top 0.0s';
      elemClone.style.width = elem.offsetWidth + 'px';
      elemClone.style.height = elem.offsetHeight + 'px';
      document.body.append(elemClone);

      const rect = elem.getBoundingClientRect();

      if (event instanceof TouchEvent) {
        shiftX = event.changedTouches['0'].pageX - rect.left;
        shiftY = event.changedTouches['0'].pageY - rect.top;
        pageX = event.changedTouches['0'].pageX;
        pageY = event.changedTouches['0'].pageY;
      } else if (event instanceof MouseEvent) {
        shiftX = event.pageX - rect.left;
        shiftY = event.pageY - rect.top;
        pageX = event.pageX;
        pageY = event.pageY;
      }

      moveAt(pageX, pageY, elemClone);

      if (event instanceof TouchEvent) {
        document.addEventListener('touchmove', onMouseMoveHandler);
        document.addEventListener('touchend', onMouseUpHandler);
      } else if (event instanceof MouseEvent) {
        document.addEventListener('mousemove', onMouseMoveHandler);
        document.addEventListener('mouseup', onMouseUpHandler);
      }

      elem.style.visibility = 'hidden';
    }
  };

  private cardClickHandler = (event: Event): void => {
    // if (event.target && (event.target as HTMLElement).closest('[data-type="sourceCard"]')) {
    //   const elem = (event.target as HTMLElement).closest('[data-type="sourceCard"]') as HTMLElement;
    //   const cardNumber = +(elem.getAttribute('data-card-number') as string);
    //   this.store.dispatch({
    //     type: ActionID.MoveSorceCard,
    //     cardNumber: cardNumber,
    //   });
    // }
    /*     if (event.target && (event.target as HTMLElement).closest('[data-type="rezultCard"]')) {
      const elem = (event.target as HTMLElement).closest('[data-type="rezultCard"]') as HTMLElement;
      const cardNumber = +(elem.getAttribute('data-card-number') as string);
      this.store.dispatch({
        type: ActionID.MoveRezultCard,
        cardNumber: cardNumber,
      });
    } else  */
    if (event.target && (event.target as HTMLElement).closest('[data-type="continueButton"]')) {
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
    } else if (event.target && (event.target as HTMLElement).closest('[data-type="checkButton"]')) {
      this.store.dispatch({
        type: ActionID.CheckCorrectlyWords,
      });
    } else if (event.target && (event.target as HTMLElement).closest('[data-type="autoCompleteButton"]')) {
      this.store.dispatch({
        type: ActionID.autoCompleteSentence,
      });
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
    const { cardsInCurrentRezultRow, cardsSourceInRow, etalonRezultMatrix, wordOrder, haveFeedbackWordOrder } =
      this.store.getState().appData;
    let rezultLayout = '';

    let feedbackArray: string[] = [];
    if (haveFeedbackWordOrder) {
      feedbackArray = wordOrder.map((item) => (item ? 'game__word-card_success' : 'game__word-card_fail'));
    }

    for (let i = 0; i < cardsInCurrentRezultRow.length; i += 1) {
      rezultLayout += `<div class="game__word-card game__word-card_show game__word-card_current rezult-card ${haveFeedbackWordOrder ? feedbackArray[i] : ''}" data-type="rezultCard" data-card-number="${cardsInCurrentRezultRow[i]}">${etalonRezultMatrix[sentenceNumber][cardsInCurrentRezultRow[i]].word}</div>`;
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
      rezultLayout += `<div class="source-cards__card source-cards__card_show" data-type="sourceCard"  data-card-number="${cardsSourceInRow[i]}" >${etalonRezultMatrix[sentenceNumber][cardsSourceInRow[i]].word}</div>`;
    }

    for (let i = 0; i < cardsInCurrentRezultRow.length; i += 1) {
      rezultLayout += `<div class="source-cards__card" data-type="sourceCard">${etalonRezultMatrix[sentenceNumber][cardsInCurrentRezultRow[i]].word}</div>`;
    }

    return rezultLayout;
  }

  private toHTML(): string {
    const { sentenceSuccess, currentSentenceNumber, cardsSourceInRow } = this.store.getState().appData;
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

    const disableContinueButton = !(cardsSourceInRow.length === 0);

    return `
    <div class="container game__container">
      <div class="game__picture">
        ${rowsLayout}
      </div>

      <div class="game__word-cards source-cards">
        ${sourceRowLayout}
      </div>

      <div class="game__buttons-wrap">
        <button class="game__autocomplete-button" ${sentenceSuccess ? 'disabled' : ''} data-type="autoCompleteButton">Autocomplete</button>
        <button class="game__continue-button" data-type=${sentenceSuccess ? 'continueButton' : 'checkButton'} ${disableContinueButton ? 'disabled' : ''}>${sentenceSuccess ? 'Continue' : 'Check'}</button>
      </div>
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
