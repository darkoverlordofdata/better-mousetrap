#!/usr/bin/env bash

#
#   entitas.sh
#
#       installs entitas-cli in the current project and 
#       generate the entitas code for this project
#

#
#   Set up project package with 'npm run entitas'' command
#
if [ ! -f ./package.json ]; then
    npm init -y
    sed -i "s/\"test\": \"echo \\\\\"Error: no test specified\\\\\" \&\& exit 1\"/\"entitas\": \"entitas\"/" package.json
fi
#
#   install local entitas-cli
#
if [ "" == "`npm list entitas-cli | grep 'entitas-cli'`" ]; then
    npm install entitas-cli --save-dev
fi
#
#   initialize entitas
#
if [ ! -f ./entitas.json ]; then
    npm run entitas -- init shmupwarz -t bin
fi


#
# create the component schema
#
npm run entitas -- create -c Bounds x:int y:int w:int h:int
npm run entitas -- create -c Bullet
npm run entitas -- create -c Enemy1
npm run entitas -- create -c Enemy2
npm run entitas -- create -c Enemy3
npm run entitas -- create -c Expires value:double
npm run entitas -- create -c Health current:double maximum:double
npm run entitas -- create -c Layer value:int
npm run entitas -- create -c Position x:double y:double
npm run entitas -- create -c Scale x:double y:double
npm run entitas -- create -c Sound sound:sdx.audio.Sound
npm run entitas -- create -c Sprite sprite:sdx.graphics.s2d.Sprite
npm run entitas -- create -c Text text:string sprite:sdx.graphics.s2d.Sprite
npm run entitas -- create -c Tint r:int g:int b:int a:int
npm run entitas -- create -c Tween min:double max:double speed:double repeat:bool active:bool
npm run entitas -- create -c Velocity x:double y:double

#
# create the systems schema
#
npm run entitas -- create -s CollisionSystem
npm run entitas -- create -s ExpireSystem 
npm run entitas -- create -s HealthSystem 
npm run entitas -- create -s HudSystem 
npm run entitas -- create -s InputSystem 
npm run entitas -- create -s PhysicsSystem 
npm run entitas -- create -s RemoveSystem 
npm run entitas -- create -s SoundSystem 
npm run entitas -- create -s SpawnSystem 
npm run entitas -- create -s SpriteManagerSystem 
npm run entitas -- create -s TweenSystem 

#
# generate code
#
npm run entitas -- generate -p gs -t src/liquid

