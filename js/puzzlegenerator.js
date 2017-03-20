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
    // //console.log(options);
    // //console.log(available_options);
    var idx = Math.floor(Math.random() * available_options.length);
    return available_options[idx];
}

function generate(last, lastlast, voxelstruct, lambmat) {
    //console.log("GENERATING");
    //console.log(lastlast_voxel);
    //console.log(last_voxel);
    var return_voxel;
    var options = [true,true,true,true,true,true,true,true,true,true,true,true];
    var x = last.x;
    var y = last.y;
    var z = last.z;
    //console.log("FLAG");
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
                //console.log("BREAK");
                break;
            }
        }
        if(flag) {
            // //console.log("FLAG2 X");
            // //console.log("new x: " + new_x);
            // //console.log("new y: " + new_y);
            // //console.log("new z: " + new_z);
            // //console.log("new n: " + new_n);
            // //console.log(new_x);
            // //console.log(new_y);
            // //console.log(new_z);
            // //console.log(new_n);
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
                //console.log("BREAK");
                break;
            }
        }
        if(flag) {
            // //console.log("FLAG2 Y");
            // //console.log("new x: " + new_x);
            // //console.log("new y: " + new_y);
            // //console.log("new z: " + new_z);
            // //console.log("new n: " + new_n);
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
            if(rand_idx == 0) {
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
                //console.log("BREAK");
                break;
            }
        }
        if(flag) {
            // //console.log("FLAG2 Z");
            // //console.log("new x: " + new_x);
            // //console.log("new y: " + new_y);
            // //console.log("new z: " + new_z);
            // //console.log("new n: " + new_n);
            return_voxel = voxelstruct.createNewBlock(new_x,new_y,new_z,new_n);
            mesh = return_voxel.mesh;
            mesh.material = lambmat;
            mesh.material.side = THREE.DoubleSide;
            scene.add(mesh);
        }
        
    }
    return return_voxel;
    
}

function parsePuzzle(puzzle,voxelstruct) {
    nums = puzzle.split(" ");
    ////console.log(nums);
    for(var i = 0; i < nums.length; i = i+4) {
    ////console.log(i);
        var x = parseInt(nums[i]);
        var y = parseInt(nums[i+1]);
        var z = parseInt(nums[i+2]);
        var n = parseInt(nums[i+3]);
    // //console.log(x);
    // //console.log(y);
    // //console.log(z);
    // //console.log(n);
        var return_block = voxelstruct.createNewBlock(x,y,z,n);
        lastlast_voxel = last_voxel;
        last_voxel = return_block;
    }
}

