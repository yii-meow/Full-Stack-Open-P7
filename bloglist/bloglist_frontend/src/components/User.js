import { Link, Routes, Route } from "react-router-dom";

const userInfo = ({ info }) => {
  console.log("hi");
  return <div>hi</div>;
};

const User = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>

      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>

        {users.map((u) => (
          <tr>
            <td>
              <Link to={`${u.id}`}>{u.username}</Link>
            </td>

            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default User;
