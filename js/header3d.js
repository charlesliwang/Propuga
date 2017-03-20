
var scene, camera, renderer, canvas;
var pickingTexture;
var camera_piv;
var camera_y;

var container = document.getElementById( 'TitleHeader' );
var objects = [];
var lights = [];
var mixers = [];
var clock = new THREE.Clock();

var saved_puzzle;


    init();
    animate();



    // Sets up the scene.
    function init() {
      // Create the scene and set the scene size.
    pickingTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
	pickingTexture.texture.minFilter = THREE.LinearFilter;
    container = document.getElementById( 'TitleHeader' );
    var WIDTH = container.offsetWidth,
          HEIGHT = container.offsetHeight;

    canvas = document.createElement('canvas');

    renderer = new THREE.WebGLRenderer({antialias:true, canvas:canvas});
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild( renderer.domElement );

    
    renderer.setClearColor( 0x457f96 );
    renderer.setPixelRatio( window.devicePixelRatio );
        
    renderer.shadowMap.enabled = true;
	  renderer.shadowMap.renderReverseSided = false;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
        
    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,0,10);
    camera_y = new THREE.Object3D();
    camera_y.position.set(0,0,0);
    camera_piv = new THREE.Object3D();
    camera_piv.position.set(0,0,0);
    camera_y.add(camera_piv);
    camera_piv.add( camera );
        camera_piv.rotateX(-0.2);
        camera_y.position.set(0,0,0);
        camera.lookAt(camera_y.position);




      // Create an event listener that resizes the renderer with the browser window.
      window.addEventListener('resize', function() { 
        container = document.getElementById( 'TitleHeader' );
        var WIDTH = container.offsetWidth,
            HEIGHT = container.offsetHeight;
        camera.aspect = WIDTH / HEIGHT;
        renderer.setSize(WIDTH, HEIGHT);
        camera.updateProjectionMatrix();
      });
        
        generateNewScene();

        generateNewVoxelStructure(0);
    }

    function generateNewScene() {

        scene = new THREE.Scene();
        var playergeo = new THREE.SphereGeometry( 0.1, 32, 32 );
        var playermat = new THREE.MeshBasicMaterial( {color: 0x78FFD2} );
        var playersphere = new THREE.Mesh( playergeo, playermat );
        scene.add( playersphere );
        setPlayer(playersphere);


        scene.add(camera_y);
        var dirLight = new THREE.DirectionalLight(0xffffff, 1 );
        dirLight.color.set(0xFF8799);
        dirLight.position.set( -1, 1.75, 1 );

        var dirLight2 = new THREE.DirectionalLight(0xffffff, 1 );
        dirLight2.color.set(0xC95D63);
        dirLight2.position.set( 0.5,0,-1 );

        scene.add( dirLight );
        scene.add( dirLight2 );
        console.log(scene);
    }

    function generateNewVoxelStructure(option) {
      lambmat = new THREE.MeshLambertMaterial();

      voxelstruct = new VoxelStruct(20, scene);
      console.log("n: " + voxelstruct.getn());

      if(option == 0) {
        generateDebugPuzzle(voxelstruct);
      } else if (option == 1) {
          console.log(saved_puzzle);
        parsePuzzle(saved_puzzle, voxelstruct);
      } else {
        generatePuzzle(voxelstruct, 20,lambmat);
      }

      var wire_mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
      var edge_mat = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 10 } );



      var meshes = voxelstruct.getAllBlocks();
      for(var i = 0; i < meshes.length; i++) {
            var block = meshes[i];
            var edges = block.getAllEdges();
            // for(var j = 0; j < edges.length; j++) {
            //   console.log(block.getEdge(j));
            // }
            mesh = meshes[i].mesh;
            mesh.material = lambmat;
            mesh.material.side = THREE.DoubleSide;
            scene.add(mesh);
      }

      startPuzzle(voxelstruct);

      var num = 0;
      var disp_edge = true;
      if(disp_edge) {
      for(var i = 0; i < voxelstruct.getlength(); i++) {
            if(voxelstruct.getidx(i) != null) {
              var vox = voxelstruct.getidx(i);
              var cube = vox.getCube();
              var cube = voxelstruct.getidx(i).getCube();
              var geo = new THREE.EdgesGeometry( cube ); // or WireframeGeometry( geometry )
              geo.translate(vox.getX()+0.5,vox.getY()+0.5,vox.getZ()+0.5);
              var wireframe = new THREE.LineSegments( geo, wire_mat );
              //scene.add( wireframe );
              for(var j = 0; j < 3; j++) {
                if(vox.getEdge(j) != null) {
                  ++num;
                  var edge = vox.getEdge(j);
                  //console.log(edge.x +  " " + edge.y + " " + edge.z + " " + edge.n);
                  //console.log(edge.getAllFaces());
                  var line = edge.getLine();   
                  var edge_disp = new THREE.LineSegments( line, edge_mat );
                  scene.add( edge_disp );
                }
              }
            }
      }
      }
      console.log("number of edges total: " + num);
        
    }

    // Renders the scene and updates the render as needed.
    function animate() {

      // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
      
      // Render the scene.
      requestAnimationFrame(animate);
      camera.updateMatrixWorld();
      var clockdelta = clock.getDelta()*0.08;
        for ( var i = 0; i < mixers.length; i ++ ) {
            mixers[ i ].update( clockdelta );
        }
      renderer.render(scene, camera);

    }

    

    var el = document.body,
            lastPos = null,
            timer = 0,
            newPos;

        function clear() {
          lastPos = null;
          el.removeAttribute('style');
    };
        
    window.onscroll = function() {checkScrollSpeed();}
    

    function checkScrollSpeed(){
//           newPos = window.scrollY;
//     if ( lastPos != null ){ // && newPos < maxScroll 
//         var delta = newPos -  lastPos;

//         var rotWorldMatrix = new THREE.Matrix4();
//         var axis = new THREE.Vector3(0,1,0);
              
//             // min/max values
// //            if( delta > 45 ) delta = 45;
// //            else if( delta < -45 ) delta = -45;
// //            camera.rotateX(delta * 0.1 * Math.PI / 180);
// //            camera.translateX(delta*0.1);
//             if(newPos < 700) {
//             camera_piv.rotateY(-delta*0.001)
//             }
              
//             //camera.lookAt(new THREE.Vector3(0,0,0));

//           }
//           lastPos = newPos;
//           timer && clearTimeout(timer);
//           timer = setTimeout(clear, 30);
          
          
    };

    moveCamera = false;
    rotCamera = false;
    zoomCamera = false;
    x_pos = 0;
    y_pos = 0;
    dx = 0;
    dy = 0;
    document.addEventListener('mousedown', function(event) {   
        var ctrlKeyPressed = event.altKey;
        var shiftKeyPressed = event.shiftKey;
        if(ctrlKeyPressed) {
            if(!shiftKeyPressed) {
            rotCamera = true;
            x_pos = event.clientX;
            y_pos = event.clientY;
            dx = 0;
            dy = 0;
        } else {
            zoomCamera = true;
            x_pos = event.clientX;
            y_pos = event.clientY;
            dx = 0;
            dy = 0;
        }
        } else if(shiftKeyPressed) {
            moveCamera = true;
            x_pos = event.clientX;
            y_pos = event.clientY;
            dx = 0;
            dy = 0;
        }
        
        else {
        var x = event.clientX;
        var y = event.clientY;
        renderer.render( scene, camera, pickingTexture );
        var pixelBuffer = new Uint8Array( 4 );
        renderer.readRenderTargetPixels(pickingTexture, x, pickingTexture.height- y, 1, 1, pixelBuffer);
        var coor = "X coords: " + x + ", Y coords: " + y;
        var color = new THREE.Color(pixelBuffer[0]/255,pixelBuffer[1]/255,pixelBuffer[2]/255);
        selectByColor(color, voxelstruct,lambmat);
        }
    });

    document.addEventListener('mouseup', function(event) {   
        moveCamera = false;
        rotCamera = false;
        zoomCamera = false;
    });

    document.addEventListener('mousemove', function(event) {  
        if(!event.altKey) {
            rotCamera = false;
            zoomCamera = false;
        } else if(!event.shiftKey) {
            moveCamera = false;
            zoomCamera = false;
        }
        if(moveCamera) {
            var new_dx = event.clientX - x_pos;
            var new_dy = event.clientY - y_pos;
            var a = new THREE.Vector4( 1, 0, 0 ,0);
            a.normalize();
            camera_y.translateOnAxis ( new THREE.Vector3(a.x,a.y,a.z), -0.01*(new_dx - dx) );
            var a2 = new THREE.Vector4( 0, 1, 0 ,0);
            a2.normalize();
            camera_y.translateOnAxis ( new THREE.Vector3(a2.x,a2.y,a2.z), 0.01*(new_dy - dy) );
            dx = new_dx;
            dy = new_dy;
        }
        if(rotCamera) {
            var new_dx = event.clientX - x_pos;
            var new_dy = event.clientY - y_pos;
            camera_y.rotateY(-0.01*(new_dx - dx));
            camera_piv.rotateX(-0.01*(new_dy - dy));
            dx = new_dx;
            dy = new_dy;
        }
        if(zoomCamera) {
            var new_dx = event.clientX - x_pos;
            var new_dy = event.clientY - y_pos;
            var a = new THREE.Vector4( 0, 0, 1 ,0);
            a.normalize();
            camera.translateOnAxis ( new THREE.Vector3(a.x,a.y,a.z), -0.01*(new_dx - dx) );
            if(camera.position.z < 0) {
                camera.position.set(0,0,0);
            }
            dx = new_dx;
            dy = new_dy;
        }
        
    });


    x_rot = 0;
    y_rot = 0;
    document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        camera_y.rotateY(-0.1);
    }
    else if(event.keyCode == 39) {
        camera_y.rotateY(0.1);
    } 
    else if(event.keyCode == 38) {

        camera_piv.rotateX(-0.1);
    }
    else if(event.keyCode == 40) {
        camera_piv.rotateX(0.1);
    } else if(event.keyCode == 71) {
        generateByPress(voxelstruct,lambmat);
    } else if(event.keyCode == 87) {
        var a = new THREE.Vector4( 0, 0, 1 ,0);
        a.normalize();
        camera_y.translateOnAxis ( new THREE.Vector3(a.x,a.y,a.z), -0.1 );
        //camera_y.position.y += 0.1;
        //camera.lookAt(camera_piv.position);
    } else if(event.keyCode == 83) {
        var a = new THREE.Vector4( 0, 0, 1 ,0);
        a.normalize();
        camera_y.translateOnAxis ( new THREE.Vector3(a.x,a.y,a.z), 0.1 );
        //camera_y.position.y -= 0.1;
        //camera.lookAt(camera_piv.position);
    } else if(event.keyCode == 82) {
        camera_y.position.y += 0.1;
        //camera.lookAt(camera_piv.position);
    } else if(event.keyCode == 70) {
        camera_y.position.y -= 0.1;
        //camera.lookAt(camera_piv.position);
    } else if(event.keyCode == 65) {
        var a = new THREE.Vector4( 1, 0, 0 ,0);
        a.normalize();
        camera_y.translateOnAxis ( new THREE.Vector3(a.x,a.y,a.z), -0.1 );
        //camera.lookAt(camera_piv.position);
    } else if(event.keyCode == 68) {
        var a = new THREE.Vector4( 1, 0, 0 ,0);
        a.normalize();
        camera_y.translateOnAxis ( new THREE.Vector3(a.x,a.y,a.z), 0.1 );
        //camera.lookAt(camera_piv.position);
    } else if(event.keyCode == 80) {
        saved_puzzle = savePuzzle(voxelstruct);
        console.log(saved_puzzle);
        generateNewScene();
        generateNewVoxelStructure(1);
    } else if(event.keyCode == 79) {
        generateNewScene();
        generateNewVoxelStructure(2);
    } else if(event.keyCode == 49) {
        stepToNextBlock(voxelstruct,0,lambmat);
    } else if(event.keyCode == 50) {
        stepToNextBlock(voxelstruct,1,lambmat);
    } else if(event.keyCode == 51) {
        stepToNextBlock(voxelstruct,2,lambmat);
    } else if(event.keyCode == 52) {
        stepToNextBlock(voxelstruct,3,lambmat);
    } else if(event.keyCode == 53) {


        

    }
    
    });

