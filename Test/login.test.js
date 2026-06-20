function validateLogin(email, password) {
    return email.length > 0 &&
           password.length > 0 &&
           email.includes('@');
}

test('valid login credentials', () => {
    expect(
        validateLogin('user@example.com', 'password123')
    ).toBe(true);
});

test('empty email should fail', () => {
    expect(
        validateLogin('', 'password123')
    ).toBe(false);
});

test('empty password should fail', () => {
    expect(
        validateLogin('user@example.com', '')
    ).toBe(false);
});

test('invalid email should fail', () => {
    expect(
        validateLogin('userexample.com', 'password123')
    ).toBe(false);
});