function generateDebugPuzzle(voxelstruct) {
    //   lastlast_voxel = voxelstruct.createNewBlock(0,0,0,1);
    //   last_voxel = voxelstruct.createNewBlock(1,0,0,1);
    //   voxelstruct.createNewBlock(1,-1,0,2);
    //   voxelstruct.createNewBlock(1,-1,-1,1);
    //   voxelstruct.createNewBlock(2,-1,-1,1);
    //   lastlast_voxel = voxelstruct.createNewBlock(3,-1,-1,0);
    //   lastlast_voxel = voxelstruct.createNewBlock(2,-1,-1,2);
    //   last_voxel = voxelstruct.createNewBlock(1,-1,-1,2);
    var puzzle = "0 0 0 1 1 0 0 1 1 -1 0 2 1 -1 -1 1 2 -1 -1 1 3 -1 -1 0 2 -1 -1 2 1 -1 -1 2";

    puzzle = "0 0 0 1 1 0 0 1 1 -1 0 2 1 -1 -1 1 2 -1 -1 1 3 -1 -1 0 2 -1 -1 2 1 -1 -1 2 1 0 -2 1 1 -1 -2 2 1 -2 -2 2 1 -2 -2 0 1 -2 -1 0 0 -2 0 2 -1 -2 0 2 -1 -1 -1 1 0 -1 -1 0 0 -1 0 2 0 0 0 2 0 0 0 0 -1 0 0 1 -1 0 1 2";
    puzzle = "0 0 0 1 1 0 0 1 2 0 0 0 2 0 0 2 2 0 0 1 3 0 0 0 2 0 1 2 2 1 1 1 3 0 1 0 3 -1 1 0 3 -2 1 0 3 -2 2 2 3 -2 1 1 2 -2 1 1 1 -2 1 1 1 -2 1 0 0 -2 2 2 0 -2 1 1 0 -2 1 2 0 -1 1 2";
    puzzle = "0 0 0 1 1 0 0 1 2 -1 0 0 2 -1 0 2 2 0 0 2 1 0 0 2 1 1 0 2 1 2 -1 1 0 2 -1 1 0 1 -1 2 1 1 -1 0 1 0 -1 0 1 -1 -1 0 1 -2 -1 0 1 -2 0 2 1 -2 0 1 0 -2 0 1 -1 -2 0 1 -1 -2 -1 1 -1 -2 -1 2";
    puzzle = "0 0 0 1 1 0 0 1 1 0 0 2 2 0 0 2 3 0 0 2 3 1 0 1 3 0 0 0 2 0 0 1 2 0 1 2 2 0 0 0 2 1 0 1 2 1 0 0 1 2 0 1 1 1 0 2 0 1 0 2 -1 1 0 2 -1 1 0 0 -1 1 1 2 -1 1 0 1 -2 1 0 1";
    puzzle = "0 0 0 1 1 0 0 1 1 0 0 2 0 0 0 2 0 1 -1 1 0 1 -1 2 0 1 -2 0 0 0 -2 0 0 0 -1 0 0 0 0 0 -1 0 1 2 -1 1 1 1 -1 1 1 0 -1 1 0 0 -1 1 -1 0 -1 2 -1 0 -2 3 -1 1 -2 2 -1 0 -2 2 -1 2 -2 3 -2 1";
    //puzzle = "0 0 0 1 1 0 0 1 1 -1 0 2 1 -1 -1 1 2 -1 -1 1 3 -1 -1 0 2 -1 -1 2 1 -1 -1 2 1 0 -2 1 1 -1 -2 2 1 -2 -2 2 1 -2 -2 0 1 -2 -1 0 0 -2 0 2 -1 -2 0 2 -1 -1 -1 1 0 -1 -1 0 0 -1 0 2 0 0 0 2 0 0 0 0 -1 0 0 1 -1 0 1 2 -2 0 1 2 -2 0 0 0 -2 -1 0 0 -2 -1 0 1 -2 -1 1 1 -2 -1 2 1 -2 -2 2 0 -2 -2 1 0 -2 -2 0 0 -3 -2 0 2 -3 -1 0 2"
    parsePuzzle(puzzle, voxelstruct);
    //voxelstruct.createNewBlock(0,0,1,0);

      var meshes = voxelstruct.getAllBlocks();
    //   lastlast_voxel = meshes[meshes.length-2];
    //   last_voxel = meshes[meshes.length-1];
    // //console.log(lastlast_voxel);
    // //console.log(last_voxel);

      //voxelstruct.testNewBlock( 0,0,1,0,1);
    //var test = voxelstruct.createNewBlock( -3,0,0,1);
    //   //console.log(test);

    //voxelstruct.testNewBlock( -3,0,0,1,1);
      
      
    //   for(var i = 0; i < meshes.length; i++) {
    //       var mesh = meshes[i];

    //   }

}



function generatePuzzle(voxelstruct, n, lambmat) {
    Block.id = 0;
    Edge.id = 0;
    var puzzle = "0 0 0 1 1 0 0 1";
    parsePuzzle(puzzle, voxelstruct);
    for(var i = 0; i  < n - 2; i++) {
        generateByPress(voxelstruct,lambmat);
    }
}


function generateByPress(voxelstruct,lambmat) {
    //console.log("FLAG");
    var return_voxel = generate(last_voxel, lastlast_voxel,voxelstruct,lambmat);
    //console.log(return_voxel);
    lastlast_voxel = last_voxel;
    //console.log(lastlast_voxel.id);
    last_voxel = return_voxel;
    //console.log(last_voxel.id);
    //console.log("FLAG");
    //console.log(voxelstruct);
}

