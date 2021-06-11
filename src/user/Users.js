import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../images/avatar.png';
class Users extends Component
{
    constructor() {
        super();
        this.state ={
            users:[]        
        };
     }
     componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/users`,{
            method: "GET",
         }).then(response => {
            return response.json();
        }).catch( err => console.log(err))
        .then(data => {
             if(data.error){
                 console.log(data.error)
             }else{
                 this.setState({users:data})
             }
         })
     }
     
render()
{
    const { users } = this.state;
    return(
        <div className="container">
             <h2 className="mt-5 mb-5">Users</h2>
        <div className="row">
            {users.map((user, i) => (
            <div className="card col-md-4" key={i}>
           <img
                        style={{ height: "200px", width: "auto" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${defaultImage}`)}
                        alt={user.name}
                    />
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link  to={`/user/${user._id}`} className="btn btn-primary">Go somewhere</Link>
            </div>
            </div>
                ))}
            </div>
            </div>
    )
}
}
export default Users;