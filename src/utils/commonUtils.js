// Expresiones regulares para validación

/* 
    Verifica que comience con caracteres alfanuméricos, permita puntos, guiones bajos y guiones, 
    seguidos de un símbolo "@" y un dominio de correo electrónico válido.
*/
const emailValidationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

/* 
    Valida que el nombre de usuario contenga entre 3 y 20 caracteres alfanuméricos o guiones bajos.
*/
const usernameValidationRegex = /^[a-zA-Z0-9_]{3,20}$/;

/* 
    Valida que la contraseña tenga al menos 8 caracteres, contenga al menos un número, 
    una letra minúscula y una letra mayúscula.
*/
const passwordValidationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

/* 
    Valida un número de teléfono internacional con un código de país. Esta expresión permite dígitos 
    y espacios en blanco y requiere al menos 10 dígitos.
*/
const phoneValidationRegex = /^\+(?:\d\s?){10,14}\d$/;

/* 
    Valida que la contraseña tenga al menos 8 caracteres, contenga al menos un número, 
    una letra minúscula y una letra mayúscula.
*/
const birthdateValidationRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

/* 
    Valida que la contraseña tenga al menos 8 caracteres, contenga al menos un número, 
    una letra minúscula y una letra mayúscula.
*/
const postalcodeValidationRegex = /^\d{5}(?:-\d{4})?$/;