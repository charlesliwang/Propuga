function generateDebugPuzzle(voxelstruct) {
      //voxelstruct.createNewBlock(0,0,0,1);
      //voxelstruct.createNewBlock(0,0,0,0);
      //voxelstruct.createNewBlock(0,1,0,1);
      voxelstruct.createNewBlock(0,0,0,2);
      voxelstruct.createNewBlock(0,1,0,2);
      //voxelstruct.testNewBlock(0,1,0,2);
       voxelstruct.createNewBlock(0,2,0,1);
       voxelstruct.createNewBlock(0,1,1,2);
      var meshes = voxelstruct.getAllBlocks();
      console.log("TESTUPDATE")
      for(var i = 0; i < meshes.length; i++) {
          var mesh = meshes[i];
          mesh.sidea.updateTempNeighbors();
          mesh.sideb.updateTempNeighbors();
      }
      var result = voxelstruct.testNewBlock(0,1,0,1,1);
    //var result = voxelstruct.createNewBlock(0,1,0,1);
      console.log("RESULT: ");
      console.log(result);
      console.log("TESTUPDATE")
      for(var i = 0; i < meshes.length; i++) {
          var mesh = meshes[i];
          console.log(mesh.id);
          //console.log(mesh.sidea.neighbors);
          console.log(mesh.sidea.tempneighbors);
      }
      //voxelstruct.createNewBlock(0,1,0,1);
      // voxelstruct.testSetBlock(-1,0,0,0);
      // voxelstruct.testSetBlock(-1,1,0,2);
}

function generatePuzzle(n) {
    var block = new Block(0,0,0, 0,1,0);
    var block2 = new Block(1,0,0, 0,1,0);
    var meshes = [];
    meshes.push(block);
    meshes.push(block2);
    var t = 3;
    var last = 0;
    for(var i = 0; i < n; i++) {
        var end = meshes.length-1;
        var beg = end - 3;
        if (beg < 0) {
            beg = 0;
        }
        var buff = meshes.slice(beg,end);
        console.log(buff);
        var block3 = getAdjacentBlock(meshes[meshes.length-1],buff);
        console.log(block3);
        meshes.push(block3);
    }
    return meshes;
}


