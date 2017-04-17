[indent=4]

struct E0 
    x: double
    y: double


struct E1 
    id: int
    pos: E0



struct E2 
    id: int
    data: double[20]



const URI : string = "/darkoverlordofdata/shmupwarz"



// def test(e:E1*) 
//     print("E1 id = %d", e->id);
//     // var x = (void*)e
//     e1:E2* = getE2((void*)e)
//     print("E2 id = %d", e1->id)
//     print("%f,%f", e1->data[0], e1->data[1])



// def getE2(e:E2*):E2*
//     return e

struct En
    has: bool[2]
    b1: bool
    b2: bool
    b3: bool
    b4: bool
    b5: bool
    b6: bool
    b7: bool
    b8: bool
    fence:int

def main(args: array of string)
    // var e1 = E1(){id=1, pos = E0(){x = 1, y = 2} }
    // test(&e1)

    // var e = En()
    // e.has[4] = true
    // print("b1 %s", e.b1.to_string())
    // print("b2 %s", e.b2.to_string())
    // print("b3 %s", e.b3.to_string())
    // print("b4 %s", e.b4.to_string())
    // print("b5 %s", e.b5.to_string())
    // print("b6 %s", e.b6.to_string())
    // print("b7 %s", e.b7.to_string())
    // print("b8 %s", e.b8.to_string())
 
    var game = new demo.ShmupWarz(840, 720, @"resource://$URI")
    game.run()


