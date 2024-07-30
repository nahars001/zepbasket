const forgotPassMailTemplate = (user, token) => {
  const firstName = user.name.split(" ");
  let resetURL = "";
  if (process.env.NODE_ENV == "production") {
    resetURL = `${process.env.FRONTEND_URL}/password/reset/${token}`;
  } else {
    resetURL = `${process.env.FRONTEND_URL}/api/v1/auth/password/reset/${token}`;
  }
  return `<div>
        <p>Dear ${firstName}</p>

        <p>
          Your Password Reset Link :
          <a
            href="${resetURL}"
          >
            ${resetURL}
          </a>
        </p>

        <p>Thanks</p>
      </div>`;
};

export { forgotPassMailTemplate };
