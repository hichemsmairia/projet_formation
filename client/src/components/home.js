import axios from 'axios'
import React, { useState, Fragment, useEffect } from 'react'
  import AddBookForm from './AddBookForm'
  import EditBookForm from './EditBookForm'
  import BookTable from './BookTable'
  
  const Home = () => {
    // Data
    
  useEffect(()=>{  // le useEffect , se lance automatiquement lorsque du monté du component dans le dom 

        axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI4ZmVmN2YwNDhhYzQ4OWNjZDU1OTUiLCJlbWFpbCI6InByb2Zfd2ViQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFkvZUpKeEJRVEhRMjBHRUFjUnBwQy5wajZWVlR1c29PRWdEQnZIaE9FZ1JmelhKQ1djbk5HIiwiX192IjowLCJpYXQiOjE2MTMzMDQ2NDR9.7dJQGDxXCn4vnzyltGWS4d8aU2Xz-zhEjs4TkGoy8Y8"
      axios.get('http://localhost:5000/api/livres/voir_livres')
        .then(res => {
          setBooks(res.data)
          console.log("voila le contenu du res" + res.data[0])
          
        })
        .catch((error) => {
          if(error.response.status === 401) {
            this.props.history.push("/login");
          }
        });
    
  },[])
  
    const initialFormState = { author: '', price: '' , publisher:'' ,price:0,quantity:0 }
  
    // Setting state
    const [ books, setBooks ] = useState([]) // les livres sont nitialement un tableau vide 
    const [ currentBook, setCurrentBook ] = useState(initialFormState)
    const [ editing, setEditing ] = useState(false)
  
    // CRUD operations
    const addBook = book => {
     axios.post("localhost:5000/api/livres/creer_livre",book)
    }
  
    const deleteBook = id => {
      setEditing(false)
  
     
    }
  
    const updateBook = (id, updatedBook) => {
      setEditing(false)
  
     
    }
  
    const editRow = book => {
      setEditing(true)
  
      setCurrentBook({ id:book._id, author: book.author, publisher: book.publisher , price : book.price , quantity : book.quantity })
    }
  
    return (
      <div className="container">
        <h1>gestion des livres</h1>
        <div className="flex-row">
          <div className="flex-large">
            {editing ? (
              <Fragment>
                <h2>Editer un  livre</h2>
                <EditBookForm
                  editing={editing}
                  setEditing={setEditing}
                  currentBook={currentBook} // props.currentBook
                  updateBook={updateBook}
                />
              </Fragment>
            ) : (
              <Fragment>
                <h2>ajouter un livre</h2>
                <AddBookForm addBook={addBook} />
              </Fragment>
            )}
          </div>
          <div className="flex-large">
            <h2>voir books</h2>
            <BookTable books={books} editRow={editRow} deleteBook={deleteBook} />
          </div>
        </div>
      </div>
    )
  }
  
  export default Home