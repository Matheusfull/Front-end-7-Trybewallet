import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    /* console.log(email); */
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.use);
  return {
    email: state.user.email,
  };
};

Header.propTypes = {
  /* user: PropTypes.objectOf(PropTypes.string).isRequired, */
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
