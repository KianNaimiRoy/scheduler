import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [], //might be better as an object
    appointments: {},
    interviewers: {},
    spots: 5
  });

  const setDay = day => setState({ ...state, day });

  function updateDaySpots(ammount) {
    const newDays = [...state.days];
    const currentDay = newDays.find((day) => {
      return state.day === day.name;
    });
    currentDay.spots = currentDay.spots + ammount;
    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments: appointments,
          days: updateDaySpots(-1)
        });
      });
  }

  function cancelInterview(id, interview = null) {
    return axios.delete(`/api/appointments/${id}`, interview)
      .then((response) => {
        setState({
          ...state,
          days: updateDaySpots(+1)
        });
      });
  }

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

    axios.get(`/api/days`)
      .then((response) => {
      });
  }, []);

  return { setDay, state, bookInterview, cancelInterview };
}