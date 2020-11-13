const checkAge = async (rule, value, callback) => {
    if (!value) {
      return Promise.reject('Please input the age');
    }
    if (!Number.isInteger(value)) {
      return Promise.reject('Please input digits');
    } else {
      if (value < 18) {
        return Promise.reject('Age must be greater than 18');
      } else {
        return Promise.resolve();
      }
    }
  };
  const validatePass = async (rule, value) => {
    if (value === '') {
      return Promise.reject('Please input the password');
    } else {
      if (this.ruleForm.checkPass !== '') {
        this.$refs.ruleForm.validateField('checkPass');
      }
      return Promise.resolve();
    }
  };
  const validatePass2 = async (rule, value, callback) => {
    if (value === '') {
      return Promise.reject('Please input the password again');
    } else if (value !== this.ruleForm.pass) {
      return Promise.reject("Two inputs don't match!");
    } else {
      return Promise.resolve();
    }
  };