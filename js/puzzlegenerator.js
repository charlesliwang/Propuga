function randomAvailable(options) {
    var available_options = [];
    for(var i = 0; i < options.length; i++) {
        if (options[i] ) {
            available_options.push(i);
        }
    }
    console.log(options);
    console.log(available_options);
    var idx = Math.floor(Math.random() * available_options.length);
    return available_options[idx];
}

function getAdjacentBlock(block, blocks) {
    
    //Same Plane Adjacency
    var new_x = block.x;
    var new_y = block.y;
    var new_z = block.z;

    var options = [];
    if(block.x2 == 1) {
        options = [false,false,true,true,true,true];
    } else if(block.x2 == -1) {
        options = [false,false,true,true,true,true];
    } else if(block.y2 == 1) {
        options = [true,true,false,false,true,true];
    } else if(block.y2 == -1) {
        options = [true,true,false,false,true,true];
    } else if(block.z2 == 1) {
        options = [true,true,true,true,false,false];
    } else if(block.z2 == -1) {
        options = [true,true,true,true,false,false];
    }

    for(var i = 0; i < blocks.length; i++) {
        block2 = blocks[i];
    if(block2.x2 == 1) {
        options[0] = false;
        //options[1] = false;
    } else if(block2.x2 == -1) {
        //options[0] = false;
        options[1] = false;
    } else if(block2.y2 == 1) {
        options[2] = false;
        //options[3] = false;
    } else if(block2.y2 == -1) {
        //options[2] = false;
        options[3] = false;
    } else if(block2.z2 == 1) {
        options[4] = false;
        //options[5] = false;
    } else if(block2.z2 == -1) {
        //options[4] = false;
        options[5] = false;
    }

    if(block.x2 - block2.x2 == 0 && block.y2 - block2.y2 == 0  && block.z2 - block2.z2 == 0 ) {
        var dx = block2.x - block.x;
        var dy = block2.y - block.y;
        var dz = block2.z - block.z;
        console.log("TEST");
        console.log(dx);
        console.log(dy);
        console.log(dz);
        if(dx >= 1) {
            options[0] = false;
        } else if(dx <= -1) {
            options[1] = false;
        } else if(dy >= 1) {
            options[2] = false;
        } else if(dy <= -1) {
            options[3] = false;
        } else if(dz >= 1) {
            options[4] = false;
        } else if(dz <= -1) {
            options[5] = false;
    }
        
    }
    }

    var rand_neighbor = randomAvailable(options);
    var change_list = [0,0,0,0,0,0];
    change_list[rand_neighbor] = 1;
    console.log(change_list);
    var rand = Math.random()*3;
    var x2 = block.x2;
    var y2 = block.y2;
    var z2 = block.z2;
    console.log("rand: " + rand);
    if(rand < 1) {
        x2 = change_list[0] - change_list[1];
        y2 = change_list[2] - change_list[3];
        z2 = change_list[4] - change_list[5];
    } else if (rand < 2) {
        new_x += change_list[0] - change_list[1];
        new_y += change_list[2] - change_list[3];
        new_z += change_list[4] - change_list[5];
    } else {
        new_x += block.x2;
        new_y += block.y2;
        new_z += block.z2;
        x2 = change_list[0] - change_list[1];
        y2 = change_list[2] - change_list[3];
        z2 = change_list[4] - change_list[5];
    };
    
    return new Block(new_x,new_y,new_z, x2,y2,z2);

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

function testfunc(n) {
    return "lol " + n; 
}

