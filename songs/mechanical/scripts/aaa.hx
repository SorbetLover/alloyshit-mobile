function create(){
    FlxG.camera.addShader(shader2 = new CustomShader("glitch effect/glitch"));

}

function postUpdate(){
    strumLines.members[3].cpu = true;
}
