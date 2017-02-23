var last_voxel;
var lastlast_voxel;

function randomAvailable(options) {
    var available_options = [];
    for(var i = 0; i < options.length; i++) {
        if (options[i] ) {
            available_options.push(i);
        }
    }
    if(available_options.length == 0){
        return -1;
    }
    console.log(options);
    console.log(available_options);
    var idx = Math.floor(Math.random() * available_options.length);
    return available_options[idx];
}

function generate(last, lastlast, voxelstruct, lambmat) {
    var return_voxel;
    var options = [true,true,true,true,true,true,true,true,true,true,true,true];
    var x = last.x;
    var y = last.y;
    var z = last.z;
    console.log("FLAG");
    if(last.n == 0) {
        if(lastlast.n == 0) {
            if(lastlast.y > last.y) {
                options[0] = false;
                options[1] = false;
                options[2] = false;
            } else {
                options[3] = false;
                options[4] = false;
                options[5] = false;
            }
            if(lastlast.z > last.z) {
                options[6] = false;
                options[7] = false;
                options[8] = false;
            } else  {
                options[9] = false;
                options[10] = false;
                options[11] = false;
            }
        }
        if(lastlast.n == 1) {
            if(lastlast.y > last.y) {
                options[0] = false;
                options[1] = false;
                options[2] = false;
            } else {
                options[3] = false;
                options[4] = false;
                options[5] = false;
            }
        }
        if(lastlast.n == 2) {
            if(lastlast.z > last.z) {
                options[6] = false;
                options[7] = false;
                options[8] = false;
            } else  {
                options[9] = false;
                options[10] = false;
                options[11] = false;
            }
        }
        var flag = false;
        var new_x;
        var new_y;
        var new_z;
        var new_n;
        var rand_idx = randomAvailable(options);
        while(!flag) {
            if(rand_idx == 0) {
                new_x = x - 1;
                new_y = y + 1;
                new_z = z;
                new_n = 1;
            } else if(rand_idx == 1) {
                new_x = x;
                new_y = y + 1;
                new_z = z;
                new_n = 0;
            } else if(rand_idx == 2) {
                new_x = x;
                new_y = y + 1;
                new_z = z;
                new_n = 1;
            } else if(rand_idx == 3) {
                new_x = x - 1;
                new_y = y;
                new_z = z;
                new_n = 1;
            } else if(rand_idx == 4) {
                new_x = x;
                new_y = y - 1;
                new_z = z;
                new_n = 0;
            } else if(rand_idx == 5) {
                new_x = x;
                new_y = y;
                new_z = z;
                new_n = 1;
            } else if(rand_idx == 6) {
                new_x = x-1;
                new_y = y;
                new_z = z+1;
                new_n = 2;
            } else if(rand_idx == 7) {
                new_x = x;
                new_y = y;
                new_z = z+1;
                new_n = 0;
            } else if(rand_idx == 8) {
                new_x = x;
                new_y = y;
                new_z = z+1;
                new_n = 2;
            } else if(rand_idx == 9) {
                new_x = x-1;
                new_y = y;
                new_z = z;
                new_n = 2;
            } else if(rand_idx == 10) {
                new_x = x;
                new_y = y;
                new_z = z-1;
                new_n = 0;
            } else if(rand_idx == 11) {
                new_x = x;
                new_y = y;
                new_z = z;
                new_n = 2;
            }

            if(voxelstruct.get(new_x,new_y,new_z) == null) {
                flag = voxelstruct.testNewBlock(new_x,new_y,new_z,new_n,1);
            } else if(voxelstruct.get(new_x,new_y,new_z).getBlock(new_n) == null) {
                flag = voxelstruct.testNewBlock(new_x,new_y,new_z,new_n,1);
            }
            else {
                options[rand_idx] = false;
            }
            if(!flag) {
                options[rand_idx] = false;
                var rand_idx = randomAvailable(options);
            }
            if(rand_idx == -1) {
                console.log("BREAK");
                break;
            }
        }
        if(flag) {
            console.log("FLAG2");
            console.log(new_x);
            console.log(new_y);
            console.log(new_z);
            console.log(new_n);
            return_voxel = voxelstruct.createNewBlock(new_x,new_y,new_z,new_n);
            mesh = return_voxel.mesh;
            mesh.material = lambmat;
            mesh.material.side = THREE.DoubleSide;
            scene.add(mesh);
        }
    }
    if(last.n == 1) {
        if(lastlast.n == 1) {
            if(lastlast.z < last.z) {
                options[0] = false;
                options[1] = false;
                options[2] = false;
            } else {
                options[3] = false;
                options[4] = false;
                options[5] = false;
            }
            if(lastlast.x < last.x) {
                options[6] = false;
                options[7] = false;
                options[8] = false;
            } else  {
                options[9] = false;
                options[10] = false;
                options[11] = false;
            }
        }
        if(lastlast.n == 0) {
            if(lastlast.x < last.x) {
                options[6] = false;
                options[7] = false;
                options[8] = false;
            } else  {
                options[9] = false;
                options[10] = false;
                options[11] = false;
            }
        }
        if(lastlast.n == 2) {
            if(lastlast.z < last.z) {
                options[0] = false;
                options[1] = false;
                options[2] = false;
            } else {
                options[3] = false;
                options[4] = false;
                options[5] = false;
            }
        }
        var flag = false;
        var new_x;
        var new_y;
        var new_z;
        var new_n;
        var rand_idx = randomAvailable(options);
        while(!flag) {
            if(rand_idx == 0) {
                new_x = x;
                new_y = y;
                new_z = z;
                new_n = 2;
            } else if(rand_idx == 1) {
                new_x = x;
                new_y = y;
                new_z = z-1;
                new_n = 1;
            } else if(rand_idx == 2) {
                new_x = x;
                new_y = y-1;
                new_z = z;
                new_n = 2;
            } else if(rand_idx == 3) {
                new_x = x;
                new_y = y;
                new_z = z+1;
                new_n = 2;
            } else if(rand_idx == 4) {
                new_x = x;
                new_y = y;
                new_z = z+1;
                new_n = 1;
            } else if(rand_idx == 5) {
                new_x = x;
                new_y = y-1;
                new_z = z+1;
                new_n = 2;
            } else if(rand_idx == 6) {
                new_x = x;
                new_y = y;
                new_z = z;
                new_n = 0;
            } else if(rand_idx == 7) {
                new_x = x-1;
                new_y = y;
                new_z = z;
                new_n = 1;
            } else if(rand_idx == 8) {
                new_x = x;
                new_y = y-1;
                new_z = z;
                new_n = 0;
            } else if(rand_idx == 9) {
                new_x = x+1;
                new_y = y;
                new_z = z;
                new_n = 0;
            } else if(rand_idx == 10) {
                new_x = x+1;
                new_y = y;
                new_z = z;
                new_n = 1;
            } else if(rand_idx == 11) {
                new_x = x+1;
                new_y = y-1;
                new_z = z;
                new_n = 0;
            }

            if(voxelstruct.get(new_x,new_y,new_z) == null) {
                flag = voxelstruct.testNewBlock(new_x,new_y,new_z,new_n,1);
            } else if(voxelstruct.get(new_x,new_y,new_z).getBlock(new_n) == null) {
                flag = voxelstruct.testNewBlock(new_x,new_y,new_z,new_n,1);
            }
            else {
                options[rand_idx] = false;
            }
            if(!flag) {
                options[rand_idx] = false;
                var rand_idx = randomAvailable(options);
            }
            if(rand_idx == -1) {
                console.log("BREAK");
                break;
            }
        }
        if(flag) {
            console.log("FLAG2");
            return_voxel = voxelstruct.createNewBlock(new_x,new_y,new_z,new_n);
            mesh = return_voxel.mesh;
            mesh.material = lambmat;
            mesh.material.side = THREE.DoubleSide;
            scene.add(mesh);
        }
    }
    if(last.n == 2) {
        if(lastlast.n == 2) {
            if(lastlast.y > last.y) {
                options[0] = false;
                options[1] = false;
                options[2] = false;
            } else {
                options[3] = false;
                options[4] = false;
                options[5] = false;
            }
            if(lastlast.x < last.x) {
                options[6] = false;
                options[7] = false;
                options[8] = false;
            } else  {
                options[9] = false;
                options[10] = false;
                options[11] = false;
            }
        }
        if(lastlast.n == 1) {
            if(lastlast.y > last.y) {
                options[0] = false;
                options[1] = false;
                options[2] = false;
            } else {
                options[3] = false;
                options[4] = false;
                options[5] = false;
            }
        }
        if(lastlast.n == 0) {
            if(lastlast.x < last.x) {
                options[6] = false;
                options[7] = false;
                options[8] = false;
            } else  {
                options[9] = false;
                options[10] = false;
                options[11] = false;
            }
        }
        var flag = false;
        var new_x;
        var new_y;
        var new_z;
        var new_n;
        var rand_idx = randomAvailable(options);
        while(!flag) {
            if(rand_idx == 2) {
                new_x = x;
                new_y = y + 1;
                new_z = z - 1;
                new_n = 1;
            } else if(rand_idx == 1) {
                new_x = x;
                new_y = y + 1;
                new_z = z;
                new_n = 2;
            } else if(rand_idx == 2) {
                new_x = x;
                new_y = y + 1;
                new_z = z;
                new_n = 1;
            } else if(rand_idx == 3) {
                new_x = x;
                new_y = y;
                new_z = z - 1;
                new_n = 1;
            } else if(rand_idx == 4) {
                new_x = x;
                new_y = y - 1;
                new_z = z;
                new_n = 2;
            } else if(rand_idx == 5) {
                new_x = x;
                new_y = y;
                new_z = z;
                new_n = 1;
            } else if(rand_idx == 6) {
                new_x = x;
                new_y = y;
                new_z = z-1;
                new_n = 0;
            } else if(rand_idx == 7) {
                new_x = x-1;
                new_y = y;
                new_z = z;
                new_n = 2;
            } else if(rand_idx == 8) {
                new_x = x;
                new_y = y;
                new_z = z;
                new_n = 0;
            } else if(rand_idx == 9) {
                new_x = x+1;
                new_y = y;
                new_z = z-1;
                new_n = 0;
            } else if(rand_idx == 10) {
                new_x = x+1;
                new_y = y;
                new_z = z;
                new_n = 2;
            } else if(rand_idx == 11) {
                new_x = x+1;
                new_y = y;
                new_z = z;
                new_n = 0;
            }

            if(voxelstruct.get(new_x,new_y,new_z) == null) {
                flag = voxelstruct.testNewBlock(new_x,new_y,new_z,new_n,1);
            } else if(voxelstruct.get(new_x,new_y,new_z).getBlock(new_n) == null) {
                flag = voxelstruct.testNewBlock(new_x,new_y,new_z,new_n,1);
            }
            else {
                options[rand_idx] = false;
            }
            if(!flag) {
                options[rand_idx] = false;
                var rand_idx = randomAvailable(options);
            }
            if(rand_idx == -1) {
                console.log("BREAK");
                break;
            }
        }
        if(flag) {
            console.log("FLAG2");
            console.log(new_x);
            console.log(new_y);
            console.log(new_z);
            console.log(new_n);
            return_voxel = voxelstruct.createNewBlock(new_x,new_y,new_z,new_n);
            mesh = return_voxel.mesh;
            mesh.material = lambmat;
            mesh.material.side = THREE.DoubleSide;
            scene.add(mesh);
        }
        
    }
    return return_voxel;
    
}

