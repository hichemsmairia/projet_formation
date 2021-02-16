import axios from 'axios'
import React, { useState, useEffect } from 'react'

const EditBookForm = props => {
  const [ book, setBook ] = useState(props.currentBook) // le current book est arriv" deouis le home 

  useEffect(
    () => {
      setBook(props.currentBook)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    setBook({ ...book, [name]: value })
  }

const updateBook = (e,id) => {
        e.preventDefault()

        axios.put(`http://localhost:5000/api/livres/maj_un_livre/${id}`,book) // cest a dire en backend , je dois voir /:id
        console.log(id)
        window.location.reload()
      }
  return (

    
    <form>
    
      <label>auteur</label>
     
			<input class="form-control" type="text" name="author" value={book.author} onChange={handleInputChange} />
			<label>publisher</label>
			<input class="form-control" type="text" name="publisher" value={book.publisher} onChange={handleInputChange} />
			<label>prix</label>
			<input class="form-control" type="number" name="price" value={book.price} onChange={handleInputChange} />
			<label>quantité</label>
			<input class="form-control" type="number" name="quantity" value={book.quantity} onChange={handleInputChange} />
      
      <button  class="btn btn-primary" onClick={(e) => updateBook(e,book.id)} >  {/*il correspont au _id au base de donne*/}
        mettre a jour le livre
      </button>
    </form>
  )
}

export default EditBookForm