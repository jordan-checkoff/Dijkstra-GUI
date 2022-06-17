
import { WUGraph } from './WUGraph.js';

class tripPlanner {

    #map = new WUGraph();
    #pointtonode = {};
    #nodetopoint = {};

    add_point(pos) {
        this.#pointtonode[pos] = this.#map.len;
        this.#nodetopoint[this.#map.len] = pos;
        this.#map.add_node();
    }

    add_road(p1,p2) {
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

        for (let i = n2; i != n1; i=preds[i]) {
            route.unshift(this.#nodetopoint[i]);
        }

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

let t = new tripPlanner;

t.add_point([0,0]);
t.add_point([1,1]);
t.add_point([2,2]);
t.add_point([3,3]);
t.add_road([0,0],[3,3]);
t.add_road([2,2],[3,3]);
t.add_road([0,0],[1,1]);
t.add_road([1,1],[2,2]);

console.log(t.shortest_path([0,0], [2,2]));


/*      
# Used for finding vertices for graph
struct pointlist:
    let list
    let length
    
def pointlistupdate(pl, dict, pos):
    if not dict.mem?(pos):
        dict.put(pos, 1)
        pl.list = cons(pos, pl.list)
        pl.length = pl.length + 1
    
def pointsmaker(roads):
    let pl = pointlist(None, 0)
    let dict = HashTable(30, make_sbox_hash())
    for road in roads:
        let pos1 = [road[0], road[1]]
        let pos2 = [road[2], road[3]]
        pointlistupdate(pl, dict, pos1)
        pointlistupdate(pl, dict, pos2)
    return pl

    
# Used for constructing graph
struct map:
    let graph
    let nodetopoint
    let pointtonode
    let size
    
struct endpoint:
    let pos
    let pois

def mapmaker(roads, pois):
    let points = pointsmaker(roads)
    let size = points.length
    let point = points.list
    let graph = WuGraph(size)
    let nodetopoint = HashTable(size, make_sbox_hash())
    let pointtonode = HashTable(size, make_sbox_hash())
    let i = 0
    while not point == None:
        let ep = endpoint(point.data, None)
        nodetopoint.put(i, ep)
        pointtonode.put(point.data, i)
        i = i+1
        point = point.next
    for x in pois:
        let pos = [x[0], x[1]]
        let spot = nodetopoint.get(pointtonode.get(pos))
        spot.pois = cons(x, spot.pois)
    for road in roads:
        let n1 = pointtonode.get([road[0], road[1]])
        let n2 = pointtonode.get([road[2], road[3]])
        let d1 = (road[0]-road[1])
        let d2 = (road[2]-road[3])
        let w = (d1*d1+d2*d2).sqrt()
        graph.set_edge(n1, n2, w)
    return map(graph, nodetopoint, pointtonode, size)

    
# Used for finding shortest distances
struct distance:
    let node
    let dis

# Algorithm based off of Dijkstra's Algorithm psuedocode in class slides    
def dijkstra(graph, size, start, f):
    let finished = False
    let dist = [inf ; size]
    let pred = [None ; size]
    dist[start] = 0
    let todo = BinHeap(size, lambda x,y: x.dis <= y.dis)
    let done = [False ; size]
    todo.insert(distance(start, 0))
    while not todo.len() == 0 and finished == False:
        let v = todo.find_min().node
        todo.remove_min()
        if not done[v]:
            if f(v):
                finished = True
            done[v] = True
            let point = graph.get_adjacent(v)
            while not point == None:
                let u = point.data
                if dist[v] + graph.get_edge(u,v) < dist[u]:
                    dist[u] = dist[v] + graph.get_edge(u,v)
                    pred[u] = v
                    todo.insert(distance(u, dist[u]))
                point = point.next
    return pred

    
class TripPlanner (TRIP_PLANNER):
    let map
    let nametopoint
    
    def __init__(self, roads, POIs):
        self.map = mapmaker(roads, POIs)
        self.nametopoint = HashTable(self.map.size, make_sbox_hash())
        for poi in POIs:
            self.nametopoint.put(poi[3], [poi[0],poi[1]])
        
    def locate_all(self, a):
        let locs = None
        
        for i in range(self.map.size):
            let poi = self.map.nodetopoint.get(i).pois
            while not poi == None:
                if poi.data[2] == a:
                    locs = cons([poi.data[0],poi.data[1]], locs)
                    break
                poi = poi.next
                
        return locs
        
        
    def plan_route(self, a, b, c):
        let start = self.map.pointtonode.get([a, b])
        if not self.nametopoint.mem?(c):
            return None
        
        let route = None    
        let end = self.map.pointtonode.get(self.nametopoint.get(c))
        if start == end:
            return cons([a,b], None)
            
        def f(v):
            return v == end
            
        let pred = dijkstra(self.map.graph, self.map.size, start, f)
        
        if pred[end] == None:
            return None
        
        while not end == start:
            route = cons(self.map.nodetopoint.get(end).pos, route)
            end = pred[end]
        return cons([a,b], route)
        
        
    def find_nearby(self, a, b, c, d):
        let output = None
        let length = 0
        let start = self.map.pointtonode.get([a, b])
        
        def f(v):
            let poi = self.map.nodetopoint.get(v).pois
            while not poi == None:
                if poi.data[2] == c:
                    output = cons(poi.data, output)
                    length = length + 1
                    if length == d:
                        return True
                poi = poi.next
        
        dijkstra(self.map.graph, self.map.size, start, f)
        return output
#### ^^^ YOUR CODE HERE



#### ^^^ YOUR CODE HERE

*/