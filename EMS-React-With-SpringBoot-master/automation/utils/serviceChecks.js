const AUTH_API_URL = process.env.AUTH_API_URL || 'http://localhost:5001';
const EMPLOYEE_API_URL = process.env.EMPLOYEE_API_URL || 'http://localhost:8080';

async function isAuthApiAvailable(request) {
  try {
    const response = await request.post(`${AUTH_API_URL}/login`, {
      data: {
        email: 'healthcheck@example.com',
        password: 'healthcheck'
      },
      timeout: 3000
    });

    return [200, 401].includes(response.status());
  } catch {
    return false;
  }
}

async function isEmployeeApiAvailable(request) {
  try {
    const response = await request.get(`${EMPLOYEE_API_URL}/ems/EmployeeDetail`, {
      timeout: 3000
    });

    return response.ok();
  } catch {
    return false;
  }
}

module.exports = {
  AUTH_API_URL,
  EMPLOYEE_API_URL,
  isAuthApiAvailable,
  isEmployeeApiAvailable
};
