import './style.css';

const User = ({username, avatar}) => {
  return (
    <div className="user">
      <img alt={`${username}-avatar`} className="avatar" src={avatar}/>
      <span className="username">{username}</span>
  </div>);
}
export default User;
