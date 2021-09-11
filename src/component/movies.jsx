import React, { Component } from 'react';
import { getMovies } from '../service/fakeMovieService';
import { getGenres } from '../service/fakeGenreService';
import Pagination from './pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './listGroup';
import MoviesTable from './moviesTable';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
     }
     componentDidMount(){
         const genres = [{name:'All Genres'},...getGenres()]
         this.setState({movies: getMovies(), genres})
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
         this.setState({selectedGenre: genres,  currentPage:1})
     }
    render() { 
        const {length: count} = this.state.movies;
        const {currentPage, pageSize, selectedGenre, movies:allMovies } = this.state;

        const filtered= selectedGenre && selectedGenre._id ? allMovies.filter(m=>m.genre._id === selectedGenre._id):allMovies;

        const movies = paginate(filtered, currentPage, pageSize);
        
        if(count === 0) return <p> There are no Movies in the Database!</p>;
        return ( 
            <div className="row">
                <div className="col-2">
                    <ListGroup 
                    items={this.state.genres}
                    selectedGenre = {this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}/>
                </div>
                <div className="col">
                <p>There are {filtered.length} movies in the database</p>
               <MoviesTable movies={movies} onDelete={this.handleDelete} onLike={this.changeIcon}/>
                <Pagination 
                    itemsCount={filtered.length} 
                    pageSize={pageSize}  
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}/>
             </div>
          
        </div>
         );
    }
}
 
export default Movies;