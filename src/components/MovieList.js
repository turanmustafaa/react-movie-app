import React from "react";
import {Link} from 'react-router-dom'
let MovieList = (props) => {

  let arr = props.movies;
  let cards = []; 

  const truncareOverview = (str , maxLength) => {
    if(!str) return null;
    if(str.length < maxLength) return str;
    if(str.length > maxLength) return `${str.substring(0, maxLength)} ...`;
  }

  arr.forEach((element) => {

    function clickHandle(){
      props.deleteMovieProp(element)
    }
    cards.push(
      <div className="col-lg-4" key={element.id}>
        <div className="card mb-4 shadow-sm primary">
          <img alt="" src={element.imageURL} className="card-img-top"></img>
          <div className="card-body">
            <h5 className="card-title">{element.name}</h5>
            <p className="card-text">{truncareOverview(element.overview , 50)}</p>
            <div className="d-flex justify-content-between align-items-center">
              <button onClick={clickHandle} type="button" className="btn btn-md btn-outline-danger">
                sil
              </button>
              <Link className="btn btn-md btn-primary" to={`edit/${element.id}`}>
                Edit
              </Link>
            
              <h2>
                <span style={{ color: "black" }} className="badge badge-dark">
                  {element.rating}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return  (
    <div className="row">{cards}</div>
  )
  ;
};

export default MovieList;
