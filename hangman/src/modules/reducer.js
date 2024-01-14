import randomInteger from '../core/utils';

const MAX_MISTAKES = 6;

export default function reducer(stateData, action) {
  const state = stateData;
  let newQuestionNum;
  let wordArr;
  let guessingChars = [];
  switch (action.type) {
    case 'INIT_NEW_GAME':
      if (state.userData.questionsUsed < state.riddles.length) {
        while (state.userData.questionsUsed < state.riddles.length) {
          newQuestionNum = randomInteger(0, state.riddles.length - 1);
          if (state.userData.questionsUsed.indexOf(newQuestionNum) === -1) break;
        }
      } else {
        /* eslint-disable-next-line no-console */
        console.log('вопросы закончились!');
      }
      state.userData = {
        currentQuestion: newQuestionNum,
        questionsUsed: [...state.userData.questionsUsed, newQuestionNum],
        numberOfMistakes: 0,
        guessingChars: Array(state.riddles[newQuestionNum].word.length).fill(false),
        UsedChars: [],
      };
      /* eslint-disable-next-line no-console */
      console.log('riddles: ', state.riddles[newQuestionNum]);
      return state;
    case 'INPUT_CHAR':
      if (
        state.userData.UsedChars.indexOf(action.char.toUpperCase()) === -1 &&
        state.userData.numberOfMistakes < MAX_MISTAKES
      ) {
        wordArr = state.riddles[state.userData.currentQuestion].word.toUpperCase().split('');

        guessingChars = [...state.userData.guessingChars];
        if (wordArr.indexOf(action.char.toUpperCase()) !== -1) {
          wordArr.forEach((element, index) => {
            if (element.toUpperCase() === action.char.toUpperCase()) {
              guessingChars[index] = true;
            }
          });
          // game end ???
          /* eslint-disable-next-line no-console */
          if (guessingChars.every((item) => item)) console.log('Слово угадано !');
        } else {
          if (state.userData.numberOfMistakes + 1 === MAX_MISTAKES) {
            // game end
            /* eslint-disable-next-line no-console */
            console.log('Поражение !');
          }
          state.userData = {...state.userData, numberOfMistakes: state.userData.numberOfMistakes + 1};
        }

        // template for guessed word
        state.userData.guessingChars = guessingChars;
        // chars that were selected earlier
        state.userData.UsedChars = [...state.userData.UsedChars, action.char.toUpperCase()];
      }
      return state;
    case 'APPLY_EXECUTION':
      return state;
    default:
      return state;
  }
}
