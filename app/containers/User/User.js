import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Spinner, Dialog, Button } from '@blueprintjs/core';
import Radium from 'radium';
import dateFormat from 'dateformat';

import { Representative, AddressInput, ProgressMap, TreeGraph } from 'components';

import { getUser, requestCall, requestLatLong, putUserUpdate } from './actions';
import { Invite } from './Invite';
import { getScore, countStates, getFlatCalls, getPersonalCallsCount } from '../../Utilities/UserUtils';
// import { UserNode } from './UserNode';
import { PieChart, Pie, Cell } from 'recharts';

let styles;

export const User = React.createClass({
	propTypes: {
		userData: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			reps: [],
			callDialogOpen: false,

			nameInput: '',
			zipcodeInput: '',
			emailInput: '',
			error: undefined
		};
	},

	componentWillMount() {
		const localUserData = localStorage.getItem('userData');
		const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
		this.loadData(this.props.params.userId, localUser.hash);
	},

	componentWillReceiveProps(nextProps) {
		if (this.props.params.userId !== nextProps.params.userId) {
			const localUserData = localStorage.getItem('userData');
			const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
			this.loadData(nextProps.params.userId, localUser.hash);
		}

		const prevUserData = this.props.userData.user || {};
		const nextUserData = nextProps.userData.user || {};
		if (!prevUserData.id && nextUserData.id) {
			this.setState({
				nameInput: nextUserData.name,
				zipcodeInput: nextUserData.zipcode,
				emailInput: nextUserData.email,
			});
		}

		const lastUpdateLoading = this.props.userData.updateLoading;
		const nextUpdateLoading = nextProps.userData.updateLoading;
		const nextUpdateError = nextProps.userData.updateError;
		const nextUpdateResult = nextProps.userData.user;
		if (lastUpdateLoading && !nextUpdateLoading && !nextUpdateError && nextUpdateResult.id) {
			localStorage.setItem('userData', JSON.stringify(nextUpdateResult));
			if (window.location.hostname !== 'localhost') {
				Raven.setUserContext({ username: nextUpdateResult.name, userId: nextUpdateResult.id });
			}
		}
	},

	loadData(userId, hash) {
		this.props.dispatch(getUser(userId, hash));
	},

	updateSubmit: function(evt) {
		evt.preventDefault();

		if (this.state.zipcodeInput.length !== 5) { return this.setState({ error: 'Zipcode must be 5 digits' }); }
		if (this.state.nameInput.length === 0) { return this.setState({ error: 'Name is required' }); }

		this.setState({ error: undefined });
		this.props.dispatch(putUserUpdate(this.props.params.userId, this.props.userData.user.hash, this.state.nameInput, this.state.zipcodeInput, this.state.emailInput));
	},

	toggleCallDialog: function() {
		this.setState({ callDialogOpen: !this.state.callDialogOpen });
	},

	callFunction: function(repId) {
		const localUserData = localStorage.getItem('userData');
		const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
		this.props.dispatch(requestCall(repId, this.props.params.userId, localUser.hash));
	},

	geolocateFunction: function(address) {
		const localUserData = localStorage.getItem('userData');
		const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
		this.props.dispatch(requestLatLong(address, this.props.params.userId, localUser.hash));
	},
	logout: function() {
		localStorage.removeItem('userData');
		window.location = '/';
	},

	getParent: function(user) {
		const userLevel = user.hierarchyLevel;
		if (user.ancestors) {
			const parent = user.ancestors.filter((ancestor) => {
				if (ancestor.hierarchyLevel === (userLevel - 1)) {
					return true;
				}
				return false;
			});
			return parent.length > 0 ? parent[0] : false;
		}
		return false;
	},

	render() {
		const user = this.props.userData.user || {};
		// console.log(user);
		const reps = user.reps || [];
		// const children = user.children || [];
		const flatCalls = getFlatCalls(user);
		const score = getScore(user);
		const shareUrl = 'https://fiftynifty.org/?ref=' + user.id; // When we get nicer urls, adda "getUrl" function
		const statesCount = countStates(user);
		const chartData = [{ name: 'SatesDone', value: statesCount }, { name: 'not Done', value: 50 - statesCount }];
		const COLORS = ['#cb0027', 'rgba(0,0,0,0)'];
		const localUserData = localStorage.getItem('userData');
		const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
		const isLocalUser = localUser.id && localUser.id === user.id && localUser.hash && user.hash;
		const presentName = isLocalUser ? 'Your' : user.name + "'s";
		const joinDate = user.createdAt ? dateFormat(new Date(user.createdAt), 'mmmm dS, yyyy') : '';
		const parent = this.getParent(user);
		const callsCount = getPersonalCallsCount(user);

		const isStoredUser = String(localUser.id) === this.props.params.userId;
		const error = this.state.error || this.props.userData.updateError;
		return (
			<div>
				<div style={styles.repsBackground}>
					<div style={styles.repsBackgroundSplash}>
						<div style={styles.container}>

							{this.props.userData.error &&
								<div style={{ margin: '2em auto', maxWidth: '300px', backgroundColor: 'rgba(138, 155, 168, 0.8)' }} className={'pt-callout'}>
									<h5>Error Loading User</h5>
									Apologies - we can't find this user in our database. 
									{isStoredUser &&
										<div>
											<button type="button" className={'pt-button pt-minimal pt-icon-log-out pt-intent-danger'} onClick={this.logout}>Logout</button>
										</div>	
									}
								</div>
								
							}
							{!this.props.userData.error &&
								<div style={styles.content}>
									<div style={styles.title}>
										<span style={this.props.userData.loading ? { opacity: 0 } : {}}>
											{user.name}, {user.state} 
										</span>

										{this.props.userData.loading &&
											<div style={[styles.loader]}>
												<Spinner />
											</div>
										}
									</div>
									{isLocalUser &&
										<div>
											<div style={styles.repsWrapper}>

												<div style={styles.repsBox} className={'pt-elevation-3'}>
													<div style={styles.sectionTitle}>Your Representatives</div>
														<div style={styles.centered}>
															{reps.length > 3 === false &&
																<button role={'button'} style={styles.button} className={'pt-button pt-minimal'} onClick={this.toggleCallDialog}>How to call?</button>	
															}			
															<Dialog isOpen={this.state.callDialogOpen} onClose={this.toggleCallDialog} title={'How To Call'} style={styles.dialogBox}>
																<div className="pt-dialog-body">
																	<div>When you press call, we will dial your representative and call you back automatically.
																		Answer the call and you will be directly connected.
																		Don’t worry about the actual number you see, it is our dialer.
																	</div>
																	<div style={{ paddingTop: '1em' }}>
																		<h4>What Do I Say?</h4>
																		You’ll reach a staffer. Tell them your name and that you are a constituent. <br /><br />
																		Then your message: It’s easy to ask their position on the issue you are calling about. The staffer will tell you. Then you can thank them and note your support or disagreement. You can also add your comments on the President’s position and indicate your support or disagreements with him or how he is working. <br /><br />
																		It's easy, they want to hear from you. If they are modern, they’ll take your email address to let the congressperson respond.
																	</div>
																</div>
															</Dialog>
														</div>

														{reps.length === 0 &&
															<div style={styles.centered}>
																<Spinner />
															</div>
														}

														{reps.length > 0 && reps.length < 3 &&
															<div>
																<div>
																	<div style={styles.section}>
																	{reps.map((rep, index)=> {
																		return (
																			<Representative key={`rep-${index}`} repData={rep} callFunction={this.callFunction} />
																		); 
																	})}
																	</div>

																	<div>Apologies. We had trouble finding all your representatives.</div>
																	<div>You can still join the game by calling those we did find or inviting your friends from other states and encouraging them to call.</div>
																</div>
															</div>
														}

														{reps.length > 3 &&
															<AddressInput geolocateFunction={this.geolocateFunction} isLoading={this.props.userData.latLonLoading} />
														}

														{reps.length === 3 && 
															reps.map((rep, index)=> {
																return (
																	<Representative key={`rep-${index}`} repData={rep} callFunction={this.callFunction} />
																);
															})
														}
													</div>

												</div>

											{/* <p style={styles.orCall}>Or you can call <a style={styles.link} href="tel:508-659-9127">(508) 659-9127</a>  and we'll connect you</p> */}
										</div>

									}

									<div style={styles.userInfoWrapper}>
										<div style={styles.userInfo}>
											<div style={styles.userInfoItem}><b>Joined:</b> {joinDate}</div>
											{parent && <div style={styles.userInfoItem}><b>Invited by:</b> <Link style={styles.link} to={`/${parent.id}`}>{parent.name}</Link></div>}
											<div style={styles.userInfoItem}><b>Calls Made:</b> {callsCount}</div>
											<div style={styles.userInfoItem}><b>Calls by Family:</b> {flatCalls ? flatCalls.length : '0'}</div>
										</div>
									</div>
								</div>
							}
						
						</div>
					</div>
				</div>

				{isLocalUser &&
					<Invite url={shareUrl} />
				}

				<div id="progress" style={styles.progressBackground}>
					<div style={styles.repsBackgroundSplash}>
						<div style={styles.progressSection}>

							<div style={styles.sectionTitle}>
								<span style={(this.props.userData.loading || this.props.userData.error) ? { opacity: 0 } : {}}>
									{presentName} Progress
								</span>
							</div>

							<div style={styles.scoreStats}>
								<span style={{ textAlign: 'center', fontWeight: 'lighter' }}> Score: <span style={styles.score}> {Math.floor(score)}</span></span>
								<div style={{ display: 'inline-block', verticalAlign: 'middle', paddingLeft: '2em', paddingTop: '1em' }}>
									<PieChart height={200} width={200}>
										<Pie 
											isAnimationActive={false} data={chartData} 
											innerRadius={70} outerRadius={100} fill="rgba(102, 102, 102, 0.7)"
											stroke="none" />
										<Pie data={chartData} innerRadius={70} outerRadius={100} fill="#82ca9d" stroke="none">
											{
												chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
											}</Pie>
										<text
											x={100} y={100} textAnchor="middle" dominantBaseline="middle"
											fill="white" fontWeight="lighter">
											{statesCount} / 50 states
										</text>
									</PieChart>
								</div>
							</div>
							<ProgressMap callsData={flatCalls} user={user} />
						</div>
					</div>
				</div>

				{!this.props.userData.loading && !this.props.userData.error &&
					<div style={styles.graphBackground}>
						<div style={styles.section}>
							<div style={styles.familySection}>
								<div style={styles.sectionTitle}>{presentName} Fifty Nifty Family</div>
								<TreeGraph data={user} isGlobal={false}/>
							</div>
						</div>
					</div>
				}

				{isLocalUser &&
					<div style={styles.settingsBackground}>
						<div style={styles.plainContainer}>
							<div style={styles.sectionTitle}>Settings</div>
							<p>Update your name or zipcode.</p>
							<form style={styles.form}>
								<label htmlFor={'name-input'} style={styles.inputLabel}>
								Name
									<input 
										id={'name-input'} className={'pt-input pt-large pt-fill'}
										placeholder={'Enter your name'} value={this.state.nameInput}
										onChange={(evt) => this.setState({ nameInput: evt.target.value })} />
								</label>

								<label htmlFor={'zip-input'} style={styles.inputLabel}>
									Zipcode (where you vote)
									<input 
										id={'zip-input'} type={'number'} className={'pt-input pt-large pt-fill'}
										placeholder={'Enter your zipcode'} value={this.state.zipcodeInput}
										onChange={(evt) => this.setState({ zipcodeInput: evt.target.value.substring(0, 5) })} />
								</label>

								<label htmlFor={'email-input'} style={styles.inputLabel}>
									Email address
									<input 
										id={'email-input'} type={'email'} className={'pt-input pt-large pt-fill'}
										placeholder={'Enter your email address'} value={this.state.emailInput}
										onChange={(evt) => this.setState({ emailInput: evt.target.value })} />
								</label>


								<Button
									type={'submit'}
									text={'Update Settings'}
									className={'pt-intent-primary pt-fill pt-large'}
									loading={this.props.userData.updateLoading}
									onClick={this.updateSubmit} /> 

								{!!error &&
									<div className={'pt-callout'} style={styles.error}>{error}</div> 
								}
								
							</form>

						</div>
					</div>
				}
			</div>

		);
	}
});

