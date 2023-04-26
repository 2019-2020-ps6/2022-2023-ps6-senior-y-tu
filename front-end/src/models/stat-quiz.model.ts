export interface temps{
  minutes: string;
  secondes: string;
}

export interface StatQuiz {
  id: string;
  nom: string;
  theme: string;
  score: string;
  temps: temps;
  nombreClick: string;
  souris: string;
  image: string;
}
