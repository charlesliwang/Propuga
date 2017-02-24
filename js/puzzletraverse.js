traversedmat = new THREE.MeshLambertMaterial();
traversedmat.color.setHex(0xFF0000);
traversedmat.side = THREE.DoubleSide;

var last_side;

function startPuzzle(voxelstructure) {
    last_side = voxelstructure.blocks[0].sidea;
    var face = last_side.block.mesh;
    face.material = traversedmat;
}

function stepToNextBlock(voxelstructure, d) {
    console.log(last_side);
    var block = last_side.block;
    var edge = block.edges[d];
    var adj = edge.getAdjacent(block.id);
    console.log(adj);
    for(var i=0; i < adj.length; i++) {
        console.log("test");
        if(adj[i] != null) {
            if(last_side.inNeighbors(adj[i].sidea) >= 0) {
                last_side = adj[i].sidea;
                console.log(last_side);
                var face = last_side.block.mesh;
                face.material = traversedmat;
                break;
            }
            if(last_side.inNeighbors(adj[i].sideb) >= 0) {
                last_side = adj[i].sideb;
                console.log(last_side);
                var face = last_side.block.mesh;
                face.material = traversedmat;
                break;
            }
        }
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