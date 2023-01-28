const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")
addBtn.addEventListener(
  "click",
  function() {
    addNote()
  }
)
const saveNotes = () => {
  // here we are taking all the textarea from the notes
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes);
  // initially the data will be empty because no textarea is created yet
  const data = [];
  notes.forEach(
    (note) => {
      // pushing the value of note in data 
      data.push(note.value)
    }
  )
  if (data.length === 0) {
    localStorage.removeItem("notes")
  }
  else {
    localStorage.setItem("notes", JSON.stringify(data))

  }
  // here we are saving the data on localstorage

}


// we are adding notes here by creating an div inside the addNote function and using innerHTML we can add that html code for creating div

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note")
  note.innerHTML = `
  <div class="tool">

        <i class=" save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>


      </div>
      <textarea>${text}</textarea>`;
  //logic to delete an note on clicking the trash.
  note.querySelector(".trash").addEventListener(
    "click",
    function() {
      note.remove()
      saveNotes();
    }
  )
  note.querySelector(".save").addEventListener(
    "click",
    function() {
      saveNotes()
    }
  )
  main.appendChild(note);
  saveNotes();

}

(
  function() {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if (lsNotes === null) {
      addNote()
    } else {
      lsNotes.forEach(
        (lsNote) => {
          addNote(lsNote)
        }
      )
    }
  }
)()
