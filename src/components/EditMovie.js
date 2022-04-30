import React from 'react';
import axios from 'axios';
class EditMovie extends React.Component {
    
    state = {
        name : "",
        rating : "",
        overview : "",
        imageURL : ""
    }

    async componentDidMount() {
        let str = window.location.href;
        let lengthstr = window.location.href.lastIndexOf('/')
        let id = str.substring(lengthstr + 1)


        let {data} = await axios.get(`http://localhost:3002/movies/${id}`)
        
        this.setState({
            name : data.name,
            rating : data.rating,
            overview : data.overview,
            imageURL : data.imageURL
        })
    }

    editChanges = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    PreventDefaultFunc = async (e) => {

        let str = window.location.href;
        let lengthstr = window.location.href.lastIndexOf('/')
        let id = str.substring(lengthstr + 1)

        console.log(this.state)
        await axios.put(`http://localhost:3002/movies/${id}` , this.state) 

        e.preventDefault();
    }
    
    render() {

        return  (
            <div className="container">
            <form onSubmit={this.PreventDefaultFunc} className="mt-5">
            <input required className="form-control" id="disabledInput" type="text" placeholder="Edit The Form To Add A Movie.." disabled/>
                <div className="form-row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input onChange={this.editChanges} value={this.state.name}  type="text" 
                                className="form-control" 
                                name="name"/>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input onChange={this.editChanges} value={this.state.rating} required 
                                type="text" 
                                className="form-control" 
                                name="rating"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input onChange={this.editChanges} value={this.state.imageURL} required
                                type="text" 
                                className="form-control" 
                                name="imageURL"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea onChange={this.editChanges} value={this.state.overview} 
                                className="form-control" 
                                name="overview" rows="5"></textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger btn-block" value="Edit Movie" />
            </form>
        </div>
        )

    }
}


export default EditMovie; 