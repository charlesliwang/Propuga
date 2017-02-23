function validIdx(arr) {
    var return_arr = [];
    for(var i =0; i < arr.length; i++) {
        if(arr[i] != null) {
            return_arr.push(i);
        }
    }
    return return_arr;
}

class Voxel {
    constructor(x,y,z) {
        this.blocks = [];
        this.edges = [];
        this.x = x;
        this.y = y;
        this.z = z;
        this.cube = new THREE.CubeGeometry( 1,1,1 );
    }
    setBlock(i) {
        var block = new Block(this.x,this.y,this.z, i, 1);
        //console.log("test pos: " + block.getPos(0) + " " + block.getPos(1) + " " + block.getPos(2));
        this.blocks[i] = block;
        return block;
    }

    setEdge(i) {
        var edge;
        if(this.edges[i] == null) {
            edge = new Edge(this.x,this.y,this.z,i);
            this.edges[i] = edge;
        } else {
            edge = this.edges[i];
        }
        return edge;

    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getZ() {
        return this.z;
    }
    
    getBlock(i) {
        return this.blocks[i];
    }

    getCube() {
        return this.cube;
    }

    getEdge(i) {
        return this.edges[i];
    }
}

class VoxelStruct {
    constructor(n) {
        //set "n" to input
        this.n = n;
        //represent a 2n*2n*2n* array as a 1d array
        this.data = [];
        this.blocks = [];
    }
    
    getn() {
        return this.n;
    }

    getlength() {
        return this.data.length;
    }
    
    setNewVox(x,y,z, vox) {
        this.data[(x+this.n) + 2*this.n * ((y+this.n) + (2*this.n * (z+this.n)))] = vox;
    }

    getidx(i) {
        return this.data[i];
    }

    get(x,y,z){
        //return this.data[(x+n) + n * ((y+n) + (n * (z+n)))];
        return this.data[(x+this.n) + 2*this.n * ((y+this.n) + (2*this.n * (z+this.n)))];
    }
    
    getAllBlocks() {
        return this.blocks;
    }

    //WHEN CREATING A BLOCK IN POSITION X,Y,Z
    //ENSURE THAT NEIGHBORING VOXELS EXIST TO STORE (INDX) EDGES
    setEdges(x,y,z,i) {
        var curr_vox = this.get(x,y,z);
        if (i == 0) {
            var z_edge = curr_vox.setEdge(2);
            var y_edge = curr_vox.setEdge(1);
            if(this.get(x,y,z+1) == null) {
                var new_vox = new Voxel(x,y,z+1);
                this.setNewVox(x,y,z+1, new_vox);
            }
            if(this.get(x,y+1,z) == null) {
                var new_vox2 = new Voxel(x,y+1,z);
                this.setNewVox(x,y+1,z, new_vox2);
            }
            var z_edge2 = this.get(x,y+1,z).setEdge(2);
            var y_edge2 = this.get(x,y,z+1).setEdge(1);
            var block = curr_vox.getBlock(i);
            var all_edges = [y_edge2,z_edge,y_edge,z_edge2];
            block.setAllEdges(all_edges);
            for(var j = 0; j < all_edges.length; j++) {
                all_edges[j].setFace(block);
            }

        } else if(i == 1) {
            var x_edge = curr_vox.setEdge(0);
            var z_edge = curr_vox.setEdge(2);
            if(this.get(x,y,z+1) == null) {
                var new_vox = new Voxel(x,y,z+1);
                this.setNewVox(x,y,z+1, new_vox);
            }
            if(this.get(x+1,y,z) == null) {
                var new_vox2 = new Voxel(x+1,y,z);
                this.setNewVox(x+1,y,z, new_vox2);
            }
            var z_edge2 = this.get(x+1,y,z).setEdge(2);
            var x_edge2 = this.get(x,y,z+1).setEdge(0);
            var block = curr_vox.getBlock(i);
            var all_edges = [x_edge,z_edge2,x_edge2,z_edge];
            block.setAllEdges(all_edges);
            for(var j = 0; j < all_edges.length; j++) {
                all_edges[j].setFace(block);
            }
        } else if(i == 2) {
            var x_edge = curr_vox.setEdge(0);
            var y_edge = curr_vox.setEdge(1);
            if(this.get(x+1,y,z) == null) {
                var new_vox = new Voxel(x+1,y,z);
                this.setNewVox(x+1,y,z, new_vox);
            }
            if(this.get(x,y+1,z) == null) {
                var new_vox2 = new Voxel(x,y+1,z);
                this.setNewVox(x,y+1,z, new_vox2);
            }
            var y_edge2 = this.get(x+1,y,z).setEdge(1);
            var x_edge2 = this.get(x,y+1,z).setEdge(0);
            var block = curr_vox.getBlock(i);
            var all_edges = [y_edge2, x_edge, y_edge, x_edge2];
            block.setAllEdges(all_edges);
            for(var j = 0; j < all_edges.length; j++) {
                all_edges[j].setFace(block);
            }
        }
    } 

