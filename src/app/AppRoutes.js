import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Login = lazy(() => import('./login/Login'));
const ForgetPassword = lazy(() => import('./login/ForgetPassword'));
const ChangePassword = lazy(() => import('./login/ChangePassword'));
const NewListManufacturer = lazy(() => import('./manufacturer/listings'));
const AddManufacturer = lazy(() => import('./manufacturer/AddManufacturer'));
const EditManufacturer = lazy(() => import('./manufacturer/EditManufacturer'));
const NewListVendor = lazy(() => import('./vendor/listings'));
const AddVendor = lazy(() => import('./vendor/AddVendor'));
const EditVendor = lazy(() => import('./vendor/EditVendor'));
const NewListCylinder = lazy(() => import('./cylinder/listings'));
const AddCylinder = lazy(() => import('./cylinder/AddCylinder'));
const EditCylinder = lazy(() => import('./cylinder/EditCylinder'));
const ViewCylinder = lazy(() => import('./cylinder/ViewCylinder'));
const vendorReport = lazy(() => import('./reports/vendor/vendorReport'));
const ManufacturerReport = lazy(() => import('./reports/manufacturer/manufacturerReport'));
const CylinderForm = lazy(() => import('./reports/cylinder/cylinderForm'));
const CylinderReport = lazy(() => import('./reports/cylinder/cylinderReport'));
const CylinderDetailsForm = lazy(() => import('./reports/cylinderDetails/cylinderDetailsForm'));
const CylinderDetailsReport = lazy(() => import('./reports/cylinderDetails/cylinderDetailsReport'));
const AddCylinderSub = lazy(() => import('./cylinder/AddCylinderSub'));
const ReportForm = lazy(() => import('./reports/report/reportForm'));
const Report1 = lazy(() => import('./reports/report/report1'));
const Report2 = lazy(() => import('./reports/report/report2'));
const Error404 = lazy(() => import('./error/Error404'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/login" component={ Login } />
          <Route  path="/forget-password" component={ ForgetPassword } />
          <Route  path="/change-password" component={ ChangePassword } />
          <Route  path="/manufacturer" component={ NewListManufacturer } />
          <Route  path="/addManufacturer" component={ AddManufacturer } />
          <Route  path="/manufacturerEdit/:id" component={ EditManufacturer } />
          <Route  path="/vendor" component={ NewListVendor } />
          <Route  path="/addVendor" component={ AddVendor } />
          <Route  path="/vendorEdit/:id" component={ EditVendor } />
          <Route  path="/cylinder" component={ NewListCylinder } />
          <Route  path="/addCylinder" component={ AddCylinder } />
          <Route  path="/cylinderEdit/:id" component={ EditCylinder } />
          <Route  path="/cylinderSub/:id"  component={ AddCylinderSub } />
          <Route  path="/viewCylinder" component={ ViewCylinder }/>
          <Route  path="/reportVendor" component={ vendorReport }/>
          <Route  path="/reportManufacturer" component={ ManufacturerReport }/>
          <Route  path="/formCylinder" component={ CylinderForm }/>
          <Route  path="/reportCylinder" component={ CylinderReport }/>
          <Route  path="/formCylinderDetails" component={ CylinderDetailsForm }/>
          <Route  path="/reportForm" component={ ReportForm }/>
          <Route  path="/report1" component={ Report1 }/>
          <Route  path="/report2" component={ Report2 }/>
          <Route  path="/reportCylinderDetails" component={ CylinderDetailsReport }/>
          <Route  path="*" component={ Error404 } />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;