function postCreate(){
//     for(i in 0...playerStrums.length){
//         for(e in 0...3){
//             playerStrums.members[e].x = (FlxG.width / 2) + (110 * i - 1000);
//         }
//     }
    if(curSong != "interlope"){
        for(i in 0...strumLines.length){
            if(strumLines.members[i].cpu == false){
                for(e in 0...4){
                    trace("CI");
                    strumLines.members[i].members[e].x = ((FlxG.width / 2) + (110 * e));
                    strumLines.members[i].members[e].x -= 220;
                }

            }
            
        }

        for(i in 0...strumLines.length){
            if(strumLines.members[i].cpu == true){
                for(e in 0...4){
                    trace("CI");
                    strumLines.members[i].members[e].x = -1000;
                }

            }
            
        }
    }
}

// function postUpdate(){
//     for(i in cpuStrums.members){
//         // remove(i);
//         i.y = 1000;
//     }

// }