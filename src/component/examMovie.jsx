import React, { Component } from 'react';
import { getMovies } from '../service/fakeMovieService';


class ExamMovies extends Component {
    state = {  
        movies:getMovies(),
    }
    handleDelete =(movie) =>{
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({movies})
    }
  
    render() { 
        const {length: count} = this.state.movies;
        if(count === 0) return <p> There are no Movies in the Database!</p>;
        return ( 
            <React.Fragment>
            <p>There are {count} movies in the database</p>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <td>Title</td>
                        <td>Genre</td>
                        <td>Stock</td>
                        <td>Ranking</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.movies.map( movie =>
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <button className="btn btn-danger btn-sm"
                                onClick={()=>this.handleDelete(movie)}>Delete</button>
                            </td>
                    </tr>)}
                    
                </tbody>
            </table>
            </React.Fragment>
         );
    }
}
 
export default ExamMovies;