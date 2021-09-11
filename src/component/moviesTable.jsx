import React, { Component } from 'react'

const MoviesTable = (props) => {
    const {movies, onDelete} = props;

    return (  
    <table className="table">  
    <thead className="thead-dark">
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Daily Rating</th>
            <th scope="col">Rating</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
    {movies.map(movie => 
        <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>@{movie.dailyRentalRate}</td>
            <td><i class="fa fa-heart-o" aria-hidden="true" ></i></td>
            <td>
                <button 
                onClick = {() =>onDelete(movie)} 
                className="btn btn-danger btn-sm">Delete</button>
            </td>  
         </tr>  
        )}
    </tbody>
</table> );
}
 
export default MoviesTable;