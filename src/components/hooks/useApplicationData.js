import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [], //might be better as an object
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  function updateDaySpots(state, appointments) {

    const dayObj = state.days.find(d => d.name === state.day);
    

    let spots = 0;
    for (const id of dayObj.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }

    const day = {...dayObj, spots};
    const newDays = state.days.map(d => d.name === state.day ? day : d);

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
          days: updateDaySpots(state, appointments)
        });
      });
  }

  function cancelInterview(id, interview = null) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, interview)
      .then((response) => {
        setState({
          ...state,
          days: updateDaySpots(state, appointments)
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