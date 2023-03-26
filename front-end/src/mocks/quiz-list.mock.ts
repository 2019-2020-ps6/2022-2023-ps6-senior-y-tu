import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_GEOGRAPHIE: Question = {
    id: '1',
    intitule: 'Quelle est la capitale de la France ?',
    responses: [
        {
            valeur: 'Madrid',
            estCorrect: false,
        },
        {
            valeur: 'Paris',
            estCorrect: true,
        },
        {
            valeur: 'Berlin',
            estCorrect: false,
        },
        {
            valeur: 'Marseille',
            estCorrect: false,
        },
    ],
    img: '/assets/drapeauFrance.png',
    explication:'Paris, capitale de la France, est une grande ville européenne et un centre mondial de l\'art, de la mode, de la gastronomie et de la culture.'
};

export const QUESTION_LIST: Question[] = [QUESTION_GEOGRAPHIE];


export const QUIZ_LISTE: Quiz[] = [
    {
        id: '1',
        nom: 'Les Capitales',
        theme: 'Géographie',
        image: 'https://www.babelio.com/users/QUIZ_10-capitales-europeennes-dans-ces-films-cultes_5756.jpeg',
        questions: QUESTION_LIST,
    },
    {
        id: '2',
        nom: 'Les plantes d intérieur',
        theme: 'Végétation',
        image: 'https://i.la-croix.com/729x486/smart/2021/12/27/1201192040/Canopee-darbres-jungle-tropicale-photo-dillustration_0.jpg',
        questions: [],
    },
    {
        id: '3',
        nom: 'Les Fleurs',
        theme: 'Végétation',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjqs1gwFXjnQFWgtfGsMsqQJlA6EnHnAuODhRVUOYmXw&s',
        questions: [],
    },
    {
        id: '4',
        nom: 'Les pays Europeens',
        theme: 'Géographie',
        image: 'data:image/jpeg;base64,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',
        questions: [],
    }
];
