import react from "react";
import axios from "axios";

export default class Home extends react.Component {
  handleSubmit = (event, collection, operation) => {
    event.preventDefault();
    if (operation === "login") {
      const username = event.target.username.value;
      const password = event.target.password.value;
      axios
        .get("https://deadbody.onrender.com/api/database", {
          params: {
            username: username,
            password: password,
            database: "deadbody",
            collection: collection,
          },
        }).then((res) => {
          if (res.data.success === true) {
            if (res.data["login-success"]) {
              localStorage.setItem("mode", collection);
              localStorage.setItem("username", username);
              localStorage.setItem("token", res.data.token);
              window.location.href = "/dashboard";
            } else {
              localStorage.clear();
              alert(res.data.message);
              window.location.href = "/";
            }
          } else {
            localStorage.clear();
            alert(res.data.message);
            window.location.href = "/";
          }
        });
    } else if (operation === "register") {
      const username = event.target.username.value;
      const password = event.target.password.value;
      const confPassword = event.target.passwordConfirm.value;
      const email = event.target.email.value;
      if (password !== confPassword) {
        alert("Password and Confirm Password should be same!");
      } else if (username && password && email) {
        axios
          .post("https://deadbody.onrender.com/api/database", {
            username: username,
            password: password,
            email: email,
            database: "deadbody",
            collection: collection,
            checkKey:
              collection === "admin"
                ? ["username", "email", "email"]
                : ["username", "email"],
            checkCollection:
              collection === "admin"
                ? ["admin", "admin", "validEmail"]
                : ["users", "users"],
            checkMessage:
              collection === "admin"
                ? [
                    "username already exists!",
                    "email already exists!",
                    "email provided is not a vaid admin email",
                  ]
                : ["username already exists!", "email already exists!"],
            checkValue: collection === "admin" ? [0, 0, 1] : [0, 0],
            insert: ["username", "password", "email"],
          })
          .then((res) => {
            alert(res.data.message);
            if (res.data.success) {
              window.location.reload();
            }
          });
      } else {
        alert("Please enter all the fields!");
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      toggleAdmin: false,
      toggleuser: false,
    };
  }
  render() {
    return (
      <div className="h-screen w-screen flex flex-row justify-center">
        <div className="h-full w-full flex flex-col justify-center">
          <div className="flex xs:flex-col lg:flex-row justify-center w-full">
            <div className="flex flex-col flex-grow h-full">
              <div className="w-full flex flex-row justify-center p-2 h-full">
                <div className="w-full h-full flex flex-col justify-center xs:w-full md:w-2/3 lg:w-1/2 sm:w-3/4">
                  <div className="md:p-8 sm:p-5 xs:p-2 bg-opacity-40 rounded flex-wrap border-black border-2">
                    {!this.state.toggleAdmin ? (
                      <form
                        onSubmit={(event) => {
                          this.handleSubmit(event, "admin", "login");
                        }}
                        className="flex flex-col w-full flex-wrap"
                      >
                        <label className="w-full mt-2 mb-1 text-lg font-semibold">
                          Login as Admin
                        </label>
                        <label className="w-full mt-2 mb-1">Username</label>
                        <input
                          name="username"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="text"
                          placeholder="username"
                        />
                        <label className="w-full mt-1 mb-1">Password</label>
                        <input
                          name="password"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="password"
                          placeholder="password"
                        />
                        <button
                          className="border-2 p-1 border-black w-full rounded mt-5 mb-1 bg-blue-500 hover:bg-blue-300 cursor-pointer bg-opacity-25"
                          type="submit"
                        >
                          Login
                        </button>
                        <div className="p-1 w-full mt-1 mb-1">
                          Don't have an account?{" "}
                          <button
                            onClick={() => {
                              let tempraryState = this.state;
                              tempraryState.toggleAdmin =
                                !tempraryState.toggleAdmin;
                              this.setState(tempraryState);
                            }}
                            className="text-teal-700 ml-1"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form
                        onSubmit={(event) => {
                          this.handleSubmit(event, "admin", "register");
                        }}
                        className="flex flex-col w-full flex-wrap"
                      >
                        <label className="w-full mt-2 mb-1 text-lg font-semibold">
                          Register Admin
                        </label>
                        <label className="w-full mt-2 mb-1">Username</label>
                        <input
                          name="username"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="text"
                          placeholder="username"
                        />
                        <label className="w-full mt-1 mb-1">Email</label>
                        <input
                          name="email"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="email"
                          placeholder="email"
                        />
                        <label className="w-full mt-1 mb-1">Password</label>
                        <input
                          name="password"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="password"
                          placeholder="password"
                        />
                        <label className="w-full mt-1 mb-1">
                          Confirm password
                        </label>
                        <input
                          name="passwordConfirm"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="password"
                          placeholder="confirm password"
                        />
                        <button
                          className="border-2 p-1 border-black w-full rounded mt-5 mb-1 bg-blue-500 hover:bg-blue-300 cursor-pointer bg-opacity-25"
                          type="submit"
                        >
                          Register
                        </button>
                        <div className="p-1 w-full mt-1 mb-1">
                          Have an account?
                          <button
                            onClick={() => {
                              let tempraryState = this.state;
                              tempraryState.toggleAdmin =
                                !tempraryState.toggleAdmin;
                              this.setState(tempraryState);
                            }}
                            className="text-teal-700 ml-1"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-grow h-full">
              <div className="w-full flex flex-row justify-center p-2 h-full">
                <div className="h-full flex flex-col justify-center xs:w-full md:w-2/3 lg:w-1/2 sm:w-3/4">
                  <div className="md:p-8 sm:p-5 xs:p-2 bg-opacity-40 rounded w-full flex-wrap border-black border-2">
                    {!this.state.toggleuser ? (
                      <form
                        onSubmit={(event) => {
                          this.handleSubmit(event, "users", "login");
                        }}
                        className="flex flex-col w-full flex-wrap"
                      >
                        <label className="w-full mt-2 mb-1 text-lg font-semibold">
                          Login as User
                        </label>
                        <label className="w-full mt-2 mb-1">Username</label>
                        <input
                          name="username"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="text"
                          placeholder="username"
                        />
                        <label className="w-full mt-1 mb-1">Password</label>
                        <input
                          name="password"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="password"
                          placeholder="password"
                        />
                        <button
                          className="border-2 p-1 border-black w-full rounded mt-5 mb-1 bg-blue-500 hover:bg-blue-300 cursor-pointer bg-opacity-25"
                          type="submit"
                        >
                          Login
                        </button>
                        <div className="p-1 w-full mt-1 mb-1">
                          Don't have an account?
                          <button
                            onClick={() => {
                              let tempraryState = this.state;
                              tempraryState.toggleuser =
                                !tempraryState.toggleuser;
                              this.setState(tempraryState);
                            }}
                            className="text-teal-700 ml-1"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form
                        onSubmit={(event) => {
                          this.handleSubmit(event, "users", "register");
                        }}
                        className="flex flex-col w-full flex-wrap"
                      >
                        <label className="w-full mt-2 mb-1 text-lg font-semibold">
                          Register User
                        </label>
                        <label className="w-full mt-2 mb-1">Username</label>
                        <input
                          name="username"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="text"
                          placeholder="username"
                        />
                        <label className="w-full mt-1 mb-1">Email</label>
                        <input
                          name="email"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="email"
                          placeholder="email"
                        />
                        <label className="w-full mt-1 mb-1">Password</label>
                        <input
                          name="password"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="password"
                          placeholder="password"
                        />
                        <label className="w-full mt-1 mb-1">
                          Confirm password
                        </label>
                        <input
                          name="passwordConfirm"
                          className="border-2 p-1 border-black w-full rounded mt-1 mb-1"
                          type="password"
                          placeholder="confirm password"
                        />
                        <button
                          className="border-2 p-1 border-black w-full rounded mt-5 mb-1 bg-blue-500 hover:bg-blue-300 cursor-pointer bg-opacity-25"
                          type="submit"
                        >
                          Register
                        </button>
                        <div className="p-1 w-full mt-1 mb-1">
                          Have an account?
                          <button
                            onClick={() => {
                              let tempraryState = this.state;
                              tempraryState.toggleuser =
                                !tempraryState.toggleuser;
                              this.setState(tempraryState);
                            }}
                            className="text-teal-700 ml-1"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
