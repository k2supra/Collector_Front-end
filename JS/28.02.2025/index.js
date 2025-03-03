const BaseSong = {
    name: "", 
    duration: 0, 
    getInfo() 
    {
        return `Name: ${this.name}, duration: ${this.duration}`
    }
}

const playlist = [];

function createSong(name, duration) {
    const newSong = Object.create(BaseSong);
    newSong.name = name;
    newSong.duration = duration;
    return newSong;
}
function updatePlaylist(element) {
    const list = document.querySelector("ul");

    clearUl();

    for (const item of element) {
        const li = document.createElement("li");

        li.textContent = item.getInfo();

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", event => 
        {
            deleteSong(event.target.closest("li"))
        })

        li.appendChild(deleteButton);
    
        list.appendChild(li);
    }
}

function findSong(target) {   
    for (const item of playlist) {
        if (target.textContent.includes(item.name) && target.textContent.includes(item.duration)) {
            playlist.splice(playlist.indexOf(item), 1);
            break;
        }
    }
}

function addSong() {
    const songName = document.querySelector("input.songName").value;
    const songDuration = document.querySelector("input.songDuration").value;
    if (songName.length == 0 || songDuration.length <= 0) {
        return alert("Enter all data");
    }

    const newSong = createSong(songName, +songDuration);

    playlist.push(newSong);
    
    updatePlaylist(playlist)
}

function deleteSong(target) {
    findSong(target);
    updatePlaylist(playlist);
}

function sortByName() {
    playlist.sort((obj1, obj2) => 
    {
        return obj1.name.localeCompare(obj2.name);
    })
    updatePlaylist(playlist);
}

function sortByDuration() {
    playlist.sort((obj1, obj2) => 
    {
        return obj2.duration - obj1.duration;
    }).reverse()
    updatePlaylist(playlist);
}

function calculateTotalDuration() {
    const counter = playlist.reduce((total, obj) => 
        {
            return total + obj.duration;
        }, 0)
    
    document.getElementById("totalTime").textContent = `Total duration: ${counter}`
}

function getPrompt() {
    return document.getElementById("filter").value.toLowerCase();
}

function checkSong(song) {
    return song.name.toLowerCase().includes(getPrompt());
}

function filterSongs() {
    return playlist.filter(checkSong);
}

function clearUl() {
    document.querySelector("ul").textContent = null;
}
function resetUl() {
    playlist.length = 0;
    clearUl();
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
});
document.getElementById("filter").addEventListener("input", () =>
{
    updatePlaylist(filterSongs())
})