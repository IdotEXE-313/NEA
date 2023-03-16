//For more information on this algorithm, see https://super-memory.com/english/ol/sm2.htm

class SuperMemo{
    constructor(intervalNum, repitition, efactor, grade){
        //when following the psuedocode, these values, except for grade, are the previous values. Updated values will be returned and added to the db
        this.interval = intervalNum; //the interval of days
        this.repitition = repitition; //the number of times the card has been reviewed
        this.efactor = efactor; //ease-factor. Plays a role in determining the interval
        this.grade = grade; //grade from 0 - 5
    }

    superMemo(){
        if(this.grade > 3){
            switch(this.repitition){
                case 0:
                    this.interval = 1; //set the next review date to the next day if the grade is greater than 3 and the rep is 0
                    break;
                case 1:
                    this.interval = 6; //set the next review date to the next day if the grade is greater than 3 and the rep is 1
                    break;
                default:
                    this.interval *= this.efactor; //otherwise, use the ease factor to determine the next interval
                    break;
            }
            this.repitition++;
            this.efactor += (0.1 - (5 - this.grade) * (0.08 + (5 - this.grade) * 0.02)); //update the ease factor. See link above for more info
        }
        else{
            //grade is less than 3, so reset any values associated with the card
            this.repitition = 0;
            this.interval = 1;
        }
        //never let the e-factor go below 1.3
        if(this.efactor < 1.3){
            this.efactor = 1.3;
        }
        return({
            interval: this.interval,
            repetition: this.repitition,
            efactor: this.efactor
        });
    }
}

module.exports = {SuperMemo};
