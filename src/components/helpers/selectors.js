export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(stateDay => stateDay.name === day);
  if (filteredDays.length === 0) {
    return [];
  }
  const appointmentArray = filteredDays[0].appointments;
  const fullAppointments = appointmentArray.map((id) => state.appointments[id]);

  return fullAppointments;
}

export function getInterview(state, interview) {

  
  if (!interview || !interview.interviewer) {
    return null;
  }

  const interviewerID = interview.interviewer;

  const interviewer = state.interviewers[interviewerID];
  // const interviewerObject = state.interviewers[interviewerID];<--Why no work?

  return { ...interview, interviewer};
  // return { ...interview, interviewer: interviewerObject }; <--WHy doesn't this work?
}