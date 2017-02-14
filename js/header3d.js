
var scene, camera, renderer;
var camera_piv;
var container = document.getElementById( 'TitleHeader' );
var objects = [];
var lights = [];
var mixers = [];
var clock = new THREE.Clock();


    init();
    animate();



    // Sets up the scene.
    function init() {
      // Create the scene and set the scene size.
    scene = new THREE.Scene();
    container = document.getElementById( 'TitleHeader' );
    var WIDTH = container.offsetWidth,
          HEIGHT = container.offsetHeight;

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild( renderer.domElement );

    
    renderer.setClearColor( 0x457f96 );
    renderer.setPixelRatio( window.devicePixelRatio );
        
    renderer.shadowMap.enabled = true;
	  renderer.shadowMap.renderReverseSided = false;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
        
    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,2,5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    camera_piv = new THREE.Object3D();
    camera_piv.add( camera );
    scene.add(camera_piv);


      // Create an event listener that resizes the renderer with the browser window.
      window.addEventListener('resize', function() { 
        container = document.getElementById( 'TitleHeader' );
        var WIDTH = container.offsetWidth,
            HEIGHT = container.offsetHeight;
        camera.aspect = WIDTH / HEIGHT;
        renderer.setSize(WIDTH, HEIGHT);
        camera.updateProjectionMatrix();
      });
        
        
        var dirLight = new THREE.DirectionalLight(0xffffff, 1 );
        dirLight.color.set(0xFFFFFF);
        dirLight.position.set( -1, 1.75, 1 );

         scene.add( dirLight );

      var customMat = new THREE.ShaderMaterial({
            uniforms: {
                
            },
            vertexShader: document.
                          getElementById('vertShader').text,
            fragmentShader: document.
                          getElementById('fragShader').text
        });
  

      voxelstruct = new VoxelStruct(3);
      console.log("n: " + voxelstruct.getn());

      voxelstruct.createNewBlock(0,0,0,1);
      voxelstruct.createNewBlock(0,0,0,0);
      // voxelstruct.testSetBlock(-1,0,0,0);
      // voxelstruct.testSetBlock(-1,1,0,2);
      

      var wire_mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
      var edge_mat = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 10 } );



      var meshes = voxelstruct.getAllBlocks();
      var lambmat = new THREE.MeshLambertMaterial();
      for(var i = 0; i < meshes.length; i++) {
            var block = meshes[i];
            console.log("normal" + block.n);
            var edges = block.getAllEdges();
            // for(var j = 0; j < edges.length; j++) {
            //   console.log(block.getEdge(j));
            // }
            mesh = meshes[i].mesh;
            mesh.material = lambmat;
            mesh.material.side = THREE.DoubleSide;
            scene.add(mesh);
      }
      var num = 0;
      for(var i = 0; i < voxelstruct.getlength(); i++) {
            if(voxelstruct.getidx(i) != null) {
              var vox = voxelstruct.getidx(i);
              var cube = vox.getCube();
              // var cube = voxelstruct.getidx(i).getCube();
              var geo = new THREE.EdgesGeometry( cube ); // or WireframeGeometry( geometry )
              geo.translate(vox.getX()+0.5,vox.getY()+0.5,vox.getZ()+0.5);
              var wireframe = new THREE.LineSegments( geo, wire_mat );
              scene.add( wireframe );
              for(var j = 0; j < 3; j++) {
                if(vox.getEdge(j) != null) {
                  ++num;
                  var edge = vox.getEdge(j);
                  console.log(edge.x +  " " + edge.y + " " + edge.z + " " + edge.n);
                  console.log(edge.getAllFaces());
                  var line = edge.getLine();   
                  var edge_disp = new THREE.LineSegments( line, edge_mat );
                  scene.add( edge_disp );
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
          newPos = window.scrollY;
    if ( lastPos != null ){ // && newPos < maxScroll 
        var delta = newPos -  lastPos;

        var rotWorldMatrix = new THREE.Matrix4();
        var axis = new THREE.Vector3(0,1,0);
              
            // min/max values
//            if( delta > 45 ) delta = 45;
//            else if( delta < -45 ) delta = -45;
//            camera.rotateX(delta * 0.1 * Math.PI / 180);
//            camera.translateX(delta*0.1);
            if(newPos < 700) {
            camera_piv.rotateY(-delta*0.001)
            }
              
            //camera.lookAt(new THREE.Vector3(0,0,0));

          }
          lastPos = newPos;
          timer && clearTimeout(timer);
          timer = setTimeout(clear, 30);
          
          
    };
        document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        camera_piv.rotateY(-0.05);
    }
    else if(event.keyCode == 39) {
        camera_piv.rotateY(0.05); 
    } 
    else if(event.keyCode == 38) {
        var x = camera.position.x*1.05;
        var y = camera.position.y*1.05;
        var z = camera.position.z*1.05;
        camera.position.set(x,y,z);
    }
    else if(event.keyCode == 40) {
        var x = camera.position.x/1.05;
        var y = camera.position.y/1.05;
        var z = camera.position.z/1.05;
        camera.position.set(x,y,z);
    }
    });
