import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_USER_LOAD,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
} from 'containers/User/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
	user: {},
	loading: false,
	error: undefined,
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	
	case GET_USER_LOAD:
		return state.merge({
			loading: true,
			error: undefined,
			user: {},
		});	
	case GET_USER_SUCCESS:
		return state.merge({
			loading: false,
			error: undefined,
			user: action.result
		});
	case GET_USER_FAIL:
		return state.merge({
			loading: false,
			error: action.error,
			user: null,
		});

	default:
		return ensureImmutable(state);
	}
}