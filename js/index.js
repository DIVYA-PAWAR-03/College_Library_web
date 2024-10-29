console.log("This is index.js");

//Constructor making 
function Book(name, author, type ) {
    this.name = name;
    this.author = author;
    this.type = type;

}
//Disply Constructor
function Display() {
    
}

//Add methods to disply prototypes
Display.prototype.add = function(book) {
    console.log('Adding to UI');
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                  </tr>`;
    tableBody.innerHTML += uiString;
    
}

//implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length<3 ||book.author.length<3 ) {
        return false;
    }
    else{
        return true;
    }
}

Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    let text;
    if (type==='success') {
        text ='Success'
    } else {
        text = 'Error'
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${text}:</strong> ${displayMessage}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>` ;

setTimeout(() => {
    message.innerHTML = '';
}, 3000);
}



//Add submit event listner to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You Submitted Library Form');
    let name= document.getElementById('BookName').value ;
    let author= document.getElementById('AuthorName').value ;
    let type;

    let Fiction = document.getElementById('Fiction');
    let Programming = document.getElementById('Programming');
    let Poetry = document.getElementById('Poetry');
    

     if (Fiction.checked) {
        type = Fiction.value;
     } 
     
     else if(Programming.checked) {
        type = Programming.value;
     }

     else if(Poetry.checked) {
        type = Poetry.value;
     }

    let book = new Book(name, author , type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        
        display.add(book);
        display.clear();
        display.show('success', ' Your book has been Successfully added ');
    }
    else{
        //show error to the user
        display.show('danger', ' Sorry you cannot add this Book ');
    }

    e.preventDefault();
    
}