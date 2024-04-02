import React from "react";
import { AccountSetup } from "../account/Signup";

function FinishAccountSetup() {
  return (
    <div className="scroll_y">
      <div className="container">
        <h1 className="text-2xl font-bold p-2">Finish Account Setup</h1>
        <AccountSetup />
      </div>
    </div>
  );
}

export default FinishAccountSetup;
