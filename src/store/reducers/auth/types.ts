import { User } from "../../../models/User";

export interface AuthState {
  isAuth: boolean;
  user: User;
  isLoading: boolean;
  error: string;
}

export enum AuthActions {
  SET_AUTH = "SET_AUTH",
  SET_ERROR = "SET_ERROR",
  SET_LOADING = "SET_ALOADING",
  SET_USER = "SET_USER"
}

export interface SetAuthAction {
  type: AuthActions.SET_AUTH;
  payload: boolean;
}

export interface SetUserAction {
  type: AuthActions.SET_USER;
  payload: User;
}

export interface SetErrorAction {
  type: AuthActions.SET_ERROR;
  payload: string;
}

export interface SetLoadingAction {
  type: AuthActions.SET_LOADING;
  payload: boolean;
}

export type AuthAction = SetAuthAction | SetUserAction | SetErrorAction | SetLoadingAction
