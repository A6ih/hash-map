import LinkedList from "./linkedList.js";

class HashMap {
  constructor() {
    (this.buckets = []), (this.capacity = 16), (this.loadFactor = 0.8);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    if (!this.buckets[hashCode]) {
      this.buckets[hashCode] = new LinkedList();
      this.buckets[hashCode].prepend(key, value);
      return;
    }

    if (this.buckets[hashCode].size === 1) {
      if (this.buckets[hashCode].head.key === key) {
        this.buckets[hashCode].head.value = value;
        return;
      }
      this.buckets[hashCode].prepend(key, value);
      return;
    }

    if (this.buckets[hashCode].contains(key)) {
      const index = this.buckets[hashCode].find(key);
      const node = this.buckets[hashCode].at(index);
      node.value = value;
      return;
    } else {
      this.buckets[hashCode].prepend(key, value);
      return;
    }
  }

  get(key) {
    const hashCode = this.hash(key);

    if (!this.buckets[hashCode]) {
      return null;
    }

    if (this.buckets[hashCode].size === 1) {
      if (this.buckets[hashCode].head.key === key) {
        return this.buckets[hashCode].head.value;
      }
      return null;
    }

    if (this.buckets[hashCode].contains(key)) {
      const index = this.buckets[hashCode].find(key);
      const node = this.buckets[hashCode].at(index);
      return node.value;
    } else {
      return null;
    }
  }

  has(key) {
    const hashCode = this.hash(key);

    if (!this.buckets[hashCode]) {
      return false;
    }

    if (this.buckets[hashCode].size === 1) {
      if (this.buckets[hashCode].head.key === key) {
        return true;
      }
      return false;
    }

    if (this.buckets[hashCode].contains(key)) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    }

    const hashCode = this.hash(key);

    if (this.buckets[hashCode].size === 1) {
      if (this.buckets[hashCode].head.key === key) {
        this.buckets[hashCode] = null;
        return true;
      }
      return false;
    }

    if (this.buckets[hashCode].contains(key)) {
      const index = this.buckets[hashCode].find(key);
      this.buckets[hashCode].removeAt(index);
      return true;
    } else {
      return false;
    }
  }

  length() {
    if (this.buckets.length === 0) {
      return 0;
    }

    let count = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        count += 0;
      } else {
        count += this.buckets[i].size;
      }
    }

    return count;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.buckets);
console.log(test.buckets.length);
console.log(test.get("carrot"));
console.log(test.get("ice cream"));
console.log(test.has("ABhi"));
console.log(test.has("carrot"));
console.log(test.length());
test.remove("frog");
test.remove("ice cream");
console.log(test.length());
