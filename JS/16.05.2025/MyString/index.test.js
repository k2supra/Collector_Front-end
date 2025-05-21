const MyString = require('./index');


describe("MyString class test", ()=>
{
    describe("remove methods new MyString('qwerty')", ()=>
    {
        test(".remove(0) => werty", ()=>
        {
            expect(new MyString("qwerty").remove(0)).toBe("werty");
        })
        test(".remove(2) => qwrty", ()=>
        {
            expect(new MyString("qwerty").remove(2)).toBe("qwrty");
        })
        test(".remove(10) => qwerty", ()=>
        {
            expect(new MyString("qwerty").remove(10)).toBe("qwerty");
        })
        test(".remove(-4) => qwerty", ()=>
        {
            expect(new MyString("qwerty").remove(-4)).toBe("qwerty");
        })
    })
    describe("insert methods new MyString('qwerty')", ()=>
    {
        test(".insert(0, X) => Xwerty", ()=>
        {
            expect(new MyString("qwerty").insert(0, "X")).toBe("Xwerty");
        })
        test(".insert(2, X) => qwXrty", ()=>
        {
            expect(new MyString("qwerty").insert(2, "X")).toBe("qwXrty");
        })
        test(".insert(10, X) => qwertyX", ()=>
        {
            expect(new MyString("qwerty").insert(10, "X")).toBe("qwertyX");
        })
        test(".insert(-4, X) => Xqwerty", ()=>
        {
            expect(new MyString("qwerty").insert(-4, "X")).toBe("Xqwerty");
        })
    })
    describe("trimSign methods", ()=>
    {
        test(".trimSign() => qwerty", ()=>
        {
            expect(new MyString("qwerty").trimSign()).toBe("qwerty");
        })
        test("MyString('qweeeerty').trimSign() => qwerty", ()=>
        {
            expect(new MyString('qweeeerty').trimSign()).toBe("qwerty");
        })
        test("MyString('qweeertttty').trimSign() => qwerty", ()=>
        {
            expect(new MyString('qweeertttty').trimSign()).toBe("qwerty");
        })
        test("MyString('qwe....rty').trimSign() => qwe.rty", ()=>
        {
            expect(new MyString("qwe....rty").trimSign()).toBe("qwe.rty");
        })
    })
    describe("toggle methods", ()=>
    {
        test(".toggle() => QWERTY", ()=>
        {
            expect(new MyString("qwerty").toggle()).toBe("QWERTY");
        })
        test("MyString('QWERTY').toggle() => qwerty", ()=>
        {
            expect(new MyString('QWERTY').toggle()).toBe("qwerty");
        })
        test("MyString('qweRTY').toggle() => QWErty", ()=>
        {
            expect(new MyString('qweRTY').toggle()).toBe("QWErty");
        })
    })
    describe("counter methods", ()=>
    {
        test(`MyString("qwerty").counter('e') => 1`, ()=>
        {
            expect(new MyString("qwerty").counter('e')).toBe(1);
        })
        test(`MyString("apple").counter('p') => 2`, ()=>
        {
            expect(new MyString("apple").counter('p')).toBe(2);
        })
        test(`MyString("avokado").counter('a') => 2`, ()=>
        {
            expect(new MyString("avokado").counter('a')).toBe(2);
        })
    })
})
