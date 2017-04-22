[indent=4]
uses entitas
uses sdx

namespace demo

    class SpawnSystem : Object implements ISystem

        world:World
        game:ShmupWarz
        factory:Factory
        enemyT1     : double = 1.0
        enemyT2     : double = 4.0
        enemyT3     : double = 6.0

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory

        def spawnEnemy(delta:double , t:double , enemy:int):double 
            var d1 = t-delta
            if (d1 < 0.0) 
                case enemy
                    when 1
                        factory.newEnemy1(factory.rand.int_range(35, game.width-35), 35)
                        return 1.0
                    when 2
                        factory.newEnemy2(factory.rand.int_range(85, game.width-85), 85)
                        return 4.0
                    when 3
                        factory.newEnemy3(factory.rand.int_range(160, game.width-160), 160)
                        return 6.0
                    default
                        return 0.0
                
            else 
                return d1    

        def setWorld(world:World)
            this.world = world

        def initialize()
            pass

        def execute(delta:double)
            enemyT1 = spawnEnemy(delta, enemyT1, 1)
            enemyT2 = spawnEnemy(delta, enemyT2, 2)
            enemyT3 = spawnEnemy(delta, enemyT3, 3)

