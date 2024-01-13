import './sass/main.sass';
import reducer from './modules/reducer';
import createStore from './redux/store';
import App from './components/app';

const initialState = {
  questions: [
    'Кондитер',
    'Подлокотник',
    'Самовар',
    'Кафель',
    'Хроника',
    'Башня',
    'Барак',
    'Скворечник',
    'Развлечение',
    'Пробор',
    'Комбинация',
    'Мешковина',
    'Процессор',
    'Прокол',
    'Абзац',
    'Караван',
    'Фунт',
    'Радиатор',
    'Клавиатура',
    'Заварушка',
    'Магнитофон',
    'Кружево',
    'Галера',
    'Балл',
    'Фильтр',
    'Пламя',
    'Омар',
    'Груз',
  ],
  userData: {
    currentQuestion: null,
    numberOfMistakes: 0,
    questionsUsed: [],
  },
};

const store = createStore(reducer, initialState);

const app = new App(store);
app.run();
