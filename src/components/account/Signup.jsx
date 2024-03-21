import React, { useState } from "react";
import { snakeCaseToTitleCase } from "../../assets/utils";
import { InputField } from "../InputField";

function Signup() {
  const [formData, setFormData] = useState({ name: "John" });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const registrationFields = {
    phase1: ["name", "username", "email", "password", "confirm_password"],
  };

  return (
    <div>
      <form className="p-6">
        <InputField
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Full Name"
        />
      </form>
    </div>
  );
}

export default Signup;
