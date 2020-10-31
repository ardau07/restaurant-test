import * as Yup from 'yup';

export default Yup.object().shape({
  reply: Yup.string().required('Reply is required'),
});
