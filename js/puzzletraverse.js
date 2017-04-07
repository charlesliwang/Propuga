traversedmat = new THREE.MeshBasicMaterial();
traversedmat.color.setHex(0x496DDB);
traversedmat.side = THREE.DoubleSide;
traversedmat1 = new THREE.MeshBasicMaterial();
traversedmat1.color.setHex(0x6C8AE5);
traversedmat1.side = THREE.DoubleSide;
traversedmat2 = new THREE.MeshBasicMaterial();
traversedmat2.color.setHex(0x0F38B4);
traversedmat2.side = THREE.DoubleSide;
traversedmat3 = new THREE.MeshBasicMaterial();
traversedmat3.color.setHex(0x2852D0);
traversedmat3.side = THREE.DoubleSide;

pathmat = new THREE.MeshBasicMaterial();
pathmat.color.setHex(0xFFFFFF);
pathmat.side = THREE.DoubleSide;

next_mats = [];
next_mats.push(traversedmat);
next_mats.push(traversedmat1);
next_mats.push(traversedmat2);
next_mats.push(traversedmat3);


currmat = new THREE.MeshBasicMaterial();
currmat.color.setHex(0xFFFFFF);
currmat.side = THREE.DoubleSide;


var last_side;
var last_neighbors = [];

var travelpath = [];
var animatepath = [];
var animatednorm = [];

var player;

function setPlayer(p) {
    player = p;
}

var startpathanim = false;

function updatePlayerPos(currside,side) {
    startpathanim = false;
    var nx = side.block.x + 0.5;
    var ny = side.block.y + 0.5;
    var nz = side.block.z + 0.5;
    if(side.side == 1) {
        // var position = { x : player.position.x, y: player.position.y, z: player.position.z};
        // var target = { x : nx, y: ny, z: nz };
        // if(position.x == target.x && position.y == target.y  && position.z== target.z ) {
        //     console.log("no need to move");
        //     return;
        // }
        // if(currside.n != side.block.n) {
        //     console.log("bend");
        // } else {
        //     var tween = new TWEEN.Tween( position ).to( target, 400 );
        //     tween.start();
        //     tween.onUpdate(function(){ 
        //         player.position.set(position.x,position.y, position.z);
        //     });
        // }
        if(side.block.n == 0) {
            nx += -0.4;
        } else if (side.block.n == 1) {
            ny += -0.4;
        } else if (side.block.n == 2) {
            nz += -0.4;
        }
        
    } else {
        if(side.block.n == 0) {
            nx -= 0.6;
        } else if(side.block.n == 1) {
            ny -= 0.6;
        } else if(side.block.n == 2) {
            nz -= 0.6;
        }
    }
        var position = { x : player.position.x, y: player.position.y, z: player.position.z};
        var target = { x : nx, y: ny, z: nz };
        if(position.x == target.x && position.y == target.y  && position.z== target.z ) {
            console.log("no need to move");
            return;
        }
        if(currside.n != side.block.n) {
            console.log("bend");
            var inter = { x : nx, y: ny, z: nz };
            if(currside.n == 0) {
                inter.x = position.x;
            } else if (currside.n == 1) {
                inter.y = position.y;
            } else if (currside.n == 2) {
                inter.z = position.z;
            }
            var tween = new TWEEN.Tween( position ).to( inter, 300 );
            tween.start();
            tween.onUpdate(function(){ 
                player.position.set(position.x,position.y, position.z);
            });
             tween.onComplete(function(){
            var tween2 = new TWEEN.Tween( inter ).to( target, 300 );
            tween2.start();
            tween2.onUpdate(function(){ 
                player.position.set(inter.x,inter.y, inter.z);
            });
            tween2.onComplete(function(){
                console.log("done");
                startpathanim = true;
            });
            });
        } else {
            var tween = new TWEEN.Tween( position ).to( target, 400 );
            tween.start();
            tween.onUpdate(function(){ 
                player.position.set(position.x,position.y, position.z);
            });
            tween.onComplete(function(){
                console.log("done");
                startpathanim = true;
            });
        }
        //player.position.set(x,y,z);
}

