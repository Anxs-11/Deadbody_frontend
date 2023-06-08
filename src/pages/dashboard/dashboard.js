import axios from "axios";
import react from "react";
import React, { Component } from 'react';

export default class Dashboard extends react.Component {
  userForm = [
    {
      title: "Matching Details",
      inputs: [
        {
          label: "State",
          type: ["select"],
          options: [["U.P."]],
        },
        {
          label: "District",
          type: ["select"],
          options: [["Gautam Buddha Nagar"]],
        },
        {
          label: "Police Station",
          type: ["select"],
          options: [["Kasana Police Station"]],
        },
        {
          label: "Incident Date Range (From)",
          type: ["date"],
          placeholder: ["From"],
        },
        {
          label: "Incident Date Range (To)",
          type: ["date"],
          placeholder: ["To"],
        },
      ],
    },
    {
      title: "Search Parameters",
      inputs: [
        {
          label: "Gender",
          type: ["select"],
          options: [["Male", "Female"]],
        },
        {
          label: "Age-Range (From)",
          type: ["number"],
          placeholder: ["From"],
        },
        {
          label: "Age-Range (To)",
          type: ["number"],
          placeholder: ["To"],
        },
        {
          label: "Hair-Color",
          type: ["select"],
          options: [["Black", "Brown", "Blonde"]],
        },
        {
          label: "Height-Range-From (cm)",
          type: ["number"],
          placeholder: ["From"],
        },
        {
          label: "Height-Range-To (cm)",
          type: ["number"],
          placeholder: ["To"],
        },
      ],
    },
  ];
  adminForm = [
    {
      title: "Matching Details",
      inputs: [
        {
          label: "State",
          type: ["select"],
          options: [["U.P."]],
        },
        {
          label: "District",
          type: ["select"],
          options: [["Gautam Buddha Nagar"]],
        },
        {
          label: "Police Station",
          type: ["select"],
          options: [["Kasana Police Station"]],
        },
        {
          label: "Incident Date",
          type: ["date"],
          placeholder: ["On"],
        },
        {
          label: "Corpse Discovery Location",
          type: ["text"],
          placeholder: ["Corpse Discovery Location"],
        },
        {
          label: "Identification Details",
          type: ["text"],
          placeholder: [
            "Identification Details. (eg. name, identification mark, age, etc.)",
          ],
        },
        {
          label: "Corpse Image",
          type: ["file"],
          placeholder: [""],
        },
      ],
    },
  ];
  componentDidMount() {
    axios
      .get("https://deadbody.onrender.com/api/database", {
        params: {
          _id: window.localStorage.getItem("token"),
          database: "deadbody",
          collection: this.state.collection,
        },
      })
      .then((res) => {
        if (res.data.success) {
          let tempState = this.state;
          tempState.isLoading = false;
          this.setState(tempState);
        } else {
          alert(res.data.message);
          localStorage.clear();
          window.location.href = "/";
        }
      });
  }
  constructor() {
    super();
    const token = localStorage.getItem("token");
    const collection = localStorage.getItem("mode");
    if (
      token === undefined ||
      token === null ||
      token === "" ||
      collection === "" ||
      collection === undefined ||
      collection === null
    ) {
      localStorage.clear();
      window.location.href = "/";
    }
    this.state = {
      isLoading: true,
      collection: collection,
      queryResponse: [],
    };
  }
  render() {
    if (this.state.isLoading) {
      return <>Loading...</>;
    }
    let content = {
      users: (
        <div className="w-full flex flex-row flex-wrap">
          <form
            className="w-full flex flex-row flex-wrap"
            onSubmit={(event) => {
              event.preventDefault();
              let shouldSubmit = true;
              this.userForm.forEach(form => {
                form.inputs.forEach(input => {
                  if(shouldSubmit && (event.target[input.label].value === "" || event.target[input.label].value === null || event.target[input.label].value === undefined)) {
                    shouldSubmit = false;
                    alert(`${input.label} cannot be empty!`);
                  }
                });
              })
              if(shouldSubmit) {
                axios.get("https://deadbody.onrender.com/api/findDeadBody", {
                  params: {
                    database: "deadbody",
                    collection: "deadbodyEntries",
                    State: event.target["State"].value,
                    District: event.target["District"].value,
                    "Police Station": event.target["Police Station"].value,
                    "Incident Date": {$gte: event.target["Incident Date Range (From)"].value, $lte: event.target["Incident Date Range (To)"].value}
                  }
                }).then(result => {
                  if(result.data.success) {
                    let tempState = this.state;
                    tempState.queryResponse = result.data.data;
                    this.setState(tempState);
                  } else {
                    alert(result.data.message);
                  }
                })
              }
            }}
          >
            <div className="flex flex-row w-full flex-wrap md:p-5 xs:p-2">
              {this.userForm.map((form, index) => {
                return (
                  <div className="w-full flex flex-row flex-wrap border-2 border-cyan-900 md:p-5 xs:p-3 mt-1 mb-1" key={`form_${index}`}>
                    <div className="w-full text-lg font-serif italic font-bold text-cyan-900">
                      {form.title}
                    </div>
                    {form.inputs.map((input, inpIndex) => {
                      return (
                        <div className="xs:w-full lg:w-1/2 flex flex-row flex-wrap" key={`input_${index}_${inpIndex}`}>
                          <div className="flex md:flex-grow xs:w-full overflow-hidden font-semibold italic">
                            {input.label}
                          </div>
                          {input.type.map((type, index) => {
                            return (
                              <div className="flex-grow flex flex-row">
                                {type === "select" && index === 0 ? (
                                  <div className="md:flex-grow xs:w-full p-1">
                                    <select
                                      name={input.label}
                                      className="w-full border-b-2 border-cyan-900 p-1"
                                    >
                                      {input.options[index].map(
                                        (option, index) => {
                                          return (
                                            <option
                                              key={`${input.label}_${index}`}
                                              value={option}
                                            >
                                              {option}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                ) : type === "select" ? (
                                  ""
                                ) : (
                                  <div className="md:flex-grow xs:w-full p-1">
                                    <input
                                      name={input.label}
                                      className="w-full border-b-2 border-cyan-900 p-1"
                                      type={type}
                                      placeholder={input.placeholder[index]}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row w-full justify-center flex-wrap md:p-5 xs:p-2">
              <button
                type="Submit"
                className="p-2 border-2 border-cyan-900 rounded lg:w-1/3 xs:w-full md:w-1/2"
              >
                Search
              </button>
            </div>
          </form>
          <div className="w-full flex flex-row flex-wrap text-teal-700">
            {this.state.queryResponse.length !== 0 ? (
                <div className="w-full flex flex-col">
                  <div className="w-full">Entries Found!</div>
                  <div className="w-full">
                    <table>
                    <tr className="border border-black">
                      {Object.keys(this.state.queryResponse[0]).map((heading, index) => {
                        console.log(heading);
                        return (<th className="border border-black" key={`heading_${index}`}>{heading}</th>);
                      })}
                    </tr>
                    {
                      this.state.queryResponse.map((data, index) => {
                        return (
                          <tr key={`dataRow_${index}`} className="border border-black">
                            {Object.keys(data).map((value, colIndex) => {
                              return (<td className="border border-black" key={`dataCol_${colIndex}`}>{data[value]}</td>)
                            })}
                          </tr>
                        );
                      })
                    }
                  </table>
                  </div>
              </div>
            ) : "No data to show."}
          </div>
        </div>
      ),
      admin: (
        <div className="w-full flex flex-row flex-wrap">
          <form
            className="w-full flex flex-row flex-wrap"
            onSubmit={(event) => {
              event.preventDefault();
              let formData = {
                database: "deadbody",
                collection: "deadbodyEntries",
                checkKey: [],
                insert: [],
              };
              let fileData = new FormData();
              let fileFlag = false;
              let shouldSubmit = true;
              this.adminForm.forEach((form) => {
                form.inputs.forEach((input, index) => {
                  if (
                    input.type[0] === "file" &&
                    event.target[input.label].files.length !== 0
                  ) {
                    fileFlag = true;
                    fileData.append("file", event.target[input.label].files[0]);
                  } else {
                    formData.insert.push(input.label);
                    formData[input.label] = event.target[input.label].value;
                    if (shouldSubmit && event.target[input.label].value === "") {
                      shouldSubmit = false;
                      alert(`${input.label} cannot be empty.`);
                    }
                  }
                });
              });
              if (shouldSubmit) {
                axios
                  .post("https://deadbody.onrender.com/api/database", formData)
                  .then((res) => {
                    if (res.data.success) {
                      if (fileFlag) {
                        axios
                          .post(
                            "https://deadbody.onrender.com/api/uploadfile",
                            fileData,
                            {
                              params: {
                                key: res.data.key,
                              },
                            }
                          )
                          .then((response) => {
                            alert(response.data.message);
                          })
                          .catch((err) => alert(err));
                      } else {
                        alert(res.data.message);
                      }
                    } else {
                      alert(res.data.message);
                    }
                  });
              }
            }}
          >
            <div className="flex flex-row w-full flex-wrap md:p-5 xs:p-2">
              {this.adminForm.map((form) => {
                return (
                  <div className="w-full flex flex-row flex-wrap border-2 border-cyan-900 md:p-5 xs:p-3 mt-1 mb-1">
                    <div className="w-full text-lg font-serif italic font-bold text-cyan-900">
                      {form.title}
                    </div>
                    {form.inputs.map((input) => {
                      return (
                        <div className="xs:w-full lg:w-1/2 flex flex-row flex-wrap">
                          <div className="flex md:flex-grow xs:w-full overflow-hidden font-semibold italic">
                            {input.label}
                          </div>
                          {input.type.map((type, index) => {
                            return (
                              <div className="flex-grow flex flex-row">
                                {type === "select" && index === 0 ? (
                                  <div className="md:flex-grow xs:w-full p-1">
                                    <select
                                      name={input.label}
                                      className="w-full border-b-2 border-cyan-900 p-1"
                                    >
                                      {input.options[index].map(
                                        (option, index) => {
                                          return (
                                            <option
                                              key={`${input.label}_${index}`}
                                              value={option}
                                            >
                                              {option}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                ) : type === "select" ? (
                                  ""
                                ) : (
                                  <div className="md:flex-grow xs:w-full p-1">
                                    <input
                                      name={input.label}
                                      className="w-full border-b-2 border-cyan-900 p-1"
                                      type={type}
                                      placeholder={input.placeholder[index]}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row w-full justify-center flex-wrap md:p-5 xs:p-2">
              <button
                type="Submit"
                className="p-2 border-2 border-cyan-900 rounded lg:w-1/3 xs:w-full md:w-1/2"
              >
                Insert
              </button>
            </div>
          </form>
        </div>
      ),
    };
    const user = window.localStorage.getItem("username");
    return (
      <div className="w-screen flex flex-row flex-wrap justify-start">
        <div className="w-full text-white p-3 flex flex-row bg-cyan-800 justify-between">
          <span>Dead Body Finding</span>
          <span className="flex flex-row">
            <span className="h-10 w-10 p-1 rounded-full border-white border-2 bg-teal-900 flex flex-row justify-center">
              {user[0].toString().toUpperCase()}
            </span>
            <span className="select-none p-1 font-bold hover:underline min-h-10 ml-1 mr-1">
              {user}
            </span>
            <span
              className="hover:text-cyan-200 cursor-pointer p-1 min-h-10"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </span>
          </span>
        </div>
        {content[this.state.collection]}
      </div>
    );
  }
}
