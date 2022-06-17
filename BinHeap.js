
export class BinHeap {
    //Private

    #queue = [];
    #len = 0;

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


    //Public

    get len() {
        return this.#len;
    }

    insert(val, p) {
        this.#queue.push({data: val, priority: p});
        let i = this.#len;
        let parent = this.#parent(i);
        while (parent >=0) {
            if (this.#queue[parent].priority > p) {
                this.#swap(i, parent);
            } else {
                break;
            }
            i=this.#parent(i);
            parent = this.#parent(i);
        }
        this.#len++;
    }

    remove_min() {
        if (this.#len == 0) {
            throw new Error("BinHeap is empty");
        }
        this.#swap(0, this.#len-1);
        let min = this.#queue.pop();
        this.#len--;

        let i = 0;
        let child = this.#child(i)
        while (child < this.#len) {
            if (child+1 >= this.#len || this.#queue[child].priority < this.#queue[child+1].priority) {
                if (this.#queue[i].priority > this.#queue[child].priority) {
                    this.#swap(i, child);
                    i = child;
                    child = this.#child(i);
                } else {
                    break;
                }
            } else if (this.#queue[i].priority > this.#queue[child+1].priority) {
                this.#swap(i, child+1);
                i = child+1;
                child = this.#child(i);
            } else {
                break;
            }
        }
        return min;
    }
}

// let x = new BinHeap();

// for (i=0; i<50;i++) {
//     let num = Math.floor(100*Math.random());
//     x.insert(i, num);
// }

// for (i=0; i< 50; i++) {
//     let num = x.remove_min();
//     console.log(num);
// }