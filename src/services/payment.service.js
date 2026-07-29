import { INITIAL_PAYMENTS } from "@/constants";

export function getPayments() {
  return Promise.resolve(INITIAL_PAYMENTS);
}

export function sendPaymentReminder(studentName) {
  return Promise.resolve({ success: true, studentName });
}
