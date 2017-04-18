public struct E0 {
    public double x;
    public double y;
}

public struct E1 {
    public int id;
    public E0 pos;
}


public struct E2 {
    public int id;
    public double data[20];
}


public static int main(string[] args) {
    stdout.printf("Hello\n");
    var e1 = E1(){id=1, pos = E0(){x = 1, y = 2} };
    test(&e1);
    return 0;
}



void test(E1* e) {
    stdout.printf("E1 id = %d\n", e->id);
    var x = (void*)e;
    test2(x);
}

void test2(E2* e) {
    stdout.printf("E2 id = %d\n", e->id);
    stdout.printf("%f,%f", e->data[0], e->data[1]);

}
