import "./App.css";

import axios from "axios";
import moment from "moment-timezone";
import * as React from "react";

// We define a bunch of constants to simplify this toy app.

const BASE_URL = "http://localhost:4000";
const TIMEZONE = "America/New_York";
// We don't use auth for this toy app, so just declare what our user id is.
const USER_ID = "123";

const UserApi = {
  list: () => {
    return axios.get(`${BASE_URL}/users`);
  },
};

class App extends React.Component {
  state = { users: [], user: undefined };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const users = await UserApi.list();
    this.setState({
      users: users.data.users || [],
      user: users.data.users.find((u) => u.id === USER_ID),
    });
  };

  render() {
    if (!this.state.user) {
      // Wait for the user to be fetched before rendering.
      return null;
    }
    const clinicians = this.state.users.filter((u) => u.kind === "clinician");
    return (
      <div className="App">
        <header className="App-header">
          {this.state.user && <p>Hello interviewee</p>}
          {!this.state.user && <p>Could not fetch users, something is off.</p>}
        </header>
        <div />
      </div>
    );
  }
}

export default App;