    connectFaces(block,adjacentToEdge,edge) {
        var block_idx = edge.getFaceidx(block.n,block.x,block.y,block.z);
        // console.log("idx: " + block_idx);
        // console.log("dir: " + block.dir);
        var u = (edge.n + 2)%3;
        var r = edge.n + 1;
        // console.log("mod: ");
        // console.log(edge.n + " " + u);
        var loop = true;
        var cw_side;
        if((block_idx == 0 || block_idx == 1)) {
            if(block.dir > 0) {
                cw_side = block.sidea;
            } else {
                cw_side = block.sidedb;
            }
        } else {
            if(block.dir > 0) {
                cw_side = block.sideb;
            } else {
                cw_side = block.sideda;
            }
        }
        var ccw_side;
        if(cw_side.side > 0) {
            ccw_side = block.sideb;
        } else {
            ccw_side = block.sidea;
        }
        //console.log("block : " + block_idx);
        var ef = (block_idx-1);
        if(ef < 0) {
            ef = 3;
        }
        //console.log("ef : " + ef);
        var num = 0;
        while (num < 4) {
            if(adjacentToEdge[ef] != null) {
                var adjblock = adjacentToEdge[ef];
                if((ef == 0 || ef == 1)) {
                if(adjblock.dir > 0) {
                    cw_side.addNeighbor(adjblock.sideb);
                    adjblock.sideb.breakOldConnection(adjacentToEdge);
                    adjblock.sideb.addNeighbor(cw_side);
                    num = 4;
                } else {
                    cw_side.addNeighbor(adjblock.sidea);
                    adjblock.sidea.breakOldConnection(adjacentToEdge);
                    adjblock.sidea.addNeighbor(cw_side);
                    num = 4;
                }
                } else {
                if(adjblock.dir > 0) {
                    cw_side.addNeighbor(adjblock.sidea);
                    adjblock.sidea.breakOldConnection(adjacentToEdge);
                    adjblock.sidea.addNeighbor(cw_side);
                    num = 4;
                } else {
                    cw_side.addNeighbor(adjblock.sideb);
                    adjblock.sideb.breakOldConnection(adjacentToEdge);
                    adjblock.sideb.addNeighbor(cw_side);
                    num = 4;
                }
                }
            }
            //console.log("num " + num);
            num++;
            ef--;
            if(ef < 0) {
                ef = 3;
            }
            //console.log(ef);
        }
        num = 0;
        ef = (block_idx+1)%4;
        while (num < 4) {
            if(adjacentToEdge[ef] != null) {
                var adjblock = adjacentToEdge[ef];
                if((ef == 0 || ef == 1)) {
                if(adjblock.dir > 0) {
                    ccw_side.addNeighbor(adjblock.sidea);
                    adjblock.sidea.breakOldConnection(adjacentToEdge);
                    adjblock.sidea.addNeighbor(ccw_side);
                    num = 4;
                } else {
                    ccw_side.addNeighbor(adjblock.sideb);
                    adjblock.sideb.breakOldConnection(adjacentToEdge);
                    adjblock.sideb.addNeighbor(ccw_side);
                    num = 4;
                }
                } else {
                if(adjblock.dir > 0) {
                    ccw_side.addNeighbor(adjblock.sideb);
                    adjblock.sideb.breakOldConnection(adjacentToEdge);
                    adjblock.sideb.addNeighbor(ccw_side);
                    num = 4;
                } else {
                    ccw_side.addNeighbor(adjblock.sidea);
                    adjblock.sidea.breakOldConnection(adjacentToEdge);
                    adjblock.sidea.addNeighbor(ccw_side);
                    num = 4;
                }
                }
            }
            num++;
            ef++;
            ef = ef%4;
            //console.log(ef);
        } 

    }

