import React from "react";
import "../../styles/components/GetStartedForm.css";

function GetStartedForm({ handleChange, handleSubmit }) {
  return (
    <form className="get-started-form" onSubmit={handleSubmit}>
      <input
        className="auth-input"
        id="gs-email"
        name="email"
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        onChange={handleChange}
        required
      />
      <button className="button" id="auth-form-button" type="submit">
        Get Started
      </button>
    </form>
  );
}

export default GetStartedForm;
