class MyString {
    constructor(str = "") {
        this.str = str;
    }
    remove(index)
    {
        if(index < 0 || index > this.str.length) return this.str;
        this.str = this.str.slice(0, index) + this.str.slice(index + 1);
        return this.str;
    }
    insert(index, sign)
    {
        if(index < 0)
        {
            this.str = sign + this.str;
            return this.str;
        }
        else if(index > this.str.length)
        {
            this.str = this.str + sign;
            return this.str;
        }
        this.str = this.str.slice(0, index) + sign + this.str.slice(index+1);
        return this.str;
    }
    trimSign()
    {
        let temp = "";

        for (let i = 0; i < this.str.length; i++) {
            if (i > 0 && this.str[i] === this.str[i-1]) {
                continue;
            }
            temp += this.str[i];
        }
        this.str = temp;
        return this.str;
    }
    toggle()
    {
        let temp = "";
        for (let i = 0; i < this.str.length; i++) {
            const char = this.str[i];
            temp += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
        }
        this.str = temp;
        return this.str;
    }
    counter(sign)
    {
        return [...this.str].reduce((acc, item) =>
        {
            if (item === sign) {
                acc++;
            }
            return acc;
        }, 0)
    }
}

module.exports = MyString;
