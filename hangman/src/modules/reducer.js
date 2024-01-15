import randomInteger from '../core/utils';

const MAX_MISTAKES = 6;

export default function reducer(stateData, action) {
  const state = stateData;
  let newQuestionNum;
  let wordArr;
  let guessingChars = [];
  switch (action.type) {
    case 'INIT_NEW_GAME':
      if (state.userData.questionsUsed.length < state.riddles.length) {
        while (state.userData.questionsUsed.length < state.riddles.length) {
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
        isFinishGame: false,
        gameFinishRezult: '',
      };
      return state;
    case 'INPUT_CHAR':
      if (state.userData.UsedChars.indexOf(action.char.toUpperCase()) === -1 && !state.userData.isFinishGame) {
        wordArr = state.riddles[state.userData.currentQuestion].word.toUpperCase().split('');

        guessingChars = [...state.userData.guessingChars];
        if (wordArr.indexOf(action.char.toUpperCase()) !== -1) {
          wordArr.forEach((element, index) => {
            if (element.toUpperCase() === action.char.toUpperCase()) {
              guessingChars[index] = true;
            }
          });
          if (guessingChars.every((item) => item)) {
            state.userData = {
              ...state.userData,
              isFinishGame: true,
              gameFinishRezult: 'guessed',
            };
          }
        } else if (state.userData.numberOfMistakes + 1 === MAX_MISTAKES) {
          state.userData = {
            ...state.userData,
            numberOfMistakes: state.userData.numberOfMistakes + 1,
            isFinishGame: true,
            gameFinishRezult: 'execution',
          };
        } else {
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
