import { User } from "../models/User";
import axios, { AxiosResponse } from "axios";

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<User[]>> {
    return axios.get<User[]>('./users.json')
  }
}

