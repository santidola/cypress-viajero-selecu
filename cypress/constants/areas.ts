export class Areas{
    percentaje: number;
    name: string;
    correct_answers: number = 0;


    constructor(percentaje: number, name: string){
        this.percentaje = percentaje;
        this.name = name;
    }

    asignAswers(correct_answers: number){
        this.correct_answers = correct_answers;
    }
}