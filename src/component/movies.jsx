import React, { Component } from 'react';
import { getMovies } from '../service/fakeMovieService';
import { getGenres } from '../service/fakeGenreService';
import Pagination from './pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn:{path:'title',order:'asc'}
     }
     componentDidMount(){
         const genres = [{_id:"",name:'All Genres'},...getGenres()]
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
         //console.log(genres);
         this.setState({selectedGenre: genres,  currentPage:1})
     }
     handleSort = path =>{
         const sortColumn = {...this.state.sortColumn}
         if(sortColumn.path === path) 
            sortColumn.order = (sortColumn.order==='asc')?'desc':'asc'
        else {
            sortColumn.path=path;
            sortColumn.order ="asc"
        }
        this.setState({sortColumn})
         //this.setState({sortColumn:{path, order:'asc'}})
     }
    render() { 
        const {length: count} = this.state.movies;
        const {currentPage, pageSize, selectedGenre, movies:allMovies,sortColumn } = this.state;

        const filtered= selectedGenre && selectedGenre._id ? allMovies.filter(m=>m.genre._id === selectedGenre._id):allMovies;

        const sort=_.orderBy(filtered, [sortColumn.path],[sortColumn.order])

        const movies = paginate(sort, currentPage, pageSize);
        
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
               <MoviesTable 
                movies={movies} 
                onDelete={this.handleDelete} 
                onSort ={this.handleSort}
                onLike={this.changeIcon}/>
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