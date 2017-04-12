[indent=4]
uses SDL
uses SDL.Video

namespace demo

    class Game : Object

        title       : string
        width       : int = 0 
        height      : int = 0
        fps         : int = 0
        mouseX      : int = 0
        mouseY      : int = 0
        mouseDown   : bool = false
        delta       : double = 0.0
        window      : unowned Window
        renderer    : unowned Renderer
        evt         : private SDL.Event
        keys        : array of uint8 = new array of uint8[255]

        prop readonly isRunning:bool

        construct(window:Window, renderer:Renderer)
            this.window = window
            this.renderer = renderer

        def start()
            _isRunning = true

        def stop()
            _isRunning = false

        def virtual draw(fps:int, avg:double)
            pass

        def virtual update(delta:double)
            pass
            
            
        /**
        * getKey
        *
        * @param key to get
        * @returns bool true if key is pressed
        */
        def getKey(key:int):bool
            if key<256 do return keys[key] == 1
            return false

        /**
        * handleEvents
        */
        def handleEvents()
            while SDL.Event.poll(out evt) != 0
                case evt.type
                
                    when  SDL.EventType.KEYDOWN
                        if evt.key.keysym.sym <= 255
                            keys[evt.key.keysym.sym] = 1

                    when  SDL.EventType.KEYUP
                        if evt.key.keysym.sym <= 255
                            keys[evt.key.keysym.sym] = 0

                    when  SDL.EventType.MOUSEMOTION
                        mouseX = evt.motion.x
                        mouseY = evt.motion.y

                    when  SDL.EventType.MOUSEBUTTONDOWN
                        mouseDown = true

                    when  SDL.EventType.MOUSEBUTTONUP
                        mouseDown = false

                    when SDL.EventType.QUIT
                        stop()

