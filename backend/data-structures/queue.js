/*
General Code Structure Taken from Isaac Computer Science https://isaaccomputerscience.org/concepts/dsa_datastruct_queue?examBoard=all&stage=all
The Psuedocode was followed to write the Enqueue method. 
*/


class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.front = null;
        this.rear = null;
    }

    checkIfEmpty = () => {return this.front === null};


    enqueue(cardDataObject){

        let node = new Node(cardDataObject);

        if(this.checkIfEmpty()){

            //If the queue is empty, then set the front and rear to the new node
            this.front = node;
            this.rear = node;
        }
        else{
            //If the new node's priority greater than the front, insert the new node at the front
            if(node.value.Priority > this.front.value.Priority){ 
                node.next = this.front;
                this.front = node;
            }

            //If the new node's priority is less than the rear value, the previous lowest priority, then set the rear to this new node
            else if(node.value.Priority <= this.rear.value.Priority){
                this.rear.next = node;
                this.rear = node;
            }
            else{
                //Else, find the position of insertion (inserted before the first element of a lower priority)
                let currentNode = this.front;
                let previous= null;
                while(currentNode.value.Priority >= node.value.Priority){
                    previous = currentNode;
                    currentNode = currentNode.next;
                }
                node.next = currentNode;
                previous.next = node;
            }
        };
    }

    dequeue(){

        if(this.checkIfEmpty()){
            return ({value: null});
        }
        
              //Set the new front of the queue to the next item in the queue
        let itemToRemove = this.front;
        this.front = this.front.next;
        
        return({value: itemToRemove});
    }
}

module.exports = {Queue};