import * as Yup from 'yup';

export default Yup.object().shape({
  ownerId: Yup.string().required('Restaurant Owner is required'),
  name: Yup.string().required('Restaurant name is required'),
});