    connectTestFaces(bn,bx,by,bz,dir,adjacentToEdge,edge,sidea,sideb) {

        //console.log("connectTestFaces");
        var block_idx = edge.getFaceidx(bn,bx,by,bz);
        // console.log("TEST FACE");
        var u = (edge.n + 2)%3;
        var r = edge.n + 1;
        var loop = true;
        var cw_side;
        if((block_idx == 0 || block_idx == 1)) {
            if(dir > 0) {
                cw_side = sidea;
            } else {
                cw_side = sidedb;
            }
        } else {
            if(dir > 0) {
                cw_side = sideb;
            } else {
                cw_side = sideda;
            }
        }
        var ccw_side;
        if(cw_side.side > 0) {
            ccw_side = sideb;
        } else {
            ccw_side = sidea;
        }
        //console.log("block : " + block_idx);
        var ef = (block_idx-1);
        if(ef < 0) {
            ef = 3;
        }
        var num = 0;
        while (num < 4) {
            if(adjacentToEdge[ef] != null) {
                console.log("ef : " + ef);
                var adjblock = adjacentToEdge[ef];
                console.log(adjblock);
                if((ef == 0 || ef == 1)) {
                if(adjblock.dir > 0) {
                    cw_side.addTempNeighbor(adjblock.sideb);
                    adjblock.sideb.breakOldTempConnection(adjacentToEdge);
                    adjblock.sideb.addTempNeighbor(cw_side);
                    num = 4;
                } else {
                    cw_side.addTempNeighbor(adjblock.sidea);
                    adjblock.sidea.breakOldTempConnection(adjacentToEdge);
                    adjblock.sidea.addTempNeighbor(cw_side);
                    num = 4;
                }
                } else {
                if(adjblock.dir > 0) {
                    cw_side.addTempNeighbor(adjblock.sidea);
                    adjblock.sidea.breakOldTempConnection(adjacentToEdge);
                    adjblock.sidea.addTempNeighbor(cw_side);
                    num = 4;
                } else {
                    cw_side.addTempNeighbor(adjblock.sideb);
                    adjblock.sideb.breakOldTempConnection(adjacentToEdge);
                    adjblock.sideb.addTempNeighbor(cw_side);
                    num = 4;
                }
                }
            }
            num++;
            ef--;
            if(ef < 0) {
                ef = 3;
            }
            //console.log(ef);
        }
        num = 0;
        ef = (block_idx+1)%4;
        while (num < 4) {
            if(adjacentToEdge[ef] != null) {
                var adjblock = adjacentToEdge[ef];
                if((ef == 0 || ef == 1)) {
                if(adjblock.dir > 0) {
                    ccw_side.addTempNeighbor(adjblock.sidea);
                    adjblock.sidea.breakOldTempConnection(adjacentToEdge);
                    adjblock.sidea.addTempNeighbor(ccw_side);
                    num = 4;
                } else {
                    ccw_side.addTempNeighbor(adjblock.sideb);
                    adjblock.sideb.breakOldTempConnection(adjacentToEdge);
                    adjblock.sideb.addTempNeighbor(ccw_side);
                    num = 4;
                }
                } else {
                if(adjblock.dir > 0) {
                    ccw_side.addTempNeighbor(adjblock.sideb);
                    adjblock.sideb.breakOldTempConnection(adjacentToEdge);
                    adjblock.sideb.addTempNeighbor(ccw_side);
                    num = 4;
                } else {
                    ccw_side.addTempNeighbor(adjblock.sidea);
                    adjblock.sidea.breakOldTempConnection(adjacentToEdge);
                    adjblock.sidea.addTempNeighbor(ccw_side);
                    num = 4;
                }
                }
            }
            num++;
            ef++;
            ef = ef%4;
            //console.log(ef);
        } 

    }

    setGraphConnections(x,y,z,i) {
        var block = this.get(x,y,z).getBlock(i);
        var adjfaces = [];
        var edges = block.edges;
        // if(i == 2) {
        //     console.log(edges);
        // }
        for (var j = 0; j < edges.length; j++) {
            if(edges[j] != null) {
                var adjacentToEdge = edges[j].getAdjacent(block.id);
                var idxlist = validIdx(adjacentToEdge);
                if(idxlist.length != 0) {
                    this.connectFaces(block, adjacentToEdge, edges[j]);
                }
                
            }
        }
    }

    testGraphConnections(n,dir,x,y,z,edges) {
        var sidea = new Side(null,1,100);
        var sideb = new Side(null,-1,100);
        sidea.sym = sideb;
        sideb.sym = sidea;
        for(var j = 0; j < edges.length; j++) {
            if(edges[j] != null) {
                var adjacentToEdge = edges[j].getAdjacent(-1);
                var idxlist = validIdx(adjacentToEdge);
                if(idxlist.length != 0) {
                    this.connectTestFaces(n,x,y,z,dir,adjacentToEdge,edges[j],sidea,sideb);
                }
            }
        }
    }