function generateDebugPuzzle(voxelstruct) {
      //last_voxel = voxelstruct.createNewBlock(0,0,0,1);
      lastlast_voxel = voxelstruct.createNewBlock(0,0,0,1);
      last_voxel = voxelstruct.createNewBlock(1,0,0,1);
      //var result2 = voxelstruct.testNewBlock(0,2,0,0,1);
      
      //last_voxel = voxelstruct.createNewBlock(0,0,0,2);
      //last_voxel = voxelstruct.createNewBlock(0,1,0,2);
      
      //voxelstruct.testNewBlock(0,1,0,2);
      //voxelstruct.createNewBlock(0,2,0,1);
    //voxelstruct.createNewBlock(0,1,1,2);
      var meshes = voxelstruct.getAllBlocks();
      //var result = voxelstruct.testNewBlock(0,1,0,1,1);
      //voxelstruct.createNewBlock(0,1,0,1);
      //voxelstruct.createNewBlock(1,1,0,1);
      
      for(var i = 0; i < meshes.length; i++) {
          var mesh = meshes[i];
          //console.log(mesh.id);
          //console.log(mesh.sidea.neighbors);
          //console.log(mesh.sidea.tempneighbors);
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


function generateByPress(voxelstruct,lambmat) {
    console.log("FLAG");
    var return_voxel = generate(last_voxel, lastlast_voxel,voxelstruct,lambmat);
    lastlast_voxel = last_voxel;
    console.log(lastlast_voxel.id);
    last_voxel = return_voxel;
    console.log(last_voxel.id);
    console.log("FLAG");
    console.log(voxelstruct);
}