function startPuzzle(voxelstructure) {
    startpathanim = false;
    //console.log("pos");
    //console.log(player.position);
    travelpath = [];
    animatepath = [];
    animatednorm = [];
    console.log("current path: "); 
    console.log(travelpath); 
    //player.position.set(0.5,0.1,0.5);
    last_side = voxelstructure.blocks[0].sidea;
    var face = last_side.block.mesh;
    face.material = currmat;
    setNeighborColors(voxelstructure);
    voxelstructure.numBlocks = voxelstructure.blocks.length;
    player.position.set(0.5,0.1,0.5);
}

function stepToNextBlock(voxelstructure, d, lambmat) {
    resetNeighborColors(lambmat);
    //console.log(last_side);
    var block = last_side.block;
    var edge = block.edges[d];
    var adj = edge.getAdjacent(block.id);
    //console.log(adj);
    for(var i=0; i < adj.length; i++) {
        //console.log("test");
        if(adj[i] != null) {
            if(last_side.inNeighbors(adj[i].sidea) >= 0) {
                delete_this = last_side.block.mesh;
                voxelstructure.removeBlockUpdateGraph(last_side.block);
                travelpath.push(last_side);
                last_side = adj[i].sidea;
                //console.log(last_side);
                var face = last_side.block.mesh;
                face.material = currmat;
                delete_this.visible = false;
                setNeighborColors();
                break;
            }
            if(last_side.inNeighbors(adj[i].sideb) >= 0) {
                delete_this = last_side.block.mesh;
                voxelstructure.removeBlockUpdateGraph(last_side.block);
                travelpath.push(last_side);
    console.log("current path: "); 
    console.log(travelpath); 
                last_side = adj[i].sideb;
                //console.log(last_side);
                var face = last_side.block.mesh;
                face.material = currmat;
                delete_this.visible = false;
                setNeighborColors();
                break;
            }
        }
    }
}

function stepToNextNeighbor(voxelstructure, d, lambmat) {
    resetNeighborColors(lambmat);
    //console.log(last_side);
    var block = last_side.block;
    voxelstructure.removeBlockUpdateGraph(block);
    delete_this = last_side.block.mesh;
    travelpath.push(last_side);
    last_side = last_neighbors[d];
    //console.log(last_side);
    var face = last_side.block.mesh;
    face.material = currmat;
    delete_this.visible = false;
    updatePlayerPos(block,last_side);
    setNeighborColors(voxelstructure);
    if(last_neighbors.length == 0) {
        if(voxelstructure.numBlocks != 1) {
            //console.log("YOU LOSE");
            lose();
        } else {
            //console.log("YOU WIN");
            //alert("YOU WIN");
            travelpath.push(last_side);
            getPathSetColor(voxelstructure);
            
        }
    }

}

function setNeighborColors(voxelstructure) {
    last_neighbors = last_side.neighbors;
    ////console.log(last_neighbors.length);
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
      return puzzle;
}

function selectByColor(color, voxelstructure, lambmat) {
    var idx = null;
    for(var i = 0; i < 4; i++) {
        if(next_mats[i].color.equals(color) ){
            idx = i;
            //console.log(i + " YES");
        }
    }
    if(idx != null) {
        stepToNextNeighbor(voxelstruct,idx,lambmat);
    }

}

function getPathSetColor(voxelstructure) {
    console.log(startpathanim);
    // while(!startpathanim)  {
    // console.log("wait");
    // }
    for(var i = 0; i < travelpath.length; i++) {
        if(i != 0) {
            var s0 = travelpath[i-1];
            var s1 = travelpath[i];
            createPath(voxelstructure,s0,s1);
        }
        //travelpath[i].block.mesh.visible = true;
    }
    var tween = new TWEEN.Tween( 0 ).to( 1, 1000 );
    tween.start();
    tween.onUpdate(function(){ 
    
    });
    tween.onComplete(function(){
        animateWinPath(animatepath[0],0, voxelstructure);
    });
}

