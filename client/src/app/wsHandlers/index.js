export function newSession({ state }, payload) {
  state.set(`data.isObserver`, true);
  state.set(`data.token`, payload.token);
  state.set(`data.sessionId`, payload.id);
  state.set(`data.auth`, true);
  state.set(`data.playground`, payload);
}

export function joinSessionResponse({ state }, data) {
  if (data.success) {
    state.set(`data.auth`, true);
    state.set(`data.isObserver`, false);
    state.set(`data.marks.items`, data.payload.marks);
    state.set(`data.playground`, data.payload);
  } else {
    state.set(`data.auth`, false);
    state.set(`data.isObserver`, false);
    state.set(`data.error`, data.error);
  }
}

export function sendSessionState({ state }, payload) {
  state.set(`data.playground`, payload);
  state.set(`data.playground.storyedit`, payload.currentStory.text);
}

export function sendSessionClosed({ state }, payload) {
  state.set(`data.error`, payload.message);
}
