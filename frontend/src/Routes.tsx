import { Route, Switch } from "react-router-dom";
import { LoginSuccess } from "./app/containers/Auth/LoginSuccess";
import { Home } from "./app/containers/Home/Home";
import { Login } from "./app/containers/Auth/Login";
import { Welcome } from "./app/containers/Welcome/Welcome";
import { Reservation } from "./app/containers/Reservation/Reservation";
import { ReservationConfirmation } from "./app/containers/Reservation/ReservationConfirmation";
import { AdminPanel } from "./app/containers/Admin/AdminPanel";
import { Trains } from "./app/containers/Admin/Trains/Trains";
import { EditTrain } from "./app/containers/Admin/Trains/EditTrain";
import { AddTrain } from "./app/containers/Admin/Trains/AddTrain";
import { Registration } from "./app/containers/Auth/Registration";
import { NotFound } from "./app/components/NotFound";
import { Error } from "./app/containers/Auth/Error";
import { UserProfile } from "./app/containers/Profile/UserProfile";
import { TrackTrain } from "./app/containers/Tracking/TrackTrain";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Registration} />
    <Route exact path="/welcome" component={Welcome} />
    <Route exact path="/login/success" component={LoginSuccess} />
    <Route exact path="/login/error" component={Error} />
    <Route exact path="/reservation" component={Reservation} />
    <Route exact path="/tracking" component={TrackTrain} />
    <Route exact path="/confirmation" component={ReservationConfirmation} />
    <Route exact path="/profile" component={UserProfile} />
    <Route exact path="/admin" component={AdminPanel} />
    <Route exact path="/admin/trains" component={Trains} />
    <Route exact path="/admin/trains/new" component={AddTrain} />
    <Route exact path="/admin/trains/:trainId" component={EditTrain} />
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);