import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
import Loader from "../common/Loading";
import { city, avatar } from "../../assets/img";
import Card from "./card";

const cover = {
  backgroundImage: `url(${city})`,
  backgroundSize: "cover",
  backgroundPosition: "top center"
};
class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    document.title = "View Profile || Bportfolio";
  }
  render() {
    const { message, loading } = this.props.profile;
    const { user } = this.props.auth;
    const host = window.location.hostname;

    let ProfileContent;

    if (message === null || loading) {
      ProfileContent = <Loader />;
    } else {
      if (message.length > 0) {
        // Display profile
        ProfileContent = (
          <div className="profile-page">
            <div
              className="page-header header-filter"
              data-parallax="true"
              style={cover}
            ></div>
            <div className="main main-raised">
              <div className="profile-content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 ml-auto mr-auto">
                      <div className="profile">
                        <div className="avatar">
                          <img
                            src={avatar}
                            alt="Circle"
                            className="img-raised rounded-circle img-fluid"
                          />
                        </div>
                        <div className="name">
                          <h3 className="title">{user.username}</h3>
                        </div>
                        <br />
                      </div>

                      <div className="follow">
                        <a
                          href={`https://www.addtoany.com/share#url=http://${host}/write/${user.username}`}
                          className="btn btn-fab btn-primary btn-round"
                          rel="tooltip noopener noreferrer"
                          target="_blank"
                          title="Share portfolio"
                        >
                          <i className="material-icons">share</i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Card message={message} />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // User is logged in but not have any profile
        ProfileContent = (
          <div className="profile-page">
            <div
              className="page-header header-filter"
              data-parallax="true"
              style={cover}
            ></div>
            <div className="main main-raised">
              <div className="profile-content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 ml-auto mr-auto">
                      <div className="profile">
                        <div className="avatar">
                          <img
                            src={avatar}
                            alt="Circle"
                            className="img-raised rounded-circle img-fluid"
                          />
                        </div>
                        <div className="name">
                          <h3 className="title">{user.username}</h3>
                        </div>
                        <h4 className="description">
                          You Don't have any message
                        </h4>
                        <br />
                      </div>

                      <div className="follow">
                        <a
                          href={`https://www.addtoany.com/share#url=http://${host}/write/${user.username}`}
                          className="btn btn-fab btn-primary btn-round"
                          rel="tooltip noopener noreferrer"
                          target="_blank"
                          title="Share portfolio"
                        >
                          <i className="material-icons">share</i>
                        </a>
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

    return <div>{ProfileContent}</div>;
  }
}

Profile.prototypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
