
import { WUGraph } from './WUGraph.js';

export class tripPlanner {

    #map = new WUGraph();
    #pointtonode = {};
    #nodetopoint = {};

    #add_point(pos) {
        if (!(pos in this.#pointtonode)) {
            this.#pointtonode[pos] = this.#map.len;
            this.#nodetopoint[this.#map.len] = pos;
            this.#map.add_node();
        }
    }

    add_road(p1,p2) {
        this.#add_point(p1);
        this.#add_point(p2);
        let w = Math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2);
        let n1 = this.#pointtonode[p1];
        let n2 = this.#pointtonode[p2];
        this.#map.set_edge(n1,n2,w);
    }

    shortest_path(p1, p2) {
        let n1 = this.#pointtonode[p1];
        let n2 = this.#pointtonode[p2];
        let route = [];

        let preds = this.#map.get_preds(n1, (v) => false);

        for (let i = n2; i !== n1; i=preds[i]) {
            route.unshift(this.#nodetopoint[i]);
        }

        route.unshift(this.#nodetopoint[n1]);

        return route;
    }

}

// let x = new WUGraph;

// x.add_node();
// x.add_node();
// x.add_node();
// x.add_node();
// x.set_edge(0,1,4);
// x.set_edge(1,2,3);
// x.set_edge(0,3,3);
// x.set_edge(3,2,3);

// console.log(x.get_preds(0, () => false));

// let t = new tripPlanner;

// t.add_road([0,0],[3,3]);
// t.add_road([2,2],[3,3]);
// t.add_road([0,0],[2,2]);
// t.add_road([1,1],[2,2]);

// console.log(t.shortest_path([0,0], [2,2]));
