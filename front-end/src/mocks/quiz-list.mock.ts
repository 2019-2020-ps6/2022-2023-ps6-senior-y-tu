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
    ]
};

export const QUIZ_LISTE: Quiz[] = [
    {
        nom: 'Les Capitales',
        theme: 'Géographie',
        image: 'https://img2.freepng.fr/20180205/epe/kisspng-world-map-globe-geography-global-ocean-europe-asia-america-africa-5a7851bd2038a8.063068011517834685132.jpg',
        questions: [],
    },
    {

        nom: 'Les plantes d intérieur',
        theme: 'Végétation',
        image: 'https://img2.freepng.fr/20180716/jjx/kisspng-flowerpot-houseplant-grasses-http-cookie-pflanzen-5b4c492bd43611.4029423015317261238692.jpg',
        questions: [],
    }
];
