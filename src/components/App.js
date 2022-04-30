import React, { Component } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import axios from "axios";
import AddMovie from "./AddMovie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditMovie from "./EditMovie";

export default class App extends Component {
  state = {
    movies: [],
    seachQuery: "",
    windowLocation : window.location
  };

  // async componentDidMount() {

  //async await in fetch

  //     const baseUrl = 'http://localhost:3002/movies'

  //     const getmovies = await fetch(baseUrl)
  //     const resultMovies = await getmovies.json();
  //     this.setState({movies : resultMovies})
  // }

  // async await in axios

  async componentDidMount() {
    const baseUrl = "http://localhost:3002/movies";
    const response = await axios.get(baseUrl);
    this.setState({ movies: response.data });
  }

  searchMovie = (e) => {
    this.setState({ seachQuery: e.target.value });
  };

  AddMovie = async (movie)=> {
    await axios.post(`http://localhost:3002/movies/`,movie)

    this.setState(state => ({
      movies : state.movies.concat([movie])
    }))
    window.location.replace(this.state.windowLocation.href)
  }

  //  async await fetch

  // deleteMovies = async (movie)=> {
  //     const baseUrl = `http://localhost:3002/movies/${movie.id}`
  //     await fetch(baseUrl, {
  //         method : "DELETE",
  //     })
  //     const newMovieList =  this.state.movies.filter(
  //         m => m.id !== movie.id
  //     )
  //     this.setState({
  //         movies : newMovieList
  //     })
  // }

  //  axios async await

  deleteMovies = async (movie) => {
    const baseUrl = `http://localhost:3002/movies/${movie.id}`;
    await axios.delete(baseUrl);
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState({
      movies: newMovieList,
    });
  };

  filteredMovies = () => {
    this.state.movies.filter((movie) => {
      return movie.name.toLowerCase().indexOf(this.state.seachQuery) !== -1;
    });
  };

  render() {
    let filteredMovies = this.state.movies.filter((movie) => {
      return (
        movie.name
          .toLowerCase()
          .indexOf(this.state.seachQuery.toLowerCase()) !== -1
      );
    }).sort((a,b) =>{
      return a.id < b.id ? 1 : a.id > b.id ? -1 : 0 ;
    });
    return (
      <Router>
        <div className="container">
        <Routes>

        <Route index element= {   <React.Fragment>
            <div className="row">
                <div className="col-lg-12">
                <SearchBar searchMovieProp={this.searchMovie} />
                </div>
            </div>
            <MovieList
                deleteMovieProp={this.deleteMovies}
                movies={filteredMovies}
            />
            </React.Fragment>}>
     
          </Route>

          <Route path="/add" element={
            <AddMovie propsonAddMovie={this.AddMovie} />
          }>
          </Route>

          <Route editPath = {this.props.value} path="edit/:id" element={<EditMovie />}>

          </Route>
          
          </Routes>
        </div>
      </Router>
    );
  }
}
