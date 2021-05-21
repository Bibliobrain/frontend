import { withLoginRequired } from '../../components/hoc/withLoginRequired';
import { withRoleRequired } from '../../components/hoc/withRoleRequired';

const NewLoan = withLoginRequired(
  withRoleRequired('check-out staff', () => {
    return <h1>Loans - New</h1>;
  })
);

export { NewLoan };
