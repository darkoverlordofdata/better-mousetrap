# better-mousetrap 

Building a better mousetrap

@see http://gameprogrammingpatterns.com/data-locality.html

This vala version runs about 80% as fast as c++ version, and about 50x faster than the current version of entitas-vala

c++  0.000057
vala 0.000069

About 80% as fast as c++, with less variance.

difference is likely overhead for data structures, stdlib vs GLib, plus Vala generated oop boilerplate.

