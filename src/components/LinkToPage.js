import React from 'react';
import history from '../history';
import RoutePathConstants from '../constants/RoutePathConstants';

const { searchNew } = RoutePathConstants;

const LinkToPage = () => <div onClick={history.push(`/${searchNew}`)}>a</div>;

export default LinkToPage;
