class Node {
  constructor(key = null, value = null) {
    (this.key = key), (this.value = value), (this.nextNode = null);
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(key, value) {
    if (this.head === null) {
      const node = new Node(key, value);
      this.head = node;
      this.tail = node;
      this.size++;
    } else {
      this.tail.nextNode = new Node(key, value);
      this.tail = this.tail.nextNode;
      this.size++;
    }
  }

  prepend(key, value) {
    if (this.head === null) {
      const node = new Node(key, value);
      this.head = node;
      this.tail = node;
      this.size++;
    } else {
      const node = new Node(key, value);
      node.nextNode = this.head;
      this.head = node;
      this.size++;
    }
  }

  at(index) {
    let currentNode = this.head;
    let count = 0;

    while (currentNode) {
      if (index === count) {
        return currentNode;
      }

      count++;
      currentNode = currentNode.nextNode;
    }
    return -1;
  }

  pop() {
    if (this.head === null) {
      return;
    }
    this.size--;
    this.tail = this.at(this.size - 1);
    this.tail.nextNode = null;
  }

  contains(key) {
    let current = this.head;

    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.nextNode;
    }

    return false;
  }

  find(key) {
    let current = this.head;
    let count = 0;

    while (current) {
      if (current.key === key) {
        return count;
      }
      current = current.nextNode;
      count++;
    }

    return null;
  }

  toString() {
    let current = this.head;
    let string = "";
    let count = 0;

    if (current === null) {
      return (string = "null");
    }

    while (current) {
      if (count === 0) {
        string += `( ${current.key} )`;
      } else if (current.nextNode === null) {
        return (string += ` -> ( ${current.key} ) -> ${current.nextNode}`);
      } else {
        string += ` -> ( ${current.key} )`;
      }
      count++;
      current = current.nextNode;
    }
  }

  insertAt(key, value, index) {
    if (index === 0) {
      return this.prepend(key, value);
    }
    if (index === this.size) {
      return this.append(key, value);
    }
    if (index > this.size) {
      return console.log(
        "Index exceeded the list size, please use append() method to add to the end of the list"
      );
    }

    const node = new Node(key, value);
    let current = this.head;
    let count = 0;

    while (current) {
      if (index === count + 1) {
        const splitNode = current.nextNode;
        current.nextNode = node;
        node.nextNode = splitNode;
        this.size++;
        return;
      }
      current = current.nextNode;
      count++;
    }
  }

  removeAt(index) {
    if (index === 0) {
      const newHead = this.head.nextNode;
      this.head = newHead;
      this.size--;
      return;
    }
    if (index === this.size - 1) {
      return this.pop();
    }
    if (index >= this.size) {
      return console.log("This index does not exist in the list");
    }

    let current = this.head;
    let count = 0;

    while (current) {
      if (index === count + 1) {
        const splitNode = current.nextNode;
        current.nextNode = splitNode.nextNode;
        this.size--;
        return;
      }
      current = current.nextNode;
      count++;
    }
  }
}
