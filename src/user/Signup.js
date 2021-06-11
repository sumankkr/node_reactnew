import React, { Component }  from 'react';
class Signup extends Component
{
  constructor(){
    super();
    this.state ={
      name: "",
      email:"",
      password:"",
      error:"",
      open:false
    };
  }

handleChange=(name) => (event) => {
  this.setState({error: ""});
this.setState({[name] :event.target.value
})
};
onSubmit = event => {
event.preventDefault()
const {name,email,password} =this.state;
const user ={
  name,email,password
};
this.signup(user).then(
  data => {
    if(data.error) this.setState({error : data.error})
    else
    this.setState({
      error:"",
      name: "",
      email:"",
      password:"",
      open : true
      
    });
  });
};
signup = user => {
//console.log(user);
return fetch(`${process.env.REACT_APP_API_URL}/signup` ,{
  method:"POST",
  headers: {
    Accept:"application/json",
    "Content-Type":"application/json",
  },
  body :JSON.stringify(user)
})
.then(response =>{
  return response.json();
})
.catch(err => console.log(err));
};
    render(){
      const {name,email,password,error,open} =this.state;
      return (
        <div className="container">
          <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>
          <div className="alert alert-info" style={{display: open ? "" : 'none'}}>New account Is created Succesfully please sign In</div>
          <h2 className="mt-5 mb-5">Signup</h2>
          <form>
            <div className="from-group">
              <label className="text-muted">Name</label>
              <input onChange={this.handleChange("name")} type="text" className="form-control" value={name}/>
            </div>
            <div className="from-group">
              <label className="text-muted">Email</label>
              <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}/>
            </div>
            <div className="from-group">
              <label className="text-muted">password</label>
              <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
            </div>
            <button className="btn btn-raised btn-primary" onClick={this.onSubmit}>Submit</button>
          </form>
        </div>
      )
      
    }

}

  export default Signup;
  