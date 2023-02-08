class SuperMemo{
    constructor({intervalNum, repitition, efactor}, grade){
        //when following the psuedocode, these values, except for grade, are the previous values. Updated values will be returned and added to the db
        this.interval = intervalNum; 
        this.repitition = repitition;
        this.efactor = efactor;
        this.grade = grade;
    }

    superMemo(){
        if(this.grade > 3){
            switch(this.repitition){
                case 0:
                    this.interval = 1;
                case 1:
                    this.interval = 6;
                default:
                    this.interval *= this.efactor;
            }
            this.repitition++;
            this.efactor += (0.1 - (5 - this.grade) * (0.08 + (5 - this.grade) * 0.02));
        }
        else{
            this.repitition = 0;
            this.interval = 1;
        }
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
