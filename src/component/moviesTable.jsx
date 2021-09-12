import React, { Component } from 'react'

class MoviesTable extends React.Component {

    raisSort = path=>{
        const sortColumn = {...this.props.sortColumn}
         if(sortColumn.path === path) 
            sortColumn.order = (sortColumn.order==='asc')?'desc':'asc'
        else {
            sortColumn.path=path;
            sortColumn.order ="asc"
        }
        this.props.onSort(sortColumn); 
    }
    render() { 
        const {movies, onDelete} = this.props;

        return (  
        <table className="table">  
        <thead className="thead-dark">
            <tr>
                <th onClick={()=>this.raisSort('title')}>Title</th>
                <th onClick={()=>this.raisSort('genre.name')} scope="col">Genre</th>
                <th onClick={()=>this.raisSort('numberInStock')} scope="col">Stock</th>
                <th onClick={()=>this.raisSort('dailyRentalRate')} scope="col">Daily Rating</th>
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
}


export default MoviesTable;