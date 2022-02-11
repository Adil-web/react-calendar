import { AppDispatch } from './../../index';
import { User } from "../../../models/User";
import { AuthActions, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction } from "./types";
import UserService from '../../../api/UserService';

export const AuthActionCreators = {
  setAuth: (isAuth: boolean): SetAuthAction => ({type: AuthActions.SET_AUTH, payload: isAuth}),
  setUser: (user: User): SetUserAction => ({type: AuthActions.SET_USER, payload: user}),
  setLoading: (isLoading: boolean): SetLoadingAction => ({type: AuthActions.SET_LOADING, payload: isLoading}),
  setError: (error: string): SetErrorAction => ({type: AuthActions.SET_ERROR, payload: error}),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setLoading(true))
      setTimeout(async () => {
        const response = await UserService.getUsers()
        const mockUser = response.data.find(user => user.username === username && user.password === password)
        if(mockUser) {
          localStorage.setItem('auth', 'true')
          localStorage.setItem('username', mockUser.username)
          dispatch(AuthActionCreators.setUser(mockUser))
          dispatch(AuthActionCreators.setAuth(true))
        } else {
          dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
        }
        dispatch(AuthActionCreators.setLoading(false))
      }, 1000);
    } catch (error) {
      dispatch(AuthActionCreators.setError("Произошла ошибка при авторизации!"))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
    dispatch(AuthActionCreators.setUser({} as User))
    dispatch(AuthActionCreators.setAuth(false))
  }
}
