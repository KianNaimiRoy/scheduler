import React from "react";

import { render, cleanup } from "@testing-library/react";

// import { fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

const { getByPlaceholderText } = render(
  <Form interviewers={interviewers}/>);
  
  const { getByTestId } = render(
    <Form interviewers={interviewers} name="Lydia Miller-Jones" />
);
afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
});



// /* within a test */
// fireEvent.click(getByText("Save"));


it("validates that the student name is not blank", () => {
  /* 1. validation is shown */
  expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

  /* 2. onSave is not called */
  expect(onSave).not.toHaveBeenCalled();
});

it("validates that the interviewer cannot be null", () => {
  /* 3. validation is shown */
  expect(getByText(/please select an interviewer/i)).toBeInTheDocument();

  /* 4. onSave is not called */
  expect(onSave).not.toHaveBeenCalled();
});

it("calls onSave function when the name is defined", () => {
  /* 5. validation is not shown */
  expect(queryByText(/student name cannot be blank/i)).toBeNull();
  expect(queryByText(/please select an interviewer/i)).toBeNull();

  /* 6. onSave is called once*/
  expect(onSave).toHaveBeenCalledTimes(1);

  /* 7. onSave is called with the correct arguments */
  expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
});