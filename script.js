// // Initialize the library array
// let library = [];

// Function to load books from local storage

const base_url= "https://library-app-backend-326k.onrender.com/api"

// Function to render the book list
async function deletedata(bookid)
{

    const deletedata=await fetch(`${base_url}/remove`,{
    
       
        method :"DELETE",
        body : JSON.stringify({id:bookid}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    }   
    )


    const deldata=await deletedata.json()
      return deldata

}
async function loadbooks()
{

    const datashow=await fetch(`${base_url}/details`)
  
    const data2=await datashow.json();
    return data2;
}
// 
async function showdata(){
    const abc =await loadbooks()
    const Data = Array.from(abc.product);
    console.log("Apple",Data)
    const bookListContainer = document.getElementById('book-list-container');
    bookListContainer.innerHTML = '';

    Data.map((item)=>{
         let selectedId = item._id;
        const li = document.createElement('li');
        li.innerHTML = `Title:${item.title} Author:${item.author}`
        const button =document.createElement("button");
        button.innerHTML = item.isBorrowed ? "Return"  : "Borrow";
        button.addEventListener("click",async () => {
            const newStatus = !item.isBorrowed; // Toggle the current status
            const response = await patchdata(selectedId, newStatus);
            if (response?.success) {
                alert(response?.message);
                showdata(); // Refresh the book list
            } else {
                alert('BOOK STATUS UPDATED');
            }showdata()    ;
            });
     
        li.appendChild(button);

        const delbutton=document.createElement("button")
        delbutton.innerHTML="delete"
        delbutton.addEventListener('click', async ()=>
        {   
       console.log("Appl",selectedId)
         const response= await deletedata(selectedId);
         console.log(response);

          if(response?.success==true) {
              alert(response?.message);
              showdata()
          }
         
        })
      
        li.appendChild(delbutton)
        bookListContainer.appendChild(li);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        li.appendChild(editButton)
        editButton.addEventListener('click', () => putdata(selectedId));
        // deletedata(id)
    })
}

// data;



// Function to add a new book
async function addata(title,author)
{

    const data1=await fetch(`${base_url}/add`,{
        method :"POST",
        body : JSON.stringify({title: title,author:author}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }

    })
  
    const data2=await data1.json();
    console.log(data2);
    showdata()
}

document.getElementById('add-book-btn').addEventListener('click', () => {

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('author-name').value;
    addata(title,author);
    if ( !title && !author) {
       
        alert('Please fill in all fields.');
    }
  
    document.getElementById('book-title').value="";
    document.getElementById('author-name').value="";

});





// Function to toggle book borrow status
async function patchdata(bookid,isBorrowed)
{

    const changedata=await fetch(`${base_url}/change`,{
    
       
        method :"PATCH",
        body : JSON.stringify({id:bookid,isBorrowed:isBorrowed}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    }   
    )


    const data=await changedata.json()
      console.log(data);
      showdata();
      
     

}
async function putdata(id) {
    const newTitle = prompt('Enter new title:');
    const newAuthor = prompt('Enter new author:');

    if (!newTitle || !newAuthor) {
        alert('Both title and author are required!');
        return;
    }

    try {
        const response = await fetch(`${base_url}/changes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, title: newTitle, author: newAuthor })
        });

        if (!response.ok) throw new Error('Failed to update book');
        const result = await response.json();
        alert(result.message);
        showdata(); // Refresh the book list
    } catch (error) {
        console.error('Error editing book:', error);
        alert('Error editing book.');
    }
}



 console.log("Here")
 showdata();
