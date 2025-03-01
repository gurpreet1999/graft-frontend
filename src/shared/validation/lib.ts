import {
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import { postcodeValidator } from "postcode-validator";

type Value =
  | string
  | string[]
  | ISuggestion
  | ISuggestion[]
  | boolean
  | undefined;

type ValidatorFunction = (
  value: Value,
  suggestions?: IExperienceData
) => string[];

export class Validation {
  static validateFields<T extends Record<string, Value>>(
    fields: FormField<T>[],
    formState: Partial<T>,
    suggestions?: IExperienceData
  ): { errorsState: Record<keyof T, string[]>; areErrorsFound: boolean } {
    const errors = {} as Record<keyof T, string[]>;
    let areErrorsFound = false;

    fields.forEach((field) => {
      if (!field.validator) return;
      const errorMessages = Validation.getErrorMessages(
        formState[field.name],
        field.validator as ValidatorFunction,
        suggestions
      );

      if (errorMessages.length > 0) {
        errors[field.name] = errorMessages;
        areErrorsFound = true;
      } else {
        errors[field.name] = [];
      }
    });

    return {
      errorsState: errors,
      areErrorsFound,
    };
  }

  static getErrorMessages(
    value: Value,
    validator: ValidatorFunction,
    suggestions?: IExperienceData
  ): string[] {
    return validator(value, suggestions);
  }

  static validateAutocomplete(
    text: ISuggestion,
    suggestions?: IExperienceData
  ): string[] {
    const errors: string[] = [];
    if (suggestions) {
      const allValues = Object.values(suggestions)
        .flat()
        .map((suggestion) => suggestion.value);
      const textValues = Array.isArray(text) ? text : [text];
      if (!textValues.every((value) => allValues.includes(value.value))) {
        errors.push("Please select from the list");
      }
    }
    return errors;
  }

  static validateAutocompleteOptional(
    text: ISuggestion,
    suggestions?: IExperienceData
  ): string[] {
    return text.id !== "any"
      ? Validation.validateAutocomplete(text, suggestions)
      : [];
  }

  static validateMulticomplete(
    values: ISuggestion[],
    suggestions?: IExperienceData
  ): string[] {
    const errors: string[] = [];
    if (values.length === 0) {
      errors.push("Please select at least one value");
    }
    if (suggestions) {
      const allValues = Object.values(suggestions)
        .flat()
        .map((suggestion) => suggestion.value);
      values.forEach((value) => {
        if (!allValues.includes(value.value)) {
          errors.push("Please select from the list");
        }
      });
    }
    return errors;
  }

  static validateMulticompleteOptional(
    values: ISuggestion[],
    suggestions?: IExperienceData
  ): string[] {
    if (!values) return [];
    return values?.find((value) => value.id === "any")
      ? []
      : Validation.validateMulticomplete(values, suggestions);
  }

  static validateName(text: string): string[] {
    const errors: string[] = [];
    if (text.length < 3) {
      errors.push("Name is too short");
    }
    if (text.length > 48) {
      errors.push("Name is too long");
    }
    if (/[\u0400-\u04FF]+/.test(text)) {
      errors.push("Cyrillic characters are not allowed");
    }
    if (/\d/.test(text)) {
      errors.push("Numbers are not allowed");
    }
    if (/\s/.test(text)) {
      errors.push("First name should not contain spaces");
    }
    if (!/^[a-zA-Z]+$/.test(text)) {
      errors.push("Special characters are not allowed");
    }
    return errors;
  }

  static validateLastName(text: string): string[] {
    const errors: string[] = [];
    if (text.length < 3) {
      errors.push("Last name is too short");
    }
    if (text.length > 48) {
      errors.push("Last name is too long");
    }
    if (/[\u0400-\u04FF]+/.test(text)) {
      errors.push("Cyrillic characters are not allowed");
    }
    if (/\d/.test(text)) {
      errors.push("Numbers are not allowed");
    }
    if (/\s/.test(text)) {
      errors.push("Last name should not contain spaces");
    }
    if (!/[a-zA-Z]/.test(text)) {
      errors.push("Last name must contain at least one alphabetic character");
    }
    return errors;
  }

  static validateEmail(email: string): string[] {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email is not valid");
    }
    return errors;
  }

  static validateLoginPassword(password: string): string[] {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("Minimum 8 character length");
    }
    return errors;
  }

  static validatePassword(password: string): string[] {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("Minimum 8 character length");
    }
    if (!password.match(/[a-z]/)) {
      errors.push("At least 1 letter lower case (a-z)");
    }
    if (!password.match(/[A-Z]/)) {
      errors.push("At least 1 letter upper case (A-Z)");
    }
    if (!password.match(/[0-9]/)) {
      errors.push("At least 1 number (0-9)");
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
      errors.push("At least one special symbol");
    }
    return errors;
  }

  static validatePhone(phone: string): string[] {
    const errors: string[] = [];

    if (!/^\+?\d+$/.test(phone)) {
      errors.push("Please enter your phone number without spaces");
      return errors;
    }

    const phoneWithoutPlus = phone.replace("+", "");
    const lengthError = validatePhoneNumberLength(phoneWithoutPlus, "GB");

    if (lengthError === "INVALID_COUNTRY") {
      errors.push("Invalid country");
    }
    if (!isValidPhoneNumber(phone, "GB")) {
      errors.push("Phone number is not valid");
      return errors;
    }
    if (lengthError === "TOO_SHORT" || phone.length < 8) {
      errors.push("Phone number is too short");
    }
    if (lengthError === "TOO_LONG") {
      errors.push("Phone number is too long");
    }
    return errors;
  }

  static validatePostalCode(postalCode: string): string[] {
    const errors: string[] = [];
    if (!postcodeValidator(postalCode, "UK")) {
      errors.push("Postal code is not valid");
    }
    return errors;
  }

  static validatePostalCodeOptional(postalCode: string): string[] {
    return postalCode.length > 0
      ? Validation.validatePostalCode(postalCode)
      : [];
  }

  static validateDistance(text: string): string[] {
    const errors: string[] = [];
    if (isNaN(Number(text))) {
      errors.push("Distance is not a number");
    }
    if (Number(text) < 0) {
      errors.push("Distance can't be negative");
    }
    if (Number(text) > 100) {
      errors.push("Distance is too long");
    }
    return errors;
  }

  static validateDistanceOptional(text: string): string[] {
    return text.length > 0 ? Validation.validateDistance(text) : [];
  }

  static validateText(text: string): string[] {
    const errors: string[] = [];
    if (text.length < 1) {
      errors.push("Text is too short");
    }
    if (text.length > 48) {
      errors.push("Text is too long");
    }
    if (/[\u0400-\u04FF]+/.test(text)) {
      errors.push("Cyrillic characters are not allowed");
    }
    return errors;
  }

  static validateTextOptional(text: string): string[] {
    return text.length > 1 ? Validation.validateText(text) : [];
  }

  static validateCompany(text: string): string[] {
    const errors: string[] = [];
    if (text.length < 1) {
      errors.push("Please fill in Company Name");
    }
    if (text.length > 48) {
      errors.push("Company Name is too long");
    }
    return errors;
  }

  static validateRateOfPay(text: string): string[] {
    const errors: string[] = [];
    if (isNaN(Number(text))) {
      errors.push("Rate of pay is not a number");
    }
    if (Number(text) === 0) {
      errors.push("Please fill in Rate of pay");
    }
    if (Number(text) < 0) {
      errors.push("Rate of pay can't be negative");
    }
    if (Number(text) > 1000) {
      errors.push("Rate of pay is too high");
    }
    return errors;
  }

  static validateLocation(text: string): string[] {
    const errors: string[] = [];
    if (text.length < 1) {
      errors.push("Please fill in Location");
    }
    if (text.length > 48) {
      errors.push("Location is too long");
    }
    return errors;
  }

  static validateRole(text: string): string[] {
    const errors: string[] = [];
    if (text.length < 1) {
      errors.push("Please fill in Role");
    }
    if (text.length > 48) {
      errors.push("Role is too long");
    }
    return errors;
  }

  static validateCode(text: string): string[] {
    const errors: string[] = [];
    if (text.length < 4) {
      errors.push("Please fill in Code");
    }
    if (text.length > 4) {
      errors.push("Code is too long");
    }
    return errors;
  }
}
