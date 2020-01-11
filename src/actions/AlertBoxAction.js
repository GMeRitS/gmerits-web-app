import AlertBoxConstants from '../constants/AlertBoxConstants';

const { DISPLAY_ALERT, HIDE_ALERT } = AlertBoxConstants;

export const alertBoxDisplay = alertOptions => ({
  type: DISPLAY_ALERT,
  payload: { alertOptions }
});

export const alertBoxHide = () => ({
  type: HIDE_ALERT
});

export default {
  alertBoxDisplay,
  alertBoxHide
};
