export function validateSignupData(username, email, password) {
  const errors = [];
  if (!username || username.length < 3)
    errors.push("Username harus minimal 3 karakter.");
  if (!email || !email.includes("@")) errors.push("Email tidak valid.");
  if (!password || password.length < 6)
    errors.push("Password harus minimal 6 karakter.");
  return errors;
}

export function validateVerificationData(email, verificationCode) {
  const errors = [];
  if (!email || !email.includes("@")) errors.push("Email tidak valid.");
  if (!verificationCode) errors.push("Kode verifikasi tidak boleh kosong.");
  return errors;
}

export function validateSigninData(email, password) {
  const errors = [];
  if (!email || !email.includes("@")) errors.push("Email tidak valid.");
  if (!password || password.length < 6)
    errors.push("Password harus minimal 6 karakter.");
  return errors;
}