function mapStateToProps(state) {
	return {
		userData: state.user.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(User));

styles = {
	container: {
		padding: 'calc(115px + 0.2em) 0em 3em',
		// maxWidth: '1024px',
		margin: '0 auto',
		opacity: '1',
	},
	plainContainer: {
		maxWidth: '1024px',
		margin: '0 auto',
		padding: '2em 1em',
		color: '#FFF',
		textAlign: 'center',
	},
	content: {
		padding: '1em 0em',
	},
	title: {
		fontSize: '2em',
		fontWeight: 'lighter',
		textAlign: 'center',
		padding: '1em 0em',
		color: 'white',
		letterSpacing: '0.1em',
		position: 'relative',
	},
	loader: {
		textAlign: 'center',
		position: 'absolute',
		width: '100%',
		top: '0.5em',
	},
	section: {
		padding: '2em 0em',
	},
	sectionTitle: {
		fontSize: '1.8em',
		textAlign: 'center',
		letterSpacing: '0.1em',
		padding: '0.8em 0',
		fontWeight: 'lighter',
		color: 'white',
	},
	score: {
		fontSize: '3em',
		textAlign: 'center',
		fontWeight: 'bold',
		paddingLeft: '0.2em'
	},
	centered: {
		textAlign: 'center',
	},
	repsSectionTitle: {
		fontSize: '1.9em',
		textAlign: 'center',
		letterSpacing: '0.1em',
		paddingBottom: '1em',
	},
	graphBackground: {
		backgroundColor: '#003d59',
	},
	settingsBackground: {
		backgroundColor: '#0b5577',
	},
	repsBackground: {
		backgroundImage: 'url("/static/header.jpg")',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		top: 0,
		left: 0,
	},
	progressBackground: {
		backgroundImage: 'url("/static/protest.jpg")',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		top: 0,
		left: 0,
	},
	repsBackgroundSplash: {
		background: 'linear-gradient(rgba(0,60,88, 0.8),rgba(0,60,88, 0.8))', //'#1c435a',
	},
	repsWrapper: {
		margin: 'auto',
		width: '90%',
		maxWidth: '370px',
		backgroundColor: '#9A3131',
		opacity: '0.95',
		fontWeight: 'lighter',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			width: '90%',
		},
	},
	repsBox: {
		textAlign: 'left',
		color: 'white',
		padding: '1em',
		marginBottom: '2em',
		//fontWeight: '200',
	},
	orCall: {
		textAlign: 'center',
		color: 'white',
		padding: '1em',
		fontWeight: 'lighter',
	},
	familySection: {
		textAlign: 'center',
		paddingTop: '1em',
	},
	progressSection: {
		padding: '2em 0',
		color: 'white',
	},
	scoreStats: {
		textAlign: 'center',
		paddingTop: '2em',
	},
	button: {
		color: 'white',
		fontWeight: 'lighter',
		backgroundColor: '#003d59',
		letterSpacing: '0.1em',
		boxShadow: '0 2px #001C2B',

	},
	link: {
		color: '#da022e',
		fontWeight: 'bold',
	},
	dialogBox: {
		maxWidth: '100%',
		top: '10%',
	},
	inputLabel: {
		fontSize: '1.25em',
		display: 'block',
		marginBottom: '1em',
	},
	form: {
		textAlign: 'left',
		padding: 0,
		margin: '0 auto',
		maxWidth: '400px',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			maxWidth: '100%',
		},
	},
	error: { 
		color: 'rgb(203, 0, 39)',
		fontSize: '1.25em',
		paddingTop: '.5em',
		marginTop: '0.5em',
	},
	userInfoWrapper: {
		textAlign: 'center',
	},
	userInfo: {
		color: '#000',
		textAlign: 'center',
		background: 'rgba(255, 255, 255, 0.6)',
		borderRadius: '5px',
		margin: 'auto',
		display: 'inline-block',
		lineHeight: '1.5em',
		padding: '1em',
	},
	userInfoItem: {
		display: 'inline-block', 
		padding: '0em 1em',
	},

};
