## <img title="A New Hope" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Rebel_Alliance_logo.svg" width="64">

Better mousetrap revisited for Window 10 with msys2

Yuk -
there is no SDL2 package for msys2, so I have to manually copy from the sdl*.tar.gz's to 

    C:\msys64\mingw64\bin
    C:\msys64\mingw64\include
    C:\msys64\mingw64\lib
    C:\msys64\mingw64\lib\pkgconfig

Reasons to continue using vala rather than c++ even on windows:

* vala compiles faster
* c++ images don't display correctly in gdb
* clang works from vala. I cannot get it to work standalone in windows.
* plus all the usual reasons

glib-compile-resources --sourcedir ./data --target src.gs/resources.c --generate ./data/resources.gresource.xml

Rebel Alliance logo By User:Tkgd2007 [Public domain], via Wikimedia Commons