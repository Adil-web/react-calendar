import axios from "axios";
import { AppDispatch } from "../..";
import { IEvent } from "../../../models/IEvent";
import { User } from "../../../models/User";
import { EventActionEnum, SetEventsAction, SetGuestsAction } from "./types";

export const EventActionCreators = {
  setGuests: (payload: User[]): SetGuestsAction => ({
    type: EventActionEnum.SET_GUESTS,
    payload,
  }), 
  setEvents: (payload: IEvent[]): SetEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload,
  }), 
  fetchUsers: () => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get('./users.json')
      dispatch(EventActionCreators.setGuests(response.data))
    } catch (error) {
      console.log(error)
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]'
      const json = JSON.parse(events) as IEvent[]
      json.push(event)
      dispatch(EventActionCreators.setEvents(json))
      localStorage.setItem('events', JSON.stringify(json))
    } catch (error) {
      console.log(error)
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]'
      const json = JSON.parse(events) as IEvent[]
      const currentUserEvents = json.filter(event => event.author === username || event.guest === username)
      dispatch(EventActionCreators.setEvents(currentUserEvents))
    } catch (error) {
      console.log(error);
    }
  }
}
