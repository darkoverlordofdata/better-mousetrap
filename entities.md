
##

in each system setWorld:
    group = world.getGroup(Matcher.AllOf({...}))

when a component is added to entity, the entity is added to the group.

group represents a list of Entity*



## as is

        id      : int
        name    : string
        active  : bool
        kind    : Kind
        pos     : Point2d
        bounds  : SDL.Video.Rect
        scale   : Vector2d
        sprite  : sdx.graphics.s2d.Sprite


    entity
    =======================================================================================
    | id | name | active? | kind | p.x | p.y | r.x | r.y | r.w | r.h | s.x | s.y | object |
    =======================================================================================
      i    str*    bool      i      f      f    i     i     ui    ui    f     f    GObject




     is 'kind' necssary? Usually, this is done by a match algorythm and infering from which components are in play. This allows entities to change dynamically.

     'name' is renumdant with kind, and is a debug tool. put in a seprtate array indexed by id
     

## to be

    entity
    =========================================================================
    | id | active? | p.x | p.y | r.x | r.y | r.w | r.h | s.x | s.y | object |
    =========================================================================
      i    bool      f      f    i     i     ui    ui    f     f    GObject

     put 'optional' components in seperate pool:

        sound   : sdx.audio.Sound?
        tint    : Color?
        expires : Duration?
        health  : Health?
        tween   : Tween?
        velocity: Vector2d?


## how

I can recast a pointer to a struct by cleansing it of type info with void*

it should create the ptr var on the stack, this might not cause l1 thrashing

```scala
def getE2(e:E2*):E2*
    return e
def test(e:E1*) 
    print("E1 id = %d", e->id)
    e1:E2* = getE2((void*)e)
    print("E2 id = %d", e1->id)
    print("%f,%f", e1->data[0], e1->data[1])
```


