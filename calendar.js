var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];


btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function submithandle() {
    var name = document.getElementById("name").value;
    var participants = document.getElementById("participants").value;
    var day = document.getElementById('day').value;
    var Time = document.getElementById('time').value;
    let meetings = JSON.parse(localStorage.getItem('meetingArray'))
    const myNewMeeting = { name, participants, day, Time }

    if (!name || !participants || !day || !Time) {

        if (Time === "") {
            document.getElementById('error-name').classList.remove('hide')
            document.getElementById('error-name').innerHTML = "Please choose time of the event"

        }

        if (day === "") {
            document.getElementById('error-name').classList.remove('hide')
            document.getElementById('error-name').innerHTML = "Please choose day of the event"

        }

        if (participants === "") {
            document.getElementById('error-name').classList.remove('hide')
            document.getElementById('error-name').innerHTML = "Please choose participant of the event"
        }
        if (name === "") {
            document.getElementById('error-name').classList.remove('hide')
            document.getElementById('error-name').innerHTML = "Please enter name of the event"

        }
        return
    }
    if (!meetings?.length) {
        const newMeeting = JSON.stringify([myNewMeeting])
        localStorage.setItem("meetingArray", newMeeting)
    } else {
        for (let s = 0; s < meetings.length; s++) {
            if (meetings[s].participants == myNewMeeting.participants &&
                meetings[s].day == myNewMeeting.day &&
                meetings[s].Time == myNewMeeting.Time) {
                document.getElementById('error-name').classList.remove('hide')
                document.getElementById('error-name').innerHTML = "Event already added"
                return
            }
        }
        meetings.push(myNewMeeting)
        localStorage.setItem("meetingArray", JSON.stringify(meetings))
    }
    again()
}



function again() {
    let table = document.getElementById('calenderTable')
    let allMeetings = JSON.parse(localStorage.getItem('meetingArray'))
    let mine = []
    const currentMember = document.getElementById('checkMembers')
    if (allMeetings && currentMember.value !== "All Members") {
        for (let a = 0; a < allMeetings.length; a++) {
            if (allMeetings[a].participants == currentMember.value) {
                mine.push(allMeetings[a])
            }
        }
    }
    if (currentMember.value !== "All Members") allMeetings = mine
    let TableBody = table.getElementsByTagName('tbody')[0]
    let tBodyTh = TableBody.getElementsByTagName('th')
    let TableHead = table.getElementsByTagName('thead')[0]
    let tBodytr = TableHead.getElementsByTagName('th')
    let row = []
    let column = []
    if (allMeetings) {
        for (let i = 0; i < allMeetings.length; i++) {
            for (let j = 0; j < tBodyTh.length; j++) {
                if (tBodyTh[j].innerHTML == allMeetings[i].Time) {
                    row.push(j)
                }
            }
            for (let l = 0; l < tBodytr.length; l++) {
                if (tBodytr[l].innerHTML == allMeetings[i].day) {
                    column.push(l)
                }
            }
        }
    }
    if (row && column) {
        let tBodyAllTd = TableBody.getElementsByTagName("td")
        for (let b = 0; b < tBodyAllTd.length; b++) {
            tBodyAllTd[b].innerHTML = ""
        }
        if (row.length === column.length) {
            for (let z = 0; z < row.length; z++) {
                const meet = allMeetings[z]
                TableBody.rows[row[z]].children[column[z]].innerHTML +=
                    `<div class="selected-cell" > ${allMeetings[z].name}  <span class="cross" onclick="removeMeeting('${meet.name}, ${meet.participants}, ${meet.Time}, ${meet.day} ')" id="${z}" > x </span></div>`
            }
        }

    }
}

function removeMeeting(a) {
    var savedMeeting = JSON.parse(localStorage.getItem('meetingArray'))
    const arr = a.split(',')
    let index = -1
    savedMeeting.find(boo => {
        ++index
        if (boo.name === arr[0].trim() && boo.participants === arr[1].trim() && boo.day === arr[3].trim() && boo.Time === arr[2].trim()) {
            savedMeeting.splice(index, 1)
            const saveNew = JSON.stringify(savedMeeting)
            localStorage.setItem("meetingArray", saveNew)
            return boo
        }
    })
    again()
}



again() 