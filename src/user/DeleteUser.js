import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
 class DeleteUser extends Component {
     state= {
         redirect:false
     }
     deleteaccount= () => {
        const userId =this.props.userId;
        fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`,{
            method: "DELETE",
            headers :{
             Accept:"application/json",
             "Content-Type":"application/json",
             "Authorization" : `Bearer ${isAuthenticated().token}`
            }
        })
        .then(response => {
            return response.json();
        }).catch( err => console.log(err))
        .then(data =>{
            if(data.error){
             console.log("error")
            }
            
            else {
         signout(() => console.log("user is deleted"));
     this.setState({ redirect :true})
            }
          
        })
     }
    deleteConfirmed = () => {
        let answas =window.confirm("Are you sure want tyo delete account");
        if(answas) {
            this.deleteaccount();
        }
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            
                 <button className="btn btn-raised btn-danger" onClick={this.deleteConfirmed}>
                               Delete Profile
                           </button>
            
        )
    }
}

export default DeleteUser;
