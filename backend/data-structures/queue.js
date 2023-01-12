class Node{
    constructor(){
        this.value = null;
        this.next = null;
        this.priority = null;
    }
}

class Queue{
    constructor(){
        this.head = null;
    }
    Enqueue(cardDataObject){
        let priority = cardDataObject.priority;
        let node = new Node();

        traverse() {
            if(node.priority > node.next.priority){ //say, priority 2 compared to priority 1, then traverse
                traverse();
            }
        }

    }
}


module.exports = {Queue};