function animateWinPath(curve, idx, voxelstructure) {
    var norm = animatednorm[idx];
    var x1 = curve.geometry.vertices[0].x;
    var y1 = curve.geometry.vertices[0].y;
    var z1 = curve.geometry.vertices[0].z;
    var x2 = curve.geometry.vertices[1].x;
    var y2 = curve.geometry.vertices[1].y;
    var z2 = curve.geometry.vertices[1].z;
    var start = {x: x1, y: y1, z: z1};
    var end = {x: x2, y: y2, z: z2};
    var dir = {x: end.x - start.x, y: end.y - start.y, z: end.z - start.z};
    var max = Math.max(Math.abs(dir.x),Math.abs(dir.y),Math.abs(dir.z));
    dir.x/=max;
    dir.y/=max;
    dir.z/=max;
    //curve.visible = true;
    var scale = 0;
    var v1 = new THREE.Vector3(x1,y1,z1);
    var v2 = new THREE.Vector3(x1,y1,z1);
    var v3 = new THREE.Vector3(x2,y2,z2);
    var v4 = new THREE.Vector3(x2,y2,z2);
    var fbuf = 0.3;
    var bbuf = -0.3;
    if(idx != 0) {
        if(animatednorm[idx] != animatednorm[idx-1]) {
            bbuf = 0;
        }
    } else {
        bbuf = 0.3;
    }
    if(idx < animatednorm.length - 1) {
        if(animatednorm[idx] != animatednorm[idx+1]) {
            fbuf = 0;
        }
    }
    var width = 0.3;
    if(norm == 0) {
        if(dir.y != 0) {
            v1.add(new THREE.Vector3(0,-dir.y*bbuf, width));
            v2.add(new THREE.Vector3(0,-dir.y*bbuf, -width));
            v3.add(new THREE.Vector3(0,dir.y*fbuf, -width));
            v4.add(new THREE.Vector3(0,dir.y*fbuf, width));
        } else {
            v1.add(new THREE.Vector3(0,width,-dir.z*bbuf));
            v2.add(new THREE.Vector3(0,-width,-dir.z*bbuf));
            v3.add(new THREE.Vector3(0,-width,dir.z*fbuf));
            v4.add(new THREE.Vector3(0,width,dir.z*fbuf));
        }
    } else if(norm == 1) {
        if(dir.x != 0) {
            v1.add(new THREE.Vector3(-dir.x*bbuf,0, width));
            v2.add(new THREE.Vector3(-dir.x*bbuf,0, -width));
            v3.add(new THREE.Vector3(dir.x*fbuf,0, -width));
            v4.add(new THREE.Vector3(dir.x*fbuf,0, width));
        } else {
            v1.add(new THREE.Vector3(-width, 0, -dir.z*bbuf));
            v2.add(new THREE.Vector3(width,0, -dir.z*bbuf));
            v3.add(new THREE.Vector3(width, 0, dir.z*fbuf));
            v4.add(new THREE.Vector3(-width,0, dir.z*fbuf));
        }
    } else if(norm == 2) {
        if(dir.x != 0) {
            v1.add(new THREE.Vector3(-dir.x*bbuf,width, 0));
            v2.add(new THREE.Vector3(-dir.x*bbuf,-width, 0));
            v3.add(new THREE.Vector3(dir.x*fbuf,-width,0));
            v4.add(new THREE.Vector3(dir.x*fbuf,width,0));
        } else {
            v1.add(new THREE.Vector3(width, -dir.y*bbuf, 0));
            v2.add(new THREE.Vector3(-width,-dir.y*bbuf, 0));
            v3.add(new THREE.Vector3(-width,dir.y*fbuf,0));
            v4.add(new THREE.Vector3(width,dir.y*fbuf,0));
        }
        
    }
    var geom = new THREE.Geometry();
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.vertices.push(v4);
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 0, 2, 3 ) );
    geom.computeFaceNormals();
    var mesh= new THREE.Mesh( geom);
    mesh.material = lambmat;
    scene.add(mesh);

    // var s1 = {x: v1.x, y: v1.y, z: v1.z};
    // var s2 = {x: v2.x, y: v2.y, z: v2.z};
    // var e1 = {x: v3.x, y: v3.y, z: v3.z};
    // var e2 = {x: v4.x, y: v4.y, z: v4.z};
    var e3 = v3.clone();
    var e4 = v4.clone();
    var t = {x:0};
    var tn = {x:1};
    geom.visible = false;
    var animlength = 5000/num_generations;
    if (max < 0.9) {
        animlength /= 2;
    }
    var tw = new TWEEN.Tween( t ).to( tn, animlength );
    geom.verticesNeedUpdate = true;
    geom.vertices[3].lerpVectors(geom.vertices[0],e4,0);
    geom.vertices[2].lerpVectors(geom.vertices[1],e3,0);
    geom.visible = true;
    tw.start();
    tw.onUpdate(function(){ 
        //console.log(t.x);
        //console.log("go");
        geom.verticesNeedUpdate = true;
        geom.vertices[3].lerpVectors(geom.vertices[0],e4,t.x);
        geom.vertices[2].lerpVectors(geom.vertices[1],e3,t.x);
    });
    tw.onComplete(function(){
        if(idx + 1 < animatepath.length) {
            animateWinPath(animatepath[idx+1], idx+1,voxelstructure)
        } else {
            win();
        }
    });

    // var tween = new TWEEN.Tween( start ).to( end, 1000 );
    // tween.start();
    // curve.geometry.vertices[1].x = start.x;
    // curve.geometry.vertices[1].y = start.y;
    // curve.geometry.vertices[1].z = start.z;
    // curve.visible = true;
    // tween.onUpdate(function(){ 
    //     curve.geometry.verticesNeedUpdate = true;
    //     geom.verticesNeedUpdate = true;
    //     //console.log("start " + start.x);
    //     //console.log("curve " + curve.geometry.vertices[1].x);
    //       curve.geometry.vertices[1].x = start.x;
    //       curve.geometry.vertices[1].y = start.y;
    //       curve.geometry.vertices[1].z = start.z;
    //     //  curve.geometry.vertices[1].y = start.y;
    //     //  curve.geometry.vertices[1].z = start.z;
    // });
    // tween.onComplete(function(){
    //     if(idx + 1 < animatepath.length) {
    //         animateWinPath(animatepath[idx+1], idx+1,voxelstructure)
    //     } else {
    //         win();
    //     }
    // });
}

