import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class Card extends Component {
  render() {
    const { message } = this.props;
    const messageItem = message.map(skill => (
      <div className="col-md-10" key={skill._id}>
        <div className="card bg-info">
          <div className="card-body">
            <h5 className="card-category card-category-social">
              {moment(skill.time).fromNow()}
            </h5>
            <h4 className="card-title">"{skill.comment}"</h4>
          </div>
        </div>
      </div>
    ));
    return <div className="row justify-content-center">{messageItem}</div>;
  }
}

Card.propTypes = {
  message: PropTypes.array.isRequired
};

export default Card;
