[indent=4]

const URI : string = "/darkoverlordofdata/shmupwarz"


def main(args: array of string)

    var game = new demo.ShmupWarz(840, 720, @"resource://$URI")
    game.run()


