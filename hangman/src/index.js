import './sass/main.sass';
import reducer from './modules/reducer';
import createStore from './redux/store';
import App from './components/app';

const initialState = {
  riddles: [
    {question: 'профессия', word: 'Кондитер'},
    {question: 'приспособление для улучшения эргономики', word: 'Подлокотник'},
    {question: 'Металлический сосуд', word: 'Самовар'},
    {question: 'отделочный материал', word: 'Кафель'},
    {question: 'череда событий', word: 'Хроника'},
    {question: 'Строительное сооружение', word: 'Башня'},
    {question: 'сбой на производстве', word: 'Барак'},
    {question: 'гнездо для птици', word: 'Скворечник'},
    {question: 'времяпрепровождение', word: 'Развлечение'},
    {question: 'ровная линия', word: 'Пробор'},
    {question: 'Сочетание, взаимное расположение', word: 'Комбинация'},
    {question: 'прочная ткань', word: 'Мешковина'},
    {question: 'техническое изделие', word: 'Процессор'},
    {question: 'повреждение', word: 'Прокол'},
    {question: 'форма текста', word: 'Абзац'},
    {question: 'группа животных перевозящих грузы', word: 'Караван'},
    {question: 'единица измерения', word: 'Фунт'},
    {question: 'устройство для рассеивания тепла', word: 'Радиатор'},
    {question: 'Система клавиш', word: 'Клавиатура'},
    {question: 'запутанное дело', word: 'Заварушка'},
    {question: 'Аппарат для записи и воспроизведения звука', word: 'Магнитофон'},
    {question: ' Узорчатое, сетчатое плетёное изделие', word: 'Кружево'},
    {question: 'военное судно', word: 'Галера'},
    {question: 'Единица оценки', word: 'Балл'},
    {question: 'Устройство для очистки', word: 'Фильтр'},
    {question: 'Огонь, поднимающийся над горящим предметом', word: 'Пламя'},
    {question: 'Морское беспозвоночное', word: 'Омар'},
    {question: 'тяжелый предмет', word: 'Груз'},
  ],
  userData: {
    currentQuestion: 20,
    numberOfMistakes: 1,
    guessingLetters: [1, 3],
    questionsUsed: [],
  },
};


const store = createStore(reducer, initialState);

const app = new App(store);
app.run();
