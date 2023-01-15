/*
General Code Structure Taken from Isaac Computer Science https://isaaccomputerscience.org/concepts/dsa_datastruct_queue?examBoard=all&stage=all
The Psuedocode was followed to write the Enqueue method
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


    Enqueue(cardDataObject){

        let node = new Node(cardDataObject);

        if(this.checkIfEmpty()){

            //If the queue is empty, then set the front and rear to the new node
            this.front = node;
            this.rear = node;
        }
        else{
            //If the new node's priority greater than the front, insert the new node at the front
            if(node.value.priority > this.front.value.priority){ 
                node.next = this.front;
                this.front = node;
            }

            //If the new node's priority is less than the rear value, the previous lowest priority, then set the rear to this new node
            else if(node.value.priority <= this.rear.value.priority){
                this.rear.next = node;
                this.rear = node;
            }
            else{
                //Else, find the position of insertion (inserted before the first element of a lower priority)
                let currentNode = this.front;
                let previous= null;
                while(currentNode.value.priority >= node.value.priority){
                    previous = currentNode;
                    currentNode = currentNode.next;
                }
                node.next = currentNode;
                previous.next = node;
            }
        }


    }
}

module.exports = {Queue};