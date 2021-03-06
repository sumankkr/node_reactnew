import React, { Component }  from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated} from '../auth';
import defaultImage from '../images/avatar.png';
import DeleteUser from './DeleteUser';
import { read } from "./apiUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs  from "./ProfileTabs";
import { listByUser } from "../post/apiPost";
class Profile extends Component
{
    constructor() {
       super();
       this.state ={
           user: { following: [], followers: [] },
           redirectTosignin :false,
           following: false,
           error: "",
           posts: []
       };
    }

      // check follow
  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
          if (data.error) {
            this.setState({ redirectToSignin: true });
          } else {
            let following = this.checkFollow(data);
            this.setState({ user: data, following });
            this.loadPosts(data._id);
          }
        });
      }; 

      loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.setState({ posts: data });
          }
        });
      };

      componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
      }
    

      componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
      }
   

    render()
    {
       
        const {user,redirectTosignin,posts } =this.state;
        if(redirectTosignin)
        return <Redirect to="/"/>
        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : defaultImage
        return (
            <div className="container">
                 <h2 className="mt-5 mb-5">Profile</h2>
                 
            
                <div className="row">
                    <div className="col-md-6">
                   
                    <img style={{height:"200px",width:"auto"}} className="img-thumbnail" src={photoUrl} alt={user.name}  onError={i => (i.target.src = `${defaultImage}`)}/>
              
                    </div>
                    <div className="col-md-6">
                        <div className="lead">
                    <p>Hello,{user.name}</p>
                <p>Email: {user.email}</p>
                <p>{`Join on ${new Date( this.state.user.created).toDateString()}`} </p>
                   
                        {isAuthenticated().user && isAuthenticated().user._id===user._id ? (
                       <div className="d-inline-block mt-5">
                            <Link
                  className="btn btn-raised btn-info mr-5"
                  to={`/post/create`}
                >
                  Create Post
                </Link>
                           <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>
                                Edit Profile
                           </Link>
                          <DeleteUser userId={user._id} />
                       </div>     
                       ) : (
                        <FollowProfileButton  following={this.state.following}  onButtonClick={this.clickFollowButton}/>
                      )}
                      
                    </div>
                </div>
                </div>
                <div className="row">
          <div className="col md-12 mt-5 mb-5">
            <hr />
            <p className="lead">{user.about}</p>
            <hr />
<ProfileTabs
  followers={user.followers}
  following={user.following}
  posts={posts}
/>
            </div>
            </div>
            </div>
        )
    }
}
export default Profile;