/* NOT WORKING YET */


// class Manager {
//     #list;
//     #currentIndex;
//     constructor() {
//         this.#list = [];
//         this.#currentIndex = -1
//     }
//     addSnapshot(link, value) 
//     {
//         let command = new Command(link, value);
//         if (command == this.#list[this.#currentIndex]) {
//             this.#currentIndex++;
//             this.#list[this.#currentIndex](new Command(link, value));
//         }
//         else
//         {
//             this.#list
//         }
//     }
//     redo() {
//         if (this.#currentIndex === this.#list.length - 1) return;
//         this.#currentIndex++;
//         this.#list[this.#currentIndex].execute();
//     }
//     undo() {
//         if (this.#list.length === 0) return;
//         this.#currentIndex--;
//         const command = this.#list[this.#currentIndex];
//         command.execute();
//     }
// }
// class Command {
//     #commandData;
//     constructor(link, value) {
//         this.#commandData = {link, value};
//     }
//     execute() {
//         this.#commandData.link = this.#commandData.value;
//     }
// }

// const undo = document.querySelector(`#manager button#undo`)
// const redo = document.querySelector(`#manager button#redo`)


// undo.addEventListener(`click`, () => {
//     manager.undo()
// })
// redo.addEventListener(`click`, () => {
//     manager.redo()
// })

// exports = {Manager}

class Manager {
    #list;
    #currentIndex;
    constructor() {
        this.#list = [];
        this.#currentIndex = -1
    }
    addSnapshot(data) 
    {
        this.#currentIndex++;
        this.#list[this.#currentIndex]=new Command(JSON.stringify(data.innerHTML));
    }
    redo() {
        if (this.#currentIndex === this.#list.length - 1) return;
        this.#currentIndex++;
        this.#list[this.#currentIndex].execute();
    }
    undo() {
        if (this.#list.length === 0 || this.#currentIndex === -1) return;
        this.#currentIndex--;
        const command = this.#list[this.#currentIndex];
        command.execute();
    }
}
function setEvents() {
    const undo = document.querySelector(`#manager button#undo`)
    const redo = document.querySelector(`#manager button#redo`)


    undo.addEventListener(`click`, () => {
        manager.undo()
    })
    redo.addEventListener(`click`, () => {
        manager.redo()
    })
}
class Command {
  #commandData;
  constructor(data) {
    this.#commandData = data;
  }

  execute() {
    console.log(this.#commandData);
    
    document.body.innerHTML = this.#commandData.replace(/\\n/g, '').replace(/\"/g, '').replace(/\\/g, '');
    console.log(this.#commandData);
    setEvents()
  }
}

let manager = new Manager();
setEvents()

exports = manager;

