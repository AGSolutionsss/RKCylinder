import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Navbar extends Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }

	logoutUser(e) {
		e.preventDefault();
		localStorage.clear();
		window.location = "/login";
	}

  render () {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/dashboard"><img src={require('../../assets/images/logo_dashboard.png')} alt="logo" /></Link>
          <Link className="navbar-brand brand-logo-mini" to="/dashboard"><img src={require('../../assets/images/logo_mini_dashboard.png')} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          
          <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link">
                  <div className="nav-profile-img">
                    <img src={require("../../assets/images/faces/face1.jpg")} alt="user"/>
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black"><Trans>{localStorage.getItem('username')}</Trans></p>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-dropdown">
                  <Dropdown.Item href="change-password">
                    <i className="mdi mdi-account mr-2 text-success"></i>
                    <Trans>Password</Trans>
                  </Dropdown.Item>
                  <Dropdown.Item href="!#" onClick={(e) => this.logoutUser(e)}>
                    <i className="mdi mdi-logout mr-2 text-primary"></i>
                    <Trans>Signout</Trans>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
