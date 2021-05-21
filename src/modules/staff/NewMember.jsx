import { withLoginRequired } from '../../components/hoc/withLoginRequired';
import { withRoleRequired } from '../../components/hoc/withRoleRequired';

const NewMember = withLoginRequired(
  withRoleRequired('reference librarian', () => {
    return <h1>Members - New</h1>;
  })
);

export { NewMember };
