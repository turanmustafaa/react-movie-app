import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class SearchBar extends Component {
  stopDefaultEvent = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.stopDefaultEvent}>
        <div className="form-row mb-5 d-flex">
          <div className="col-10">
            <input
              onChange={this.props.searchMovieProp}
              type="text"
              className="form-control"
              placeholder="Search a Movie"
            ></input>
          </div>
          <div className="col-2">
          <Link to="/add">
            <button
              type="button"
              className="btn btn-md btn-danger"
              style={{ float: "right" }}
            >
              Add Movie
            </button>
            </Link>
          </div>
        </div>
      </form>
    );
  }
}
