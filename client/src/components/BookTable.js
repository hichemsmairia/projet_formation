import axios from 'axios'
import React from 'react'



const deleteBook = (_id) => {
    axios.delete(`http://localhost:5000/api/livres/supprimer_un_livre/${_id}`)
    window.location.reload()
}



const BookTable = props => ( // le book table va recevoir un objet : c'est un tableau 
  <table class="table" >
    <thead>
      <tr>
        <th scope="col">auteur</th>
        <th scope="col">publisher</th>
        <th scope="col">prix</th>
        <th scope="col">quantité</th>
      </tr>
    </thead>
    <tbody>
      {props.books.length > 0 ? ( // c'est a dire le tableau possede des elements 
        props.books.map(book => (
          <tr key={book._id}>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>{book.price}</td>
            <td>{book.quantity}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(book)
                }}
                class="btn btn-success"
              >
                Editer
              </button>
              
                <button onClick={() => deleteBook(book._id)} type="button" class="btn btn-danger">

                supprimer
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>chargement en cours</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default BookTable
