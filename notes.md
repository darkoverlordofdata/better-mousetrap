### sdx

using sdx instead of directly using SDL. 

when loading sprite via TextureAtlas, alpha dpesn't seem to work correctly.
dig into SDL_CreateRGBSurface

### data model

the data model ends up a lot like a database, with values stored in records.

use entitas.json to describe this database and interface to it as raw memory, as though there were actual defined structs. Then the language of choice only needs to be able to call c. maybe can then be used in javascript or scala.

Vala structs are filled with pitfals. Documentation is wrong. Private doesn't work. super-struct fails. Only a simple struct with all public fields works. I think the best way to deal with that 
is to bury it far down where I don't have to touch it...

### Performance

avg usec per frame after 10,000 frames:

    fsharp          0.001651
    scala-native    0.001812
    ooc             0.002586
    nim             0.003331	
    vala	        0.003586
    scala-jvm       0.008185	

##### after increased load

    vala            0.004566
    node            0.004424
    gjs             0.005094

##### data-locality

    cpp             0.000040
    vala            0.000042
    vala+sdx        0.000098   

    4566/98 = 45x  

    after implementing Group/Matcher pattern
    4566/53 = 86x
    after adding back in sound effects & scores
    4566/100 = 45x

    features impact performance. feature creep will eventually kill performance.


vala is in the same performance spectrum as other high level languages. GObject isn't a major issue. prelmary testing showed cpp running more like fsharp when using object based data. 

vala, like cpp, alows me to easily specify by value semantics. 





