import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/advanced-ui', state: 'advancedUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/maps', state: 'mapsMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt =>evt.preventDefault()}>
              <div className="nav-profile-image">
                <img src={ require("../../assets/images/faces/face1.jpg") } alt="profile" />
                <span className="login-status online"></span>
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2"><Trans>{localStorage.getItem('full_name')}</Trans></span>
                <span className="text-secondary text-small"><Trans></Trans></span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          
          <li className={ this.isPathActive('/manufacturer') ? 'nav-item active' : this.isPathActive('/addManufacturer') ? 'nav-item active' : this.isPathActive('/vendor') ? 'nav-item active' : this.isPathActive('/addVendor') ? 'nav-item active' : this.isPathActive('/vehicleType') ? 'nav-item active' : this.isPathActive('/addVehicleType') ? 'nav-item active' : this.isPathActive('/team') ? 'nav-item active' : this.isPathActive('/addTeam') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>Master</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account menu-icon"></i>
            </div>
            <Collapse in={ this.state.basicUiMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/manufacturer') ? 'nav-link active' : this.isPathActive('/addManufacturer') ? 'nav-link active' : 'nav-link' } to="/manufacturer"><Trans>Manufacturer</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/vendor') ? 'nav-link active' : this.isPathActive('/addVendor') ? 'nav-link active' : 'nav-link' } to="/vendor"><Trans>Vendor</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/cylinder') ? 'nav-item active' : this.isPathActive('/addCylinder') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/cylinder">
              <span className="menu-title"><Trans>Cylinder</Trans></span>
              <i className="mdi mdi-security menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/viewCylinder') ? 'nav-item active' : this.isPathActive('/viewCylinder') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/viewCylinder">
              <span className="menu-title"><Trans>View Cylinder</Trans></span>
              <i className="mdi mdi-contacts menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/reportVendor') ? 'nav-item active' : this.isPathActive('/reportManufacturer') ? 'nav-item active' : this.isPathActive('/formCylinder') ? 'nav-item active' : this.isPathActive('/reportCylinder') ? 'nav-item active': this.isPathActive('/formCylinderDetails') ? 'nav-item active' : this.isPathActive('/reportCylinderDetails') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>Reports</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-file menu-icon"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/reportVendor') ? 'nav-link active' : this.isPathActive('/reportVendor') ? 'nav-link active' : 'nav-link' } to="/reportVendor">Vendor</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/reportManufacturer') ? 'nav-link active' : this.isPathActive('/reportManufacturer') ? 'nav-link active' : 'nav-link' } to="/reportManufacturer">Manufacturer</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/formCylinder') ? 'nav-link active' : this.isPathActive('/formCylinder') ? 'nav-link active' : 'nav-link' } to="/formCylinder">Cylinder</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/formCylinderDetails') ? 'nav-link active' : this.isPathActive('/formCylinderDetails') ? 'nav-link active' : 'nav-link' } to="/formCylinderDetails">Cylinder Details</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/reportForm') ? 'nav-link active' : this.isPathActive('/reportForm') ? 'nav-link active' : 'nav-link' } to="/reportForm">Report</Link></li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);