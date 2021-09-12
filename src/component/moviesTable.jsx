import React, { Component } from 'react'

const MoviesTable = (props) => {
    const {movies, onDelete, onSort} = props;

    return (  
    <table className="table">  
    <thead className="thead-dark">
        <tr>
            <th onClick={()=>onSort('title')}>Title</th>
            <th onClick={()=>onSort('genre.name')} scope="col">Genre</th>
            <th onClick={()=>onSort('numberInStock')} scope="col">Stock</th>
            <th onClick={()=>onSort('dailyRentalRate')} scope="col">Daily Rating</th>
            <th scope="col">Like/Dislike</th>
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