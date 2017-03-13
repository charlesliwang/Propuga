traversedmat = new THREE.MeshBasicMaterial();
traversedmat.color.setHex(0x00FF00);
traversedmat.side = THREE.DoubleSide;
traversedmat1 = new THREE.MeshBasicMaterial();
traversedmat1.color.setHex(0x0000FF);
traversedmat1.side = THREE.DoubleSide;
traversedmat2 = new THREE.MeshBasicMaterial();
traversedmat2.color.setHex(0x00FFFF);
traversedmat2.side = THREE.DoubleSide;
traversedmat3 = new THREE.MeshBasicMaterial();
traversedmat3.color.setHex(0x00F0F0);
traversedmat3.side = THREE.DoubleSide;

next_mats = [];
next_mats.push(traversedmat);
next_mats.push(traversedmat1);
next_mats.push(traversedmat2);
next_mats.push(traversedmat3);


currmat = new THREE.MeshBasicMaterial();
currmat.color.setHex(0xFF0000);
currmat.side = THREE.DoubleSide;


var last_side;
var last_neighbors = [];

function startPuzzle(voxelstructure) {
    last_side = voxelstructure.blocks[0].sidea;
    var face = last_side.block.mesh;
    face.material = currmat;
    setNeighborColors();
}

function stepToNextBlock(voxelstructure, d, lambmat) {
    resetNeighborColors(lambmat);
    console.log(last_side);
    var block = last_side.block;
    var edge = block.edges[d];
    var adj = edge.getAdjacent(block.id);
    console.log(adj);
    for(var i=0; i < adj.length; i++) {
        console.log("test");
        if(adj[i] != null) {
            if(last_side.inNeighbors(adj[i].sidea) >= 0) {
                delete_this = last_side.block.mesh;
                last_side = adj[i].sidea;
                console.log(last_side);
                var face = last_side.block.mesh;
                face.material = currmat;
                voxelstructure.scene.remove(delete_this);
                setNeighborColors();
                break;
            }
            if(last_side.inNeighbors(adj[i].sideb) >= 0) {
                delete_this = last_side.block.mesh;
                last_side = adj[i].sideb;
                console.log(last_side);
                var face = last_side.block.mesh;
                face.material = currmat;
                voxelstructure.scene.remove(delete_this);
                setNeighborColors();
                break;
            }
        }
    }
}

function stepToNextNeighbor(voxelstructure, d, lambmat) {
    resetNeighborColors(lambmat);
    console.log(last_side);
    var block = last_side.block;
    delete_this = last_side.block.mesh;
    last_side = last_neighbors[d];
    console.log(last_side);
    var face = last_side.block.mesh;
    face.material = currmat;
    voxelstructure.scene.remove(delete_this);
    setNeighborColors();

}

function setNeighborColors() {
    last_neighbors = last_side.neighbors;
    console.log(last_neighbors.length);
    if(last_neighbors.length == 0) {
        console.log("YOU LOSE");
    }
    for(var i = 0; i < last_neighbors.length; i++) {
        last_neighbors[i].block.mesh.material = next_mats[i];
    }
}

function resetNeighborColors(lambmat) {
    for(var i = 0; i < last_neighbors.length; i++) {
        last_neighbors[i].block.mesh.material = lambmat;
    }
}


function savePuzzle(voxelstructure) {
    var puzzle = "";
    var meshes = voxelstructure.getAllBlocks();
      for(var i = 0; i < meshes.length; i++) {
            var mesh = meshes[i];
            puzzle += mesh.x + " " + mesh.y + " " + mesh.z + " " + mesh.n + " ";
      }
      puzzle = puzzle.trim();
      console.log(puzzle);
}

function selectByColor(color, voxelstructure, lambmat) {
    var idx;
    for(var i = 0; i < 4; i++) {
        if(next_mats[i].color.equals(color) ){
            idx = i;
            console.log(i + " YES");
        }
    }
    if(idx != null) {
        stepToNextNeighbor(voxelstruct,idx,lambmat);
    }

}