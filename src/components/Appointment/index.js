import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Form from "./Form";
import "components/Appointment/styles.scss";
import useVisualMode from "components/hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const interview = props.interview;


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() =>
        transition(SHOW)
      );
  }

  function cancel() {

    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });
  }

  return (
    <article className="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === CONFIRM && (<Confirm
        message={"Are you sure you want to delete this appointment?"}
        onConfirm={cancel}
        onCancel={() => back()}
      />
      )}
      {mode === SAVING && (<Status
        message={"Saving"}
      />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
        )}
      {mode === DELETING && (<Status
        message={"Deleting"}
      />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
    </article>
  );
}