/**
 * entitas.gs
 */
[indent=4]
uses Gee

namespace entitas

    /**
     * Entitas Reborn
     *
     * Entities designed around data locality
     * 
     */
    exception Exception
        EntityIsNotEnabled
        EntityAlreadyHasComponent
        EntityDoesNotHaveComponent
        InvalidMatcherExpression
        EntityIsAlreadyReleased
        SingleEntity
        WorldDoesNotContainEntity

    delegate Factory():Entity*

    struct Buffer
        pool: int           // pool index
        size: int           // pool size
        factory: Factory    // factory callback

    interface ISystem: Object
        def abstract setWorld(world:World)
        def abstract execute()

    interface EntityRemovedListener : Object
        def abstract entityRemoved(e:Entity*)

    interface EntityAddedListener : Object
        def abstract entityAdded(e:Entity*)

    interface IMatcher : Object 
        prop abstract readonly id: string 
        prop abstract readonly indices: array of int
        def abstract matches(entity:Entity*):bool 
        def abstract toString():string
    
    interface IAnyOfMatcher : Object 
        def abstract noneOf(args: array of int):Object 

    interface IAllOfMatcher : Object 
        def abstract anyOf(args: array of int):IAnyOfMatcher
        def abstract noneOf(args: array of int):Object 

        
    /**
     * A Group is a set of entities defined by a Matcher
     */
    class Group : Object
        matcher:IMatcher
        entities:list of Entity* = new list of Entity*
        
        construct(matcher:IMatcher)
            this.matcher = matcher

        /** Add entity to group */
        def handleEntitySilently(entity : Entity*)
            if matcher.matches(entity) do entities.add(entity)
            else do entities.remove(entity)

        /** Add entity to group and raise events */
        def handleEntity(entity : Entity*, index : Components)
            if matcher.matches(entity)
                entities.add(entity) //World.onComponentAdded(entity, index)
            else
                entities.remove(entity) //World.onComponentRemoved(entity, index)

    /**
     * Match entities by component
     */
    class Matcher : Object implements IMatcher, IAllOfMatcher, IAnyOfMatcher

        /**
         * A unique sequential index number assigned to each ,atch
         * @type number */
        uniqueId : static int

        /**
         * Get the matcher id
         * @type number
         * @name entitas.Matcher#id */
        prop readonly id : string

        /**
         * A list of the component ordinals that this matches
         * @type Array<number>
         * @name entitas.Matcher#indices */
        prop readonly indices : array of int
            get
                if _indices == null
                    _indices = mergeIndices()
                return _indices

        /**
         * A unique sequential index number assigned to each entity at creation
         * @type number
         * @name entitas.Matcher#allOfIndices */
        prop readonly allOfIndices : array of int

        _allOfMask: uint64

        /**
         * A unique sequential index number assigned to each entity at creation
         * @type number
         * @name entitas.Matcher#anyOfIndices */
        prop readonly anyOfIndices : array of int

        _anyOfMask: uint64
        /**
         * A unique sequential index number assigned to each entity at creation
         * @type number
         * @name entitas.Matcher#noneOfIndices */
        prop readonly noneOfIndices : array of int

        _indices        : array of int
        _toStringCache  : string

        construct()
            _id = (Matcher.uniqueId++).to_string()

        /**
         * Matches anyOf the components/indices specified
         * @params Array<entitas.IMatcher>|Array<number> args
         * @returns entitas.Matcher
         */
        def anyOf(args : array of int) : IAnyOfMatcher
            _anyOfIndices = Matcher.distinctIndices(args)
            _indices = null
            return this

        /**
         * Matches noneOf the components/indices specified
         * @params Array<entitas.IMatcher>|Array<number> args
         * @returns entitas.Matcher
         */
        def noneOf(args : array of int):Object 
            _noneOfIndices = Matcher.distinctIndices(args)
            _indices = null
            return this

        /**
         * Check if the entity matches this matcher
         * @param entitas.IEntity entity
         * @returns boolean
         *
         *  TODO:
         *      matcher should cache a bitmask to compare to entity->mask
         *
         */
        def matches(entity : Entity*) : bool

            // var mask = entity.mask & 0x0fffffffffffffff
            // var matchesAllOf = _allOfIndices == null ? true : mask == _allOfMask
            // var matchesAnyOf = _anyOfIndices == null ? true : (mask & _anyOfMask) != 0


            var matchesAllOf = _allOfIndices == null ? true : entity.hasComponents(_allOfIndices)
            var matchesAnyOf = _anyOfIndices == null ? true : entity.hasAnyComponent(_anyOfIndices)
            var matchesNoneOf = _noneOfIndices == null ? true : !entity.hasAnyComponent(_noneOfIndices)
            return matchesAllOf && matchesAnyOf && matchesNoneOf

        /**
         * Merge list of component indices
         * @returns Array<number>
         */
        def mergeIndices() : array of int

            var indicesList = new list of int
            if _allOfIndices != null
                for var i in _allOfIndices
                    indicesList.add(i)

            if _anyOfIndices != null
                for var i in _anyOfIndices
                    indicesList.add(i)

            if _noneOfIndices != null
                for var i in _noneOfIndices
                    indicesList.add(i)

            return Matcher.distinctIndices(listToArray(indicesList))

        /**
         * toString representation of this matcher
         * @returns string
         */
        def toString() : string
            if _toStringCache == null
                var sb = new array of string[0]
                if _allOfIndices != null
                    sb += "AllOf("
                    sb += componentsToString(_allOfIndices)
                    sb += ")"

                if _anyOfIndices != null
                    if _allOfIndices != null
                        sb += "."

                    sb += "AnyOf("
                    sb += componentsToString(_anyOfIndices)
                    sb += ")"

                if _noneOfIndices != null
                    sb += ".NoneOf("
                    sb += componentsToString(_noneOfIndices)
                    sb += ")"

                _toStringCache = string.joinv("", sb)

            return _toStringCache

        def static componentsToString(indexArray : array of int) : string
            var sb = new array of string[0]
            for var index in indexArray
                sb += ComponentString[index].replace("Component", "")
            return string.joinv(",", sb)
            return ""

        def static listToArray(l : list of int) : array of int
            var a = new array of int[l.size]
            for var i=0 to (l.size-1)
                a[i] = l[i]
            return a

        /**
         * Get the set if distinct (non-duplicate) indices from a list
         * @param Array<number> indices
         * @returns Array<number>
         */
        def static distinctIndices(indices : array of int) : array of int
            var indicesSet = new dict of int, bool
            var result = new list of int

            for var index in indices
                if !indicesSet.has_key(index)
                    result.add(index)
                indicesSet[index] = true

            return listToArray(result)

        /**
         * Merge all the indices of a set of Matchers
         * @param Array<IMatcher> matchers
         * @returns Array<number>
         */
        def static merge(matchers : array of IMatcher) : array of int raises Exception
            var indices = new list of int

            for var matcher in matchers
                if matcher.indices.length != 1
                    raise new Exception.InvalidMatcherExpression(matcher.toString())

                indices.add(matcher.indices[0])
            return listToArray(indices)

        /**
         * Matches allOf the components/indices specified
         * @params Array<entitas.IMatcher>|Array<number> args
         * @returns entitas.Matcher
         */
        def static AllOf(args : array of int) : IMatcher
            var matcher = new Matcher()
            matcher._allOfIndices = Matcher.distinctIndices(args)
            matcher._allOfMask = Matcher.buildMask(args)
            return matcher

        /**
         * Matches anyOf the components/indices specified
         * @params Array<entitas.IMatcher>|Array<number> args
         * @returns entitas.Matcher
         */
        def static AnyOf(args : array of int) : IMatcher
            var matcher = new Matcher()
            matcher._anyOfIndices = Matcher.distinctIndices(args)
            matcher._anyOfMask = Matcher.buildMask(args)
            return matcher

        def static buildMask(indices: array of int): uint64
            accume:uint64 = 0
            for var index in indices do accume |= POW2[index]
            return accume

    /**
     * ECS World
     */
    class World : Object
        instance    : static World
        pool        : array of Entity
        cache       : array of list of Entity* 
        systems     : list of ISystem = new list of ISystem
        listener    : EntityRemovedListener
        id          : private int = 0
        groups      : dict of string, Group = new dict of string, Group

        construct()
            World.instance = this

        def static onComponentAdded(e:Entity*, c:Components)
            World.instance.componentAddedOrRemoved(e, c)

        def static onComponentRemoved(e:Entity*, c:Components)
            World.instance.componentAddedOrRemoved(e, c)

        def componentAddedOrRemoved(entity:Entity*, component:Components)
            for var group in groups.keys
                groups[group].handleEntity(entity, component)

        def setPool(size:int, count:int, buffers: array of Buffer)
            pool = new array of Entity[size]
            cache = new array of list of Entity*[count]
            for var i=0 to (count-1) do cache[i] = new list of Entity*
            for var i=0 to (buffers.length)
                for var k=1 to (buffers[i].size)  
                    cache[buffers[i].pool].add(buffers[i].factory())
        

        def setEntityRemovedListener(listener:EntityRemovedListener)
            this.listener = listener

        def createEntity(name:string, pool:int, active:bool = false):Entity*
            var id = this.id++
            return this.pool[id].setId(id).setName(name).setPool(pool).setActive(active)

        def deleteEntity(entity:Entity*)
            entity.setActive(false)
            listener.entityRemoved(entity)
            cache[entity.pool].add(entity)

        def add(system: ISystem):World
            system.setWorld(this)
            systems.add(system)
            return this

        def execute()
            for var sys in systems do sys.execute()            

        def getGroup(matcher : IMatcher) : Group
            group:Group

            if groups.has_key(matcher.toString())
                group = groups[matcher.toString()]
            else
                group = new Group(matcher)
                for var i = 0 to (this.id-1) do group.handleEntitySilently(&pool[i])
                groups[matcher.toString()] = group

            return group

    /**
     * Bit array mask
     */
    const POW2:array of uint64 = {
        0x0000000000000000,
        0x0000000000000001,
        0x0000000000000002,
        0x0000000000000004,
        0x0000000000000008,
        0x0000000000000010,
        0x0000000000000020,
        0x0000000000000040,
        0x0000000000000080,
        0x0000000000000100,
        0x0000000000000200,
        0x0000000000000400,
        0x0000000000000800,
        0x0000000000001000,
        0x0000000000002000,
        0x0000000000004000,
        0x0000000000008000,
        0x0000000000010000,
        0x0000000000020000,
        0x0000000000040000,
        0x0000000000080000,
        0x0000000000100000,
        0x0000000000200000,
        0x0000000000400000,
        0x0000000000800000,
        0x0000000001000000,
        0x0000000002000000,
        0x0000000004000000,
        0x0000000008000000,
        0x0000000010000000,
        0x0000000020000000,
        0x0000000040000000,
        0x0000000080000000,
        0x0000000100000000,
        0x0000000200000000,
        0x0000000400000000,
        0x0000000800000000,
        0x0000001000000000,
        0x0000002000000000,
        0x0000004000000000,
        0x0000008000000000,
        0x0000010000000000,
        0x0000020000000000,
        0x0000040000000000,
        0x0000080000000000,
        0x0000100000000000,
        0x0000200000000000,
        0x0000400000000000,
        0x0000800000000000,
        0x0001000000000000,
        0x0002000000000000,
        0x0004000000000000,
        0x0008000000000000,
        0x0010000000000000,
        0x0020000000000000,
        0x0040000000000000,
        0x0080000000000000,
        0x0100000000000000,
        0x0200000000000000,
        0x0400000000000000,
        0x0800000000000000,
        0x1000000000000000,
        0x2000000000000000,
        0x4000000000000000,
        0x8000000000000000

    }

