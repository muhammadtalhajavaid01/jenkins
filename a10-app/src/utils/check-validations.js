// validation checks

const checkValue = (value) => {
  if(!value)
    return 'Must provide the value'
}

const optional = op => value =>
  !op ? checkValue(value) : undefined

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

const minimum = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

const maximum = max => value =>
  value && value > max ? `Must be at most ${max}` : undefined

// defined rules
const rules = { minimum, maximum, minLength, maxLength, optional };

// Applying all the validation rules defined.
export const applyRules = checkRules => {
  let validations = [];
  for(let ruleName in checkRules) {
    let ruleFunc = rules[ruleName]
    if(ruleFunc) {
      validations.push(ruleFunc(checkRules[ruleName]));
    }
  }
  return validations;
}
