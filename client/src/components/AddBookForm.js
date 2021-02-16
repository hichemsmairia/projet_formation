import axios from 'axios'
import React, { useState } from 'react'

const AddBookForm = props => {
    const initialFormState = { id: null, author: '' , publisher:'' ,price:0,quantity:0 }

	const [ book, setBook ] = useState(initialFormState)
    // ca c'est a la place de dire 
    /*
    const [author,setAuthor] = useState('')
    const [price,setPrice] = useState('')
    const [quantity,setQuantity] = useState('')
    const [publisher,setAuthor] = useState('')

    const book = {

    }
    */

	const handleInputChange = e => {
		const { name, value } = e.target // setAuthor(e.target.value)

		setBook({ ...book, [name]: value }) // ...book = conserver le reste du tableau et just changer le champ concerné
	}
	return (
		
			<form onSubmit={event => {
				event.preventDefault()
                axios.post("http://localhost:5000/api/livres/creer_livre",book)
				//ici , on envoyer l'objet book vers notre api pour l'enregistrer dans la base de donneés
				window.location.reload()

			}} >
  <div class="form-group">
    <label for="exampleInputEmail1">auteur</label>
    <input type="text" name="author" value={book.author} onChange={handleInputChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="auteur"/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">publisher</label>
    <input type="text" name="publisher" value={book.publisher} onChange={handleInputChange} class="form-control" id="exampleInputPassword1" placeholder="Publisher"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">prix</label>
    <input type="number" name="price" class="form-control" value={book.price} onChange={handleInputChange} id="exampleInputPassword1" placeholder="prix"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">quantité</label>
    <input type="number" name="quantity" value={book.quantity} onChange={handleInputChange} class="form-control" id="exampleInputPassword1" placeholder="quantité"/>
  </div>
  <button type="submit" class="btn btn-primary">ajouter un livre</button>
</form>

	)
}

export default AddBookForm