traversedmat = new THREE.MeshLambertMaterial();
traversedmat.color.setHex(0xFF0000);
traversedmat.side = THREE.DoubleSide;

function startPuzzle(voxelstructure) {
    var face = voxelstructure.blocks[0].mesh;
    console.log(face);
    console.log(face.material);
    face.material = traversedmat;
    console.log("face");
    console.log(face.material);
}