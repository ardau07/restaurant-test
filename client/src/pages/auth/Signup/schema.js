import * as Yup from 'yup';

function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg,
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, 'equalTo', equalTo);

export default Yup.object().shape({
  firstName: Yup.string().max(255).required('First name is required'),
  lastName: Yup.string().max(255).required('Last name is required'),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  role: Yup.string().required('Role is required'),
  password: Yup.string().max(255).required('Password is required'),
  confirmPassword: Yup.string().max(255).equalTo(Yup.ref('password'), 'Password must be matched'),
});
