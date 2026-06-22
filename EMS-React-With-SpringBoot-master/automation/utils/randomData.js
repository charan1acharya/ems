let counter = 0;

function uniqueSuffix() {
  counter += 1;
  return `${Date.now()}${counter}`;
}

function uniqueEmail(prefix = 'employee', domain = 'example.com') {
  return `${prefix}.${uniqueSuffix()}@${domain}`;
}

function uniqueEmployee(overrides = {}) {
  const suffix = uniqueSuffix();

  return {
    firstname: overrides.firstname || `Auto${suffix}`,
    lastname: overrides.lastname || 'Employee',
    email: overrides.email || uniqueEmail('auto.employee')
  };
}

module.exports = {
  uniqueSuffix,
  uniqueEmail,
  uniqueEmployee
};
