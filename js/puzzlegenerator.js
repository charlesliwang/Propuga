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


