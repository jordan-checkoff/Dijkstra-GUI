
class BinHeap {
    #queue = [];
    #length = 0;

    #parent(i) {
        return Math.floor((i-1)/2);
    }

    #child(i) {
        return 2*i+1;
    }

    #swap(i, j) {
        let x = this.#queue[i];
        this.#queue[i] = this.#queue[j];
        this.#queue[j] = x;
    }

    get len() {
        return this.#length;
    }

    insert(val, p) {
        this.#queue.push({data: val, priority: p});
        for (let i = this.#length; this.#parent(i) >=0; i=this.#parent(i)) {
            if (this.#queue[this.#parent(i)].priority > p) {
                this.#swap(i, this.#parent(i));
            }
        }
        this.#length++;
    }

    remove_min() {
        if (this.#length == 0) {
            throw new Error("BinHeap is empty");
        }
        this.#swap(0, this.#length-1);
        let min = this.#queue.pop();
        this.#length--;
        let i = 0;
        while (this.#child(i) < this.#length) {
            if (this.#child(i)+1 >= this.#length) {
                if (this.#queue[i].priority > this.#queue[this.#child(i)].priority) {
                    this.#swap(i, this.#child(i));
                    i = this.#child(i);
                } else {
                    break;
                }
            } else if (this.#queue[this.#child(i)].priority < this.#queue[this.#child(i)+1].priority) {
                if (this.#queue[i].priority > this.#queue[this.#child(i)].priority) {
                    this.#swap(i, this.#child(i));
                    i = this.#child(i);
                }
            } else if (this.#queue[i].priority > this.#queue[this.#child(i)+1].priority) {
                this.#swap(i, this.#child(i)+1);
                i = this.#child(i)+1;
            } else {
                break;
            }

        }
        return min;
    }
}

let x = new BinHeap();
