import * as yup from 'yup';
import { EMAIL_REGEX } from '@/constants/regex';

export const createLoginStep1Schema = (t: (key: string) => string) => {
  return yup.object({
    email: yup
      .string()
      .required(t('validateMsg.auth.emailIsRequired'))
      .email(t('validateMsg.auth.emailIsInvalid'))
      .matches(EMAIL_REGEX, t('validateMsg.auth.emailIsInvalid'))
      .max(254, t('validateMsg.auth.maxLengthEmail')),
  });
};

export const createNameAuthSchema = (t: (key: string) => string) => {
  return yup.object({
    first_name: yup
      .string()
      .required(t('validateMsg.auth.firstNameRequire'))
      .matches(/^[A-Za-z]+$/, t('validateMsg.auth.alphabetOnly'))
      .max(50, t('validateMsg.auth.maxLengthFistName')),
    last_name: yup
      .string()
      .required(t('validateMsg.auth.lastNameRequire'))
      .matches(/^[A-Za-z]+$/, t('validateMsg.auth.alphabetOnly'))
      .max(50, t('validateMsg.auth.maxLengthLastName')),
  });
};
