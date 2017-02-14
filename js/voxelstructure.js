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
            block.setAllEdges([all_edges]);
            for(var j = 0; j < all_edges.length; j++) {
                all_edges[j].setFace(block);
            }
        }
    }

    setGraphConnections(x,y,z,i) {
        var block = this.get(x,y,z).getBlock(i);
        var adjfaces = [];
        var edges = block.edges;
        for (var j = 0; j < edges.length; j++) {
            if(edges[j] != null) {
                var adjacentToEdge = edges[j].getAdjacent(block.id);
            }
        }
        console.log(adjfaces);
    }

    createNewBlock(x,y,z,i) {
        if(this.get(x,y,z) == null) {
            var new_vox = new Voxel(x,y,z);
            this.setNewVox(x,y,z, new_vox);
        }
        var vox = this.get(x,y,z);
        if(vox.getBlock(i) == null) {
            var block = vox.setBlock(i);
            this.blocks.push(block);
        }
        this.setEdges(x,y,z,i);
        this.setGraphConnections(x,y,z,i)
    }
}
