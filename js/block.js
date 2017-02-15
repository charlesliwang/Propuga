class Side {
    constructor(block, side, id) {
        this.block = block;
        this.id = id;
        this.sym;
        this.tempsym;
        this.neighbors = [];
        this.tempneighbors = [];
        this.side = side;
    }

    addNeighbor(neighbor) {
        this.neighbors.push(neighbor);
    }

    inNeighbors(side) {
        for(var i = 0; i < this.neighbors.length; i++) {
            if(this.neighbors[i] == side) {
                return i;
            }
        }
        return -1;
    }

    breakOldConnection(faces) {
        console.log("idx: " + this.id);
        for(var i = 0; i < faces.length; i++) {
            if(faces[i] != null) {
                var a = this.inNeighbors(faces[i].sidea)
                if(a != -1) {
                    console.log(this.neighbors);
                    console.log(a);
                    this.neighbors.splice(a,1);
                    console.log(this.neighbors);
                }
                var b = this.inNeighbors(faces[i].sideb);
                if(b != -1) {
                    this.neighbors.splice(b,1);
                }
        }
        }
    }
}

class Block {
  constructor(x, y , z, n, dir) {
    this.id = Block.id++;
    this.dir = dir;
    this.sidea = new Side(this, 1, this.id);
    this.sideb = new Side(this, -1, this.id);
    this.sidea.sym = this.sideb;
    this.sideb.sym = this.sidea;
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

  getPos(i) {
      if(i ==0) {
          return this.x;
      } else if (i == 1) {
          return this.y;
      } else if (i == 2) {
          return this.z;
      }
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
                return_arr[i] = (this.faces[i]);
            }
        }
        return return_arr;
    }


    setFace(face) {
        var idx = this.getFaceidx(face.n,face.x,face.y,face.z);
        this.faces[idx] = face;
    }

    getFaceidx(n,x,y,z) {
        if(this.n == 0) {
            if (n == 2 ){
                if(y < this.y) {
                    return 1;
                } else  {
                    return 3;
                }
            } else if (n == 1) {
                if(z < this.z) {
                    return 2;
                } else {
                    return 0;
                }
            }
        } if(this.n == 1) {
            if (n == 2 ){
                if(x < this.x) {
                    return 2;
                } else  {
                    return 0;
                }
            } else if (n == 0) {
                if(z < this.z) {
                    return 1;
                } else {
                    return 3;
                }
            }
        } if(this.n == 2) {
            if (n == 0) {
                if(y < this.y) {
                    return 2;
                } else {
                    return 0;
                }
            } else if (n == 1) {
                if(x < this.x) {
                    return 0;
                } else {
                    return 2;
                }
            }

        }
    }

    getAllFaces() {
        return this.faces;
    }
}

Edge.id = 0;
