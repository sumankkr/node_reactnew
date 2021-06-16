import React  from 'react';
import { Link,withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
const isActive =(history,path) => {
    if(history.location.pathname ===path)
    return {color:"#ff9900"}
    else return {color: "#ffffff"}
};

const Menu = ({history}) => (
    <div>
     <ul className="nav nav-tabs bg-primary"> 
      <li className="nav-item"> <Link style={isActive(history,"/")} to='/' className="nav-link">Home</Link></li>
      <li className="nav-item"> <Link style={isActive(history,"/users")} to='/users' className="nav-link">Users</Link></li>
      <li>
                        <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link">
                            create post
                        </Link>
                    </li>
    {!isAuthenticated() && (
        <>
                   <li className="nav-item"> <Link style={isActive(history,"/signin")}  to='/signin' className="nav-link">Signin</Link></li>
        <li className="nav-item"> <Link  style={isActive(history,"/signup")}  to='/signup' className="nav-link">signup</Link></li> 
        </>
    )}
    
    {isAuthenticated() && isAuthenticated().user.role === "admin" && (
    <li className="nav-item">
        <Link
            to={`/admin`}
            style={isActive(history, `/admin`)}
            className="nav-link"
        >
            Admin
        </Link>
    </li>
)}
    
     {isAuthenticated() && (
        <>
     <li className="nav-item">
                        <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
                            Find People
                        </Link>
                        </li>
                    

                    <li className="nav-item">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            Sign Out
                        </span>
                    </li> 
   </>
   )}
        </ul>
    </div>
);
export default withRouter(Menu);
