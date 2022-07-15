
import { WUGraph } from './WUGraph.js';

export class tripPlanner {

    #map = new WUGraph();
    #points = [];
    #pointtonode = {};
    #nodetopoint = {};
    #dims = {minx: -1, maxx: 1, miny: -1, maxy: 1};

    #add_point(pos) {
        if (!(pos in this.#pointtonode)) {
            this.#pointtonode[pos] = this.#map.len;
            this.#nodetopoint[this.#map.len] = pos;
            this.#map.add_node();
            this.#points.push(pos);
            if (parseInt(pos[0]) + 1 > this.#dims.maxx) {
                this.#dims.maxx = parseInt(pos[0]) + 1;
            } else if (parseInt(pos[0]) - 1 < this.#dims.minx) {
                this.#dims.minx = parseInt(pos[0]) - 1;
            }
            if (parseInt(pos[1]) + 1 > this.#dims.maxy) {
                this.#dims.maxy = parseInt(pos[1]) + 1;
            } else if (parseInt(pos[1]) - 1 < this.#dims.miny) {
                this.#dims.miny = parseInt(pos[1]) - 1;
            }
        }
    }

    #copy() {
        let x = new tripPlanner();
        x.#map = this.#map;
        x.#points = this.#points;
        x.#pointtonode = this.#pointtonode;
        x.#nodetopoint = this.#nodetopoint;
        x.#dims = this.#dims;
        return x;
    }

    get points() {
        return this.#points;
    }

    get dims() {
        return this.#dims;
    }

    get_all_roads() {
        let x = this.#map.get_all_edges();
        let y = x.map((e)=>[this.#nodetopoint[e[0]], this.#nodetopoint[e[1]]]);
        return y;
    }

    add_road(p1,p2) {
        this.#add_point(p1);
        this.#add_point(p2);
        let w = Math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2);
        let n1 = this.#pointtonode[p1];
        let n2 = this.#pointtonode[p2];
        this.#map.set_edge(n1,n2,w);
        return this.#copy();
    }

    shortest_path(p1, p2) {
        let n1 = this.#pointtonode[p1];
        let n2 = this.#pointtonode[p2];
        let route = [];

        let preds = this.#map.get_preds(n1, (v) => false);

        for (let i = n2; i !== n1; i=preds[i]) {
            if (i === preds[i]) {
                return;
            }
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
