## <img title="A New Hope" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Rebel_Alliance_logo.svg" width="64">

Compile vala/genie to wasm using emscripten. 
Initially, this works with classic (stable) SDL. 

https://github.com/radare/posixvala

#### notes
no data structs (list, dict, array are from libGee), only GList, struct and [].
however, libGee is implemented in Vala. check dova-core for tips on integrating my own no-g version of libGee
missing some string handling - regex based
no virtual or override
no interface
no abstract




Rebel Alliance logo By User:Tkgd2007 [Public domain], via Wikimedia Commons