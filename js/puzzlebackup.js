class VoxelStruct {
    constructor(n) {
        this.n = n;
        this.data = [n*n*n];
    }
    
    set(x,y,z) {
        this.data[x + n * (y + (n * z))] = 1;
    }

    get(x,y,z){
        return this.data[x + n * (y + (n * z))];
    }
}

class Block {
  constructor(x, y , z, x2, y2, z2) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;
    this.test = 0;
    var v1,v2,v3,v4;
    if(z2 == 1) {
        v1 = new THREE.Vector3(-0.5,-0.5,0.5);
        v2 = new THREE.Vector3(-0.5,0.5,0.5);
        v3 = new THREE.Vector3(0.5,0.5,0.5);
        v4 = new THREE.Vector3(0.5,-0.5,0.5);
    }
    if (z2 ==-1) {
        v1 = new THREE.Vector3(-0.5,-0.5,-0.5);
        v2 = new THREE.Vector3(-0.5,0.5,-0.5);
        v3 = new THREE.Vector3(0.5,0.5,-0.5);
        v4 = new THREE.Vector3(0.5,-0.5,-0.5);

    } 
    else if (x2 == 1) {
        v1 = new THREE.Vector3(0.5,-0.5,-0.5);
        v2 = new THREE.Vector3(0.5,-0.5,0.5);
        v3 = new THREE.Vector3(0.5,0.5,0.5);
        v4 = new THREE.Vector3(0.5,0.5,-0.5);
    }
     else if (x2 == -1) {
        v1 = new THREE.Vector3(-0.5,-0.5,-0.5);
        v2 = new THREE.Vector3(-0.5,0.5,-0.5);
        v3 = new THREE.Vector3(-0.5,0.5,0.5);
        v4 = new THREE.Vector3(-0.5,-0.5,0.5);
    } 
    else if (y2 == 1) {
        v1 = new THREE.Vector3(-0.5,0.5,-0.5);
        v2 = new THREE.Vector3(-0.5,0.5,0.5);
        v3 = new THREE.Vector3(0.5,0.5,0.5);
        v4 = new THREE.Vector3(0.5,0.5,-0.5);
    }
    else if (y2 == -1) {
        v1 = new THREE.Vector3(-0.5,-0.5,-0.5);
        v2 = new THREE.Vector3(-0.5,-0.5,0.5);
        v3 = new THREE.Vector3(0.5,-0.5,0.5);
        v4 = new THREE.Vector3(0.5,-0.5,-0.5);
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
    console.log(geom);
    var mesh= new THREE.Mesh( geom );
    this.mesh = mesh;
  }
}

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

function getRandomAdjacentVoxel(x,y,z,x2,y2,z2) {
    var rand = Math.random();
    if(rand < 4/12) {
        if(random < 1/12) {

        } else if(rand < 8/12) {
        
        } else if(rand < 8/12) {
        
        } else {

        }
    } else if(rand < 8/12) {
        //VOXEL ABOVE
    } else {
        //SAME VOXEL
    }
}

function getAdjacentBlock(block, block2) {
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

    if(block2.x2 == 1) {
        options[0] = false;
        options[1] = false;
    } else if(block2.x2 == -1) {
        options[0] = false;
        options[1] = false;
    } else if(block2.y2 == 1) {
        options[2] = false;
        options[3] = false;
    } else if(block2.y2 == -1) {
        options[2] = false;
        options[3] = false;
    } else if(block2.z2 == 1) {
        options[4] = false;
        options[5] = false;
    } else if(block2.z2 == -1) {
        options[4] = false;
        options[5] = false;
    }

    console.log(block.x2 - block2.x2);
    console.log(block.y2 - block2.y2);
    console.log(block.y2 - block2.y2);
    if(block.x2 - block2.x2 == 0 && block.y2 - block2.y2 == 0  && block.z2 - block2.z2 == 0 ) {
        console.log("TEST");
        var dx = block2.x2 - block.x2;
        var dy = block2.y2 - block.y2;
        var dz = block2.z2 - block.z2;
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
    for(var i = 0; i < n; i++) {
        var block3 = getAdjacentBlock(meshes[meshes.length-1],meshes[meshes.length-2]);
        console.log(block3);
        meshes.push(block3);
    }
    return meshes;
}

function testfunc(n) {
    return "lol " + n; 
}

