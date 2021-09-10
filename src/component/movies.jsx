import React, { Component } from 'react';
import { getMovies } from '../service/fakeMovieService';
import { getGenres } from '../service/fakeGenreService';
import Pagination from './pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './listGroup';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
     }
     componentDidMount(){
         this.setState({movies: getMovies(), genres:getGenres()})
     }
     handleDelete = (movie)=>{
        console.log('clickeds',movie)
        const movies = this.state.movies.filter( m => m._id !== movie._id)
        this.setState({movies})
     }
     handlePageChange = (page)=>{
        this.setState({currentPage: page})
     }
     handleGenreSelect = genres =>{
         console.log(genres);
     }
    render() { 
        const {length: count} = this.state.movies;
        const {currentPage, pageSize, movies:allMovies } = this.state;

        const movies = paginate(allMovies, currentPage, pageSize);
        
        if(count === 0) return <p> There are no Movies in the Database!</p>;
        return ( 
            <div className="row">
                <div className="col-2">
                    <ListGroup 
                    items={this.state.genres}
                    valueProperty = "_id"
                    textProperty = "name"
                    onItemSelect={this.handleGenreSelect}/>
                </div>
                <div className="col">
                <p>There are {count} movies in the database</p>
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
                            <td><i class="fa fa-heart-o" aria-hidden="true" onClick={this.changeIcon}></i></td>
                            <td>
                                <button 
                                onClick = {() =>this.handleDelete(movie)} 
                                className="btn btn-danger btn-sm">Delete</button>
                            </td>  
                         </tr>  
                        )}
                    </tbody>
                </table>
                <Pagination 
                    itemsCount={count} 
                    pageSize={pageSize}  
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}/>
             </div>
          
        </div>
         );
    }
}
 
export default Movies;