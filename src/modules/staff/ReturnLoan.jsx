import { withLoginRequired } from '../../components/hoc/withLoginRequired';
import { withRoleRequired } from '../../components/hoc/withRoleRequired';

const ReturnLoan = withLoginRequired(
  withRoleRequired('check-out staff', () => {
    return <h1>Loans - Return</h1>;
  })
);

export { ReturnLoan };
