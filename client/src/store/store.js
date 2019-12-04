import { createStore } from 'redux';

import setState from '../reducer/reducer';

export default createStore(setState);