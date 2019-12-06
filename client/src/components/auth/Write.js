import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProfileByHandle,
  postOnProfileByHandle
} from "../../actions/profileAction";
import Loader from "../common/Loading";
import TextFieldGroup from "../common/TextFieldGroup";
import isEmpty from "../../validation/isEmpty";

import { city } from "../../assets/img";
const cover = {
  backgroundImage: `url(${city})`,
  backgroundSize: "cover",
  backgroundPosition: "top center"
};
class Write extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      msgsubmit: false,
      error: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, error: false });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      message: this.state.message
    };
    if (!isEmpty(this.state.message)) {
      this.setState({ msgsubmit: true, message: "" });
      this.props.postOnProfileByHandle(
        userData,
        this.props.match.params.handle
      );
    } else {
      this.setState({ error: true });
    }
  }
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (loading) {
      dashboardContent = <Loader />;
    } else {
      if (!profile) {
        dashboardContent = (
          <div className="signup-page sidebar-collapse">
            <div
              className="page-header header-filter"
              filter-color="purple"
              style={cover}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-10 ml-auto mr-auto">
                    <div className="card card-signup">
                      <h2 className="card-title text-center">
                        No Profile Found
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div className="signup-page sidebar-collapse">
            <div
              className="page-header header-filter"
              filter-color="purple"
              style={cover}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-10 ml-auto mr-auto">
                    <div className="card card-signup">
                      <h2 className="card-title text-center">Write a review</h2>
                      <div className="card-body">
                        <div className="row justify-content-center">
                          <div className="col-md-5">
                            <form className="form" onSubmit={this.onSubmit}>
                              {this.state.msgsubmit ? (
                                <div className="has-success">
                                  <label className="control-label bmd-label-static">
                                    Submited
                                  </label>
                                </div>
                              ) : null}
                              {this.state.error ? (
                                <div className="has-danger">
                                  <label className="control-label bmd-label-static">
                                    Please enter msg
                                  </label>
                                </div>
                              ) : null}
                              <TextFieldGroup
                                name="message"
                                placeholder="Message..."
                                type="text"
                                value={this.state.message}
                                onChange={this.onChange}
                              />
                              <div className="text-center">
                                <button
                                  className="btn btn-primary btn-round"
                                  type="submit"
                                >
                                  Get Started
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
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
    return <div>{dashboardContent}</div>;
  }
}

Write.prototypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  postOnProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getProfileByHandle,
  postOnProfileByHandle
})(Write);
