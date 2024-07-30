import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-center" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
