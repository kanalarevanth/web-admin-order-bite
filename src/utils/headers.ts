export const checkResponseHeaders = (res: Response) => {
  return {
    sessionExpired: res.headers.get("session_expired"),
    forbidden: res.headers.get("forbidden"),
  };
};

export const handleResHeaders = (res: Response) => {
  const headers = checkResponseHeaders(res);

  if (headers.sessionExpired) {
    handleSessionExpired();
  }
  if (headers.forbidden) {
    handleForbidden();
  }
};

const handleSessionExpired = () => {
  window.location.href = "/auth/login";
};

const handleForbidden = () => {
  alert("Permission denied");
  setTimeout(() => {
    window.location.href = "/";
  }, 500);
};
