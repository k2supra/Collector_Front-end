class MyDate {
    constructor(year, month, date) {
        this.date = new Date(year, month-1, date);
    }
    showDate()
    {
        return this.date.toDateString();
    }
    isFuture()
    {
        return this.date > new Date();
    }
    isLeapYear()
    {
        const leapDate = new Date(this.date.getFullYear(), 1, 29);
        return leapDate.getMonth() === 1 && leapDate.getDate() === 29;
    }
    nextDay()
    {
        const tomorrow = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()+1);
        return tomorrow.getDate()+`/`+ (+tomorrow.getMonth()+1) +`/`+tomorrow.getFullYear();
    }
}


module.exports = MyDate;

