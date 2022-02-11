import React from "react";
import Event from "../pages/Event"
import Login from "../pages/Login"

export interface Routes {
  path: string;
  component: React.ReactElement;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = '/login',
  EVENT = '/event',
}

export const publicRoutes: Routes[] = [
  {
    path: RouteNames.LOGIN,
    component: <Login/>,
  }
]

export const privateRoutes: Routes[] = [
  {
    path: RouteNames.EVENT,
    component: <Event/>,
  }
]

