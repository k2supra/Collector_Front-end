class Observer {
    #observers;
    constructor(users = []) {
        this.#observers = users
    }
    addObserver(user)
    {
        this.#observers.push(user);
    }
    removeObserver(user)
    {
        this.#observers = this.#observers.filter(o => o !== user);
    }
    notify(exception = '')
    {
        const lis = document.querySelectorAll('ul.users li');        
        for (const li of lis) {
            if (li.getAttribute('username') === exception) {
                continue;
            }
            if (this.#observers.find(u => u === li.getAttribute('username'))) {
                li.classList.add('notified');
                setTimeout(()=>{li.classList.remove('notified')},1000)
            }
        }
    }
}

class Message {
    constructor(userAvatarPath, text = ``, isImage = false) {
        this.userAvatar = isImage ? `<div class='avatar' style='background-color="transparent"; content="${userAvatarPath}"' ></div>` : `<div class='avatar'></div>`;
        this.text = text;
    }
}
class MessageBuilder {
    setUserAvatar(userAvatar)
    {
        this.userAvatar = userAvatar;
        return this;
    }
    setText(text)
    {
        this.text = text;
        return this;
    }
    isImageAvatar(isImage)
    {
        this.isImage = isImage;
        return this;
    }
    buildMessage()
    {
        return new Message(this.userAvatar, this.text, this.isImage);
    }
}


const messageNotifier = new Observer(['Dan', 'Julia']);
const statusNotifier = new Observer();


document.getElementById('notifier-btn').addEventListener('click', ()=>
{
    messageNotifier.notify()
})

function changeStatus(e) {
    const userItem = e.closest('li');
    const isOnline = userItem.getAttribute('status') === "online";

    userItem.setAttribute('status', (isOnline) ? 'offline' : 'online');

    userItem.querySelector(".user .status").classList.toggle('online', !isOnline);
}

function sendMessage()
{
    const chat = document.querySelector(".chat");

    const input = document.querySelector("textarea");
    let data = 'Test'
    if (input.value) {
        data = input.value;
        input.value = ``;
    }
    const msg = new MessageBuilder()
    .setUserAvatar()
    .setText(data)
    .isImageAvatar(false)
    .buildMessage();    

    chat.insertAdjacentHTML("beforeend",
        `
            <div class="message">
                <div class="sender">
                    ${msg.userAvatar}
                </div>
                <div class="data">${msg.text}</div>
            </div>
        ` 
    )
    messageNotifier.notify()
}



const notifierStatusBtn = document.querySelectorAll("#notifier-status-btn");
const statusButtons = document.querySelectorAll('button.change-status-btn')

notifierStatusBtn.forEach(e => e.addEventListener("click", (event)=>
{
    if (e.getAttribute('active') === 'false') {
        e.setAttribute('active', 'true');
        statusNotifier.addObserver(event.target.closest('li').getAttribute('username')); 
    }
    else
    {
        e.setAttribute('active', 'false');
        statusNotifier.removeObserver(event.target.closest('li').getAttribute('username'));
    }
})
)

statusButtons.forEach(e => {
    e.addEventListener('click', (e)=>
    {
        statusNotifier.notify(e.target.closest('li').getAttribute('username'));
    })
});