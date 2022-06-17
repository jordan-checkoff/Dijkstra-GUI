import { BinHeap } from './BinHeap.js';

export class WUGraph {
    
    #list = []
    #len = 0;

    get len() {
        return this.#len;
    }

    add_node() {
        this.#list.push([]);
        this.#len++;
    }

    set_edge(u, v, w) {
        if (u >= this.#len || v >= this.#len) {
            throw new Error("Out of range");
        }
        let l = this.#list[u];
        for (let i=0; i < l.length; i++) {
            if (l[i].node == v) {
                l[i].weight = w;
                let m = this.#list[v];
                for (let j=0; j < m.length; m++) {
                    if (m[j].node == u) {
                        m[j].weight = w;
                        return;
                    }
                }
            }
        }
        this.#list[u].push({node: v, weight: w});
        this.#list[v].push({node: u, weight: w});
    }

    get_edge(u, v) {
        let w = this.#list[u];
        for (let i = 0; i < w.length; i++) {
            if (w[i].node == v) {
                return w[i].weight;
            }
        }
        return Infinity;
    }

    get_adjacent(u) {
        if (this.#list[u]) {
            return this.#list[u].map((x)=>x.node);
        }
       return [];
    }

    get_preds(start, f) {
        let finished = false;
        let dist = new Array(this.#len).fill(Infinity);
        let pred = new Array(this.#len);
        dist[start] = 0;
        let todo = new BinHeap();
        let done = new Array(this.#len).fill(false);
        todo.insert(start, 0);
        while (todo.len != 0 && finished == false) {
            let v = todo.remove_min().data;
            if (!done[v]) {
                if (f(v)) {
                    finished = true;
                }
                done[v] = true;
                let points = this.get_adjacent(v);
                for (let i=0; i < points.length; i++) {
                    let u = points[i];
                    if (dist[v] + this.get_edge(u,v) < dist[u]) {
                        dist[u] = dist[v] + this.get_edge(u,v);
                        pred[u] = v;
                        todo.insert(u, dist[u]);
                    }
                }
            }
        }
        return pred;
    
    }

}


// let x = new WUGraph;

// x.add_node();
// x.add_node();
// x.add_node();
// x.add_edge(0,1,3);
// x.add_edge(1,2,3);
// x.add_edge(0,3,3);
// x.add_edge(3,2,3);

// console.log(x.get_edge(0,1));