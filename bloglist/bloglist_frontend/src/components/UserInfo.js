import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const UserInfo = ({ info }) => {
  if (!info) {
    return null;
  }
  return (
    <div>
      <h3>{info.username}</h3>
      <b>added blogs</b>
      {info.blogs.length > 0 ? (
        info.blogs.map((b) => (
          <Table striped>
            <tbody>
              <tr>
                <td>
                  <Link to={`/blogs/${b.id}`}> {b.title} </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        ))
      ) : (
        <p>no blogs added so far</p>
      )}
    </div>
  );
};

export default UserInfo;
