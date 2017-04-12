[indent=4]
uses SDL
uses SDL.Video

exception Exception 
    SDLException

def inline logSDLError(reason: string)
    raise new Exception.SDLException(reason + ", SDL error: " + SDL.get_error())
    GLib.Process.exit(0)

const MS_PER_UPDATE: double = 1.0/60.0

def main(args: array of string)
    var title = "Shmupwarz"
    var width = 720
    var height = 600

    if SDL.init(SDL.InitFlag.VIDEO | SDL.InitFlag.TIMER | SDL.InitFlag.EVENTS) < 0 
        logSDLError("Init SDL")
        return 

    var window = new Window(title, Window.POS_CENTERED, Window.POS_CENTERED, width, height, WindowFlags.SHOWN)
    var renderer = Renderer.create(window, -1, RendererFlags.ACCELERATED | RendererFlags.PRESENTVSYNC)

    SDLTTF.init()
    if SDLImage.init(SDLImage.InitFlags.PNG) < 0 
        logSDLError("Init image")
        return 
    
    if SDLMixer.open(22050, SDL.Audio.AudioFormat.S16LSB, 2, 4096) == -1 
        logSDLError("Init mixer")
        return 

    
    var delta = 0.0
    var lag = 0.0

    var d = 0.0
    var fps = 60
    var k = 0
    var t = 0.0
    var avg = 0.0
    var k2 = 0
    var game = new Game(title, width, height, window, renderer)
    var mark1 = (double)GLib.get_real_time()/1000000.0
    game.start()
    while game.isRunning
        var mark2 = (double)GLib.get_real_time()/1000000.0
        delta = mark2 - mark1
        mark1 = mark2
        lag += delta
        k += 1
        d += delta
        if d >= 1.0
            fps = k
            k = 0
            d = 0

        
        game.handleEvents()
        while lag >= MS_PER_UPDATE

            if game.getKey(SDL.Input.Keycode.ESCAPE) do game.stop()
            var m1 = (double)GLib.get_real_time()/1000000.0
            game.update(delta)
            var m2 = (double)GLib.get_real_time()/1000000.0
            k2 = k2 +1
            t += m2 - m1

            if k2 >= 1000
                avg = t/1000
                print("%f\n", avg)
                k2 = 0
                t = 0.0

            lag -= MS_PER_UPDATE
        
        game.draw(fps, avg)


