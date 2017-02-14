class Side {
    constructor(block) {
        this.id = Side.id++;
        this.block = block;
        this.sym;
        this.neighbors = [];
    }

    addNeighbor(neighbor) {
        this.neighbors.push(neighbor);
    }
}


Side.id = 0;

class Block {
  constructor(x, y , z, n, dir) {
    this.sidea = new Side(this);
    this.sideb = new Side(this);
    this.sidea.sym = this.sideb;
    this.sideb.sym = this.sidea;
    this.id = Block.id++;
    this.edges = [];
    this.x = x;
    this.y = y;
    this.z = z;
    this.n = n;
    var v1,v2,v3,v4;
    if (n == 2) {
        v1 = new THREE.Vector3(0,0,0);
        v2 = new THREE.Vector3(0,1,0);
        v3 = new THREE.Vector3(1,1,0);
        v4 = new THREE.Vector3(1,0,0);

    }
    else if (n == 0) {
        v1 = new THREE.Vector3(0,0,0);
        v2 = new THREE.Vector3(0,1,0);
        v3 = new THREE.Vector3(0,1,1);
        v4 = new THREE.Vector3(0,0,1);
    } 
    else if (n == 1) {
        v1 = new THREE.Vector3(0,0,0);
        v2 = new THREE.Vector3(0,0,1);
        v3 = new THREE.Vector3(1,0,1);
        v4 = new THREE.Vector3(1,0,0);
    }
    var vc = new THREE.Vector3(x,y,z);
    v1.add(vc);
    v2.add(vc);
    v3.add(vc);
    v4.add(vc);
    var geom = new THREE.Geometry();
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.vertices.push(v4);
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 0, 2, 3 ) );
    geom.computeFaceNormals();
    var mesh= new THREE.Mesh( geom );
    this.mesh = mesh;
  }

  setAllEdges(edges) {
      this.edges = edges;
  }

  setEdge(edge) {
      this.edges.push(edge);
      console.log(this.edges);
  }

  getAllEdges() {
      return this.edges;
  }

  getEdge(i) {
      return this.edges[i];
  }
  
  getSideA() {
      return this.sidea;
  }
  getSideB() {
      return this.sideb;
  }
}

Block.id = 0;

class Edge {
    constructor(x,y,z,n) {
        this.id = Edge.id++;
        this.x = x;
        this.y = y;
        this.z = z;
        this.n = n;
        var ox = 0;
        var oy = 0;
        var oz = 0;
        if(n == 0) {
            ox = 1;
        } else if(n == 1) {
            oy = 1;
        } else if(n ==2) {
            oz = 1;
        }
        this.faces = [];
        this.line = new THREE.Geometry();
        this.line.vertices.push(
                new THREE.Vector3( this.x,this.y,this.z ),
        new THREE.Vector3( (this.x +  ox), (this.y + oy),(this.z + oz)));

    }

    getLine() {
        return this.line;
    }

    getAdjacent(id) {
        var return_arr = [];
        for(var i = 0; i < this.faces.length; i++) {
            if(this.faces[i] != null && this.faces[i].id != id) {
                return_arr.push(this.faces[i]);
            }
        }
        return return_arr;
    }

    setFace(face) {
        if(this.n == 0) {
            if (face.n == 2 ){
                if(face.z < this.z) {
                    this.faces[0] = face;
                } else  {
                    this.faces[2] = face;
                }
            } else if (face.n == 1) {
                if(face.z < this.z) {
                    this.faces[3] = face;
                } else {
                    this.faces[1] = face;
                }
            }
        } if(this.n == 1) {
            if (face.n == 2 ){
                if(face.x < this.x) {
                    this.faces[3] = face;
                } else  {
                    this.faces[1] = face;
                }
            } else if (face.n == 0) {
                if(face.z < this.z) {
                    this.faces[2] = face;
                } else {
                    this.faces[0] = face;
                }
            }
        } if(this.n == 2) {
            if (face.n == 0) {
                if(face.y < this.y) {
                    this.faces[3] = face;
                } else {
                    this.faces[1] = face;
                }
            } else if (face.n == 1) {
                if(face.x < this.x) {
                    this.faces[2] = face;
                } else {
                    this.faces[0] = face;
                }
            }

        }
    }

    getAllFaces() {
        return this.faces;
    }
}

Edge.id = 0;
