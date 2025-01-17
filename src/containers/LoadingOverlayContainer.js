import _ from 'lodash';
import { connect } from 'react-redux';

import LoadingOverlay from '../components/Common/LoadingOverlay';

function mapStateToProps(state) {
  const reducers = _.pick(state, ['Auth', 'User', 'Organization', 'Schedule']);

  return {
    loading: _.some(reducers, reducer => reducer.loading)
  };
}

export default connect(mapStateToProps)(LoadingOverlay);
