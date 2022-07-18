# Dijkstra-GUI
See it live [here](https://jordan-checkoff.github.io/Dijkstra-GUI).

## Description
### Overview
After learning about various graph data structures and algorithms in one of my CS classes, I decided to build my own data structure with an accompanying GUI that uses a weighted-undirected graph and Dijkstra's algorithm to find the shortest distance between two points on a coordinate plane. The GUI contains a set of user inputs for inputing edges and a graph that both updates with each added edge and autoscales to adjust for the range of the points and the screen size. I wanted to take advantage of React's UI components and state hooks for easily and automatically updating the graph with each user input, so I created all of my data structures in JavaScript and made my GUI in React.

### Map Data Structure
I created a map data structure to serve as the back-end for my GUI. The data structure contains functions that allow for adding edges between two coordinates and for finding the shortest path between two coordinates. This is accomplished by using a weighted-undirected graph that contains nodes representing each coordinate, a dictionary mapping coordinates to nodes, and a dictionary mapping nodes to coordinates.  

### Helper Data Structures
**Binary Heap (Priority Queue)** - I first created a binary heap data structure for the priority queue to be used in Dijkstra's algorithm. I chose to use a binary heap because I would be inserting into and removing from the binary heap almost equally as often, and it's time complexity is O(logn) for both insertion and removal.

**Adjacency List (Weighted-Undirected Graph)** - I then created an adjacency list data structrure for the weighted-undirected graph used for holding a node corresponding to each point. I chose to use an adjacency list over an adjacency matrix to reduce the space complexity since I would be setting the average degree of the graph to 2.

**JavaScript Object (Dictionary)** - I used JavaScript objects as dictionaries for mapping coordinates to graph nodes and graph nodes to coordinates. JavaScript objects use hash tables, making the time complexity approximately O(1).

### Algorithms
**Dijkstra's algorithm** - I used Dijkstra's algorithm to calculate the shortest path between two nodes on the graph. I chose to use Dijkstra's algorithm because it has a better time complexity than Bellman-Ford's algorithm and can be used since there are no negative edges.

## Efficiency
!(graph.png)

## How to Use
### Add Edges
Users can either manually add each edge or add a specified number of random edges. To manually add an edge, enter the x and y coordinate for each endpoint of the edge in the topmost inputs, and then click "Add Road". To add a specified number of random edges, enter the number of edges where it says "# of roads", and then click "Add Random Roads". 

### Find Shortest Path
First, click the two points of interest on the graph. Only two points can be selected at a time. To deselect a point, jsut click it again. To calculate the shortest path between the selected points, just click "Calculate Shortest Path". The shortest path is then returned as both an ordered list of coordinates and as a visual depiction on the graph. The time required for the shortest path to be found is also displayed. To find the shortest path between two different points, just click a new point.
