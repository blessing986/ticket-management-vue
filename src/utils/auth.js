export function getSession() {
  const session = localStorage.getItem("ticketapp_session");
  return session ? JSON.parse(session) : null;
}

export function setSession(token, user) {
  localStorage.setItem("ticketapp_session", JSON.stringify({ token, user }));
}

export function clearSession() {
  localStorage.removeItem("ticketapp_session");
}

export function isAuthenticated() {
  return !!getSession();
}
