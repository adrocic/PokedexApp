import axios from 'axios';
import { debounce } from 'lodash';

const showValidationErrors = (form, postedValues, axiosError) => {
  const response = axiosError.response;
  if (response.status === 422) {
    const messages = response.data.error.validation_messages;
    const formattedMessages = formatValidationMessages(postedValues, messages);
    form.setFields(formattedMessages);
  }
  return Promise.reject(axiosError);
};

const formatValidationMessages = (postedValues, messages) =>
  Object
    .keys({ ...postedValues, ...messages })
    .reduce(
      (accumErrors, fieldName) => {

        const newAccum = {
          ...accumErrors,
          [fieldName]: {
            value: postedValues[fieldName],
          }
        };

        const fieldErrors = messages[fieldName] && messages[fieldName].map(msg => new Error(msg));
        if (fieldErrors) {
          newAccum[fieldName].errors = fieldErrors;
        }

        return newAccum;
      },
      {})

function createServerValidator ({ form, serialize = vs => vs, url, debounceTimeout = 1000 }) {

  const serverValidatedFields = {};

  let disabled = false;

  function serverValidator(fieldName, { validateWith = [] } = {}) {

    // Create or update validator config in case it has changed since last render
    upsertServerValidatedField(fieldName, { validateWith });

    return function (rule, value, callback, source, options) {

      // If the form is submitting then server-side validation will happen with normal
      // form request, so no need to validate here.
      if (disabled) {
        callback([]);
        return;
      }

      serverValidatedFields[fieldName].callback = callback;
      serverValidatedFields[fieldName].validate();
    }
  }

  serverValidator.disable = () => disabled = true;
  serverValidator.enable = () => disabled = false;

  return serverValidator;

  function buildFieldAndDependencies (fieldName, values = { 'VALIDATE_ONLY': true }) {
    if (values.hasOwnProperty(fieldName)) {
      return values;
    }
    values[fieldName] = form.getFieldValue(fieldName);

    const validateWith = serverValidatedFields[fieldName].validateWith;
    if (validateWith) {
      validateWith.forEach(f => buildFieldAndDependencies(f, values))
    }
    return values;
  }

  function upsertServerValidatedField(fieldName, { validateWith }) {
    let fieldConfig = serverValidatedFields[fieldName];
    if (fieldConfig) {
      fieldConfig.validateWith = fieldConfig.validateWith || validateWith;
    } else {
      serverValidatedFields[fieldName] = fieldConfig = {};

      fieldConfig.validateWith = fieldConfig.validateWith || validateWith;

      fieldConfig.validate = debounce(function postValidate () {
        const { callback } = serverValidatedFields[fieldName];
        const formValues = buildFieldAndDependencies(fieldName);

        if (disabled) {
          callback([]);
          return;
        }

        const mungedValues = serialize(formValues);

        axios.post(url, mungedValues)
          .then(() => callback([]))
          .catch(axiosError => {
            const response = axiosError.response;
            if (response.status !== 422) {
              callback([]);
              return;
            }

            const messages = response.data.error.validation_messages;
            const formattedMessages = formatValidationMessages(formValues, messages);
            callback(formattedMessages[fieldName].errors || []);
            
            // Update the dependent fields too
            const toSet = {};
            updateDependentFields(fieldName);
            function updateDependentFields (fieldName) {
              if (toSet.hasOwnProperty(fieldName)) {
                return toSet;
              }
              toSet[fieldName] = formattedMessages[fieldName];

              const validateWith = serverValidatedFields[fieldName].validateWith;
              if (validateWith) {
                validateWith.forEach(updateDependentFields)
              }
            }

            delete toSet[fieldName];// remove the redundant field

            form.setFields(toSet);
          })
      }, debounceTimeout, { leading: false, trailing: true });
    }
  }
}
export {
  formatValidationMessages,
  showValidationErrors,
  createServerValidator
};
