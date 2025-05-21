const MyDate = require('./index');

describe("MyDate class test", ()=>
{
    describe("showDate() method tests", ()=>
    {
        test(`new MyDate(20, 1, 1990).showDate() => 20 jan 1990 year`, ()=>
        {
            expect(new MyDate(1990, 1, 20).showDate()).toBe("Sat Jan 20 1990")
        })
        test(`new MyDate(21, 1, 1990).showDate() => 21 січня 1990 року`, ()=>
        {
            expect(new MyDate(1990, 1, 21).showDate()).toBe("Sun Jan 21 1990")
        })
    })
    describe("isFuture() method tests", ()=>
    {
        test(`new MyDate(20, 5, 2056).isFuture() => true`, ()=>
        {
            expect(new MyDate(2056, 5, 20).isFuture()).toBe(true)
        })
        test(`new MyDate(20, 6, 1990).isFuture() => false`, ()=>
        {
            expect(new MyDate(1990, 6, 20).isFuture()).toBe(false)
        })
    })
    describe("isLeapYear() method tests", ()=>
    {
        test(`new MyDate(20, 6, 1990).isLeapYear() => false`, ()=>
        {
            expect(new MyDate(1990, 6, 20).isLeapYear()).toBe(false)
        })
        test(`new MyDate(20, 6, 2020).isLeapYear() => true`, ()=>
        {
            expect(new MyDate(2020, 6, 20).isLeapYear()).toBe(true)
        })
    })
    describe("nextDay() method tests", ()=>
    {
        test(`new MyDate(20, 6, 2020).nextDay() => 21/6/2020`, ()=>
        {
            expect(new MyDate(2020, 6, 20).nextDay()).toBe("21/6/2020")
        })
        test(`new MyDate(31, 1, 2020).nextDay() => 1/2/2020`, ()=>
        {
            expect(new MyDate(2020, 1, 31).nextDay()).toBe("1/2/2020")
        })
        test(`new MyDate(28, 2, 2020).nextDay() => 29/2/2020`, ()=>
        {
            expect(new MyDate(2020, 2, 28).nextDay()).toBe("29/2/2020")
        })
        test(`new MyDate(28, 6, 2019).nextDay() => 1/3/2020`, ()=>
        {
            expect(new MyDate(2019, 6, 28).nextDay()).toBe("29/6/2019")
        })
        test(`new MyDate(31, 12, 2020).nextDay() => 1/1/2021`, ()=>
        {
            expect(new MyDate(2020, 12, 31).nextDay()).toBe("1/1/2021")
        })
    })
})