var curvemat = new THREE.LineBasicMaterial( { color : 0x0000FF } );

function createPath(voxelstruct,s0, s1) {
    b0 = s0.block;
    b1 = s1.block;
    p0 = b0.getWorldPos();
    p1 = b1.getWorldPos();
    p0[b0.n] += (s0.side) * 0.05;
    p1[b1.n] += (s1.side) * 0.05;

    if(b0.n == b1.n) {
        var curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3( p0[0],p0[1],p0[2]),
            new THREE.Vector3( p0[0],p0[1],p0[2]),
            new THREE.Vector3( p1[0],p1[1],p1[2]),
            new THREE.Vector3( p1[0],p1[1],p1[2]),
        );

        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints( 1 );

        // Create the final object to add to the scene
        var curveObject = new THREE.Line( geometry, curvemat );
        curveObject.visible = false;
        voxelstruct.scene.add(curveObject);
        animatepath.push(curveObject);
        animatednorm.push(b0.n);

    } else {
        var pi = p1.slice();
        pi[b0.n] = p0[b0.n];
        var curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3( p0[0],p0[1],p0[2]),
            new THREE.Vector3( p0[0],p0[1],p0[2]),
            new THREE.Vector3( pi[0],pi[1],pi[2]),
            new THREE.Vector3( pi[0],pi[1],pi[2]),
        );

        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints( 1 );

        // Create the final object to add to the scene
        var curveObject = new THREE.Line( geometry, curvemat );
        curveObject.visible = false;
        voxelstruct.scene.add(curveObject);
        animatepath.push(curveObject);
        animatednorm.push(b0.n);

        var curve2 = new THREE.CubicBezierCurve3(
            new THREE.Vector3( pi[0],pi[1],pi[2]),
            new THREE.Vector3( pi[0],pi[1],pi[2]),
            new THREE.Vector3( p1[0],p1[1],p1[2]),
            new THREE.Vector3( p1[0],p1[1],p1[2]),
        );

        var geometry2 = new THREE.Geometry();
        geometry2.vertices = curve2.getPoints( 1 );

        // Create the final object to add to the scene
        var curveObject2 = new THREE.Line( geometry2, curvemat );
        curveObject2.visible = false;
        voxelstruct.scene.add(curveObject2);
        animatepath.push(curveObject2);
        animatednorm.push(b1.n);
    }
}

