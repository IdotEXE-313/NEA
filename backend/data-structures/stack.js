class Node {
    constructor(){
        this.value = null;
        this.next = null;
    }
}


class Stack{
    constructor(){
        this.head = null; //implemented as a linked list, so top is the head of the list
        this.size = 0;
    }
    push(card){
        if(this.size === 0){
            this.head = card;
            this.size++;
            return;
        }
        this.size++;
        let node = new Node();
        node.next = this.head; //shift the previous value one down from the top, since a new item has been added
        node.value = card; //add the newly added card to the top of the stack
        this.head = node;

    }
    pop(){
       
    }
}

const stack = new Stack();
stack.push("Hello");
stack.push("Hi");
stack.push("Hello Again");

console.log(stack);