    createNewBlock(x,y,z,i) {
        if(this.get(x,y,z) == null) {
            var new_vox = new Voxel(x,y,z);
            this.setNewVox(x,y,z, new_vox);
        }
        var vox = this.get(x,y,z);
        var block;
        if(vox.getBlock(i) == null) {
            console.log("NULL??");
            block = vox.setBlock(i);
            this.blocks.push(block);
        }
        //this.testEdge(x,y,z,i);
        this.setEdges(x,y,z,i);
        this.setGraphConnections(x,y,z,i)
        return block;
    }

    testNewBlock(x,y,z,i,dir) {
        for(var j = 0; j < this.blocks.length; j++) {
          var mesh = this.blocks[j];
          mesh.sidea.updateTempNeighbors();
          mesh.sideb.updateTempNeighbors();
        }

        var edges = this.testEdge(x,y,z,i);
        console.log("EDGES DEBUG");
        console.log(edges);
        this.testGraphConnections(i,dir,x,y,z,edges);
        return this.testGraphValidity();
    }

    testGraphValidity() {
        console.log("test graph validity");
        var graph = new Graph();
        for(var i = 0; i < this.blocks.length; i++) {
            //console.log(this.blocks[i]);
            this.addSideToGraph(graph, this.blocks[i].sidea, -1)
            this.addSideToGraph(graph, this.blocks[i].sideb, -1)
        }
        graph.setIslandSize();
        console.log("GRAPH");
        console.log(graph);
        if(graph.islands.length > 2) {
            return false;
        }
        var result = graph.islands[0].isValidHGraph(this.blocks[0].sidea);
        console.log(result);
        return result;
    }

    addSideToGraph(graph, side, last_idx) {
        var curr_idx = graph.contains(side);
        var next_idx = -1;
        if(last_idx == -1) {
            if(curr_idx == -1) {
                next_idx = graph.addSidetoNewIsland(side);
                for(var i = 0; i < side.tempneighbors.length; i++) {
                    if(side.tempneighbors[i] != null) {
                        this.addSideToGraph(graph,side.tempneighbors[i],next_idx);
                    }
                }
            }
        } else {
            if(curr_idx == last_idx) {

            } else if (curr_idx == -1) {
                next_idx = graph.addSidetoIsland(side,last_idx);
                for(var i = 0; i < side.tempneighbors.length; i++) {
                    if(side.tempneighbors[i] != null) {
                        this.addSideToGraph(graph,side.tempneighbors[i],next_idx);
                    }
                }
            } else {
                next_idx = graph.mergeIslands(last_idx,curr_idx);
            }
        }
    }

    testEdge(x,y,z,i) {
        console.log("TEST EDGE " + i );
        var curr_vox = this.get(x,y,z);
        if (i == 0) {
            var y_edge;
            var z_edge;
            if(curr_vox != null) {
                y_edge = curr_vox.edges[1];
                z_edge = curr_vox.edges[2];
            }
            var y_edge2;
            if(this.get(x,y,z+1) != null) {
                y_edge2 = this.get(x,y,z+1).getEdge(1);
            }
            var z_edge2;
            if(this.get(x,y+1,z) != null) {
                z_edge2 = this.get(x,y+1,z).getEdge(2);
            }
            var all_edges = [y_edge2,z_edge,y_edge,z_edge2];
            console.log("testing edges");
            console.log(all_edges);
            return all_edges ;
        } else if(i == 1) {
            var x_edge;
            var z_edge;
            if(curr_vox != null) {
                x_edge = curr_vox.edges[0];
                z_edge = curr_vox.edges[2];
            }
            var x_edge2;
            if(this.get(x,y,z+1) != null) {
                x_edge2 = this.get(x,y,z+1).edges[0];
            }
            var z_edge2;
            if(this.get(x+1,y,z) != null) {
                z_edge2 = this.get(x+1,y,z).edges[2];
            }
            var all_edges = [x_edge,z_edge2,x_edge2,z_edge];
            console.log("testing edges");
            console.log(all_edges);
            return all_edges;
        } else if(i == 2) {
            var x_edge;
            var y_edge;
            if(curr_vox != null) {
                x_edge = curr_vox.edges[0];
                y_edge = curr_vox.edges[1];
            }
            var y_edge2;
            if(this.get(x+1,y,z) != null) {
                y_edge2 = this.get(x+1,y,z).edges[1];
            }
            var x_edge2;
            if(this.get(x,y+1,z) != null) {
                x_edge2 = this.get(x,y+1,z).edges[0];
            }
            var all_edges = [y_edge2, x_edge, y_edge, x_edge2];
            console.log("testing edges");
            console.log(all_edges);
            return all_edges;
        }
        
        
    }
}
