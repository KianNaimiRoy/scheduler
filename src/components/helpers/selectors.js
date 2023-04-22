export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(stateDay => stateDay.name === day);
  if (filteredDays.length === 0) {
    return [];
  }
  const appointmentArray = filteredDays[0].appointments;
  const fullAppointments = appointmentArray.map((id) => state.appointments[id]);

  return fullAppointments;
}