import React from 'react';
import { Link } from 'react-router';

let styles;

export const About = React.createClass({

	render() {
		return (
			<div style={styles.more} className={'about-page'}>
				<div style={styles.container}>
					<div>

						<h3 style={styles.title}>
							Join the challenge
						</h3>
						<p>This is a grassroots challenge to get friends in 50 states to make calls to their congresspeople about an issue they care about. <Link to={'/about/#calls'} style={styles.link}>Live phone calls</Link> have the most impact. Your mission is to pass this along to friends who will make calls and also pass the message/link along.  Three clicks and you’re in.  We make calling easy.</p>

						<p>	Here are the three steps that you will follow:<br />
							<ol>
								<li>Sign up with a number, nickname and zipcode.</li>
								<li>Decide an issue to spread.</li>
								<li>Invite friends with your link.</li>
							</ol>
							Then start calling!</p>

						<div>
							<Link to={'/'}>
								<button className={'pt-button pt-intent-primary pt-fill pt-large'}>
									Join Now
								</button>
							</Link>
						</div>

						<h3 style={styles.title}>
							What’s the challenge?
						</h3>
						<p> The Challenge winners are the chains that spread to 50 states and accumulate the most Challenge points. You get 250 points for making a call, 125 points for a call that your friend makes, 65 points for the call their friend makes, on and on.</p>
						<p> There is a leaderboard and a network <Link to={'/about/#network'} style={styles.link}>view</Link> so you can track progress and see your national reach. If you like, we will send you a progress text each morning. (This feature will premier soon.)</p>
						<p>	You get points for all calls made.  Call today – call again tomorrow, to get more points!</p>


						<h3 style={styles.title}>
							How to sign up
						</h3>
						<p> Just enter your name or nickname, zip code and phone number. We’ll text an authorization code to log in.  Your phone number is how you login on other devices. <em>All your information will be secure, private and used only in this Challenge. You will not get unsolicited calls.</em></p>

						<Link to={'/'}>
							<button className={'pt-button pt-intent-primary pt-fill pt-large'}>
								Join The Game
							</button>
						</Link>


						<h3 style={styles.title}>
							Then what
						</h3>
						<p>	Pick an issue.  Use our suggestions or promote your own. It’s your network. Use the Facebook, Twitter, or email buttons to invite friends. <em>Keep doing this to remind them!</em> </p>
						<p>	We'll identify your Congresspeople. We'll speed-dial for you and register your points for the call. You can call now or later.  Business hours are best. It’s easy: press the "call" button and we'll call you back and patch you directly to their office. Just answer your phone to talk. <Link to={'/about/#hints'} style={styles.link}>Click here</Link> for hints on what to say.</p>

						<p>(We welcome your feedback: Contact us at <Link to={'mailto:fiftynifty@media.mit.edu'} style={styles.link}>fiftynifty@media.mit.edu</Link>)</p>


						<h3 style={styles.title} id="calls">
							Calls matter
						</h3>
						<p>	Congresspeople know that an active caller is a likely voter, and they listen to all calls. There are only a few ways to make democracy work: voting is the most important one. But calling is more specific and more immediate. They can't poll you about every issue, but you can tell them how you feel about the important ones.  Even if you think your vote doesn’t count, your call does! You’ll reach a friendly staffer who is easy to talk to. We make it one-click to call. <Link to={'/about/#tldr'} style={styles.link}>Click here</Link> to learn more.</p>


						<h3 style={styles.title}>
							Track your progress
						</h3>
						<p>As you keep inviting more friends to the game - your network will grow to look similar to this:</p>
						<div style={{ width: '100%', textAlign: 'center' }} id="network">
							<img style={{ width: '90%' }} alt={'network'} src={'/static/network.png'} />
						</div>
						<p>And as your friends make calls and invite more friends, your progress map will start looking like this:</p>
						<div style={{ width: '100%', textAlign: 'center' }} id="map">
							<img style={{ width: '90%' }} alt={'map'} src={'/static/map.png'} />
						</div>


						<h3 style={styles.title}>
							Choose your issue
						</h3>
						<p> When you invite friends you should prompt them with an issue you care about. We suggest two current ones that warrant a phone call to your Congressperson. You are welcome to use a different one in your invite. The next version will let you add it here. Present your issue fairly – you want to get <em>everyone</em> who cares to call.</p>
						

						<h3 style={styles.title}>
							The Russian Role in U.S. Affairs
						</h3>
						<p> National Security Advisor Mike Flynn’s resigned after misleading Vice President Pence about his pre-inauguration phone calls with a Russian diplomat. The repercussions have just begun and the issue is likely to become more important in the coming days and weeks. Members of Congress from both parties are  starting to react. Now is the time to tell your Senators and Representatives what you think they should do and to learn where they stand.</p>
						<p> Some think there should be a broad Congressional investigation into President Trump’s entanglements with Russia, including their role in the recent election. This casts a cloud on the operation of our administration.</p>
						<p> Others think that Flynn’s resignation is the end of the matter. There is nothing more to do. Other issues are more important.</p>
						<p> Yet others want to give the new President his chance and wish he and his administration were more thoughtful in how they run the country.</p>


						<h3 style={styles.title}>
							Closing the Borders
						</h3>
						<p> The new Executive Order “Protecting the Nation from Foreign Terrorist Entry into the United States” and the aftermath has thrown the country into turmoil. Whether you agree with the order and the courts’ interpretation of it, are confused by it, or are think our government ought to be more thoughtful in its actions, now is the time to make your opinion known by <i>calling your congressional representative! Urge them to take a strong public stand and let the nation know their opinion in no uncertain terms.</i></p>
						<p> Many think the order is bad policy and bad democracy. They feel that guests and immigrants make America strong, increase the economy more than trade deals, and do not take American jobs. Neither have immigrants from the seven proscribed countries terrorized us.</p>
						<p> Many others support the ban in the interests of keeping the country safe. President Trump is following through on a promise he made during the campaign. Many voted for him based on his promises.</p>
						<p> Yet others want to support the President but think that he acted rashly and might have been more circumspect were his full cabinet in place to temper and fine tune his actions.</p>


						<h3 style={styles.title}>
							The Affordable Care Act
						</h3>
						<p>Some people gained healthcare coverage through the Affordable Care Act (also known as Obamacare).  Many people regard this as important legislation that should be kept in place.</p>
						<p>Many other people resent Obamacare as federal government overreach and they want it repealed.</p>
						<p>Others think that Obamacare can be reformed or changed slightly for better outcomes and cheaper policies. </p>
						<p>Congress is now working out how to proceed on this issue.  Now is the time to call – while opinion among Representatives and Senators is still in flux.  And persuade your friends around the country to do the same.  You and your social network can have major impact if you get organized and MAKE THE CALL!</p>

						<h3 style={styles.title} id="tldr">
							TL;DR
						</h3>
						<p>Democracy works because you elect people to act on your behalf. Congress knows what you want by your vote, by polling, and by you telling them directly. But they don't poll on every issue, and a poll is not as accurate as your personal expression. You can write, email, or phone. Of these, a live phone call from a constituent during business hours gets the most attention. Your call will be answered, most likely by a staffer whose job is to listen. When you talk directly to them, they report that to the congressperson. As you talk to them, your point becomes clearer. If you leave a message, it is simply totaled and summarized.</p>
						<p>Elected officials keep a record of eligible and active voters in their district or state. That's why you should give your name and address. Your call demonstrates your willingness to act on your opinions. Even if you didn't vote, you are heard because once you make the effort to call, you are more likely to make the effort to vote. <br />
							When you call, you are making democracy work better, more responsibly, and more responsively. </p>
						<p>You may worry that money counts a lot, but in the end, it's votes that actually put people in office. The goal of this challenge is to multiply your individual message by the power of your friends, and their friends. We want to show that a network can be more powerful than any other message they get. A network of citizens is what democracy is all about.</p>
						<p> You may think that it's impossible to pass a message to someone in every state. It's far easier than you think. Some studies have shown that everyone is only an average of six people away from anyone else. A psychologist <a href="https://en.wikipedia.org/wiki/Six_degrees_of_separation"> tested this in the 1960's </a> by asking people to get a letter to someone they didn't know, by sending it to someone they did. For a while there was a lot of buzz about the 'Bacon Number'. That number told how many people any actor was removed from Kevin Bacon. It's also called <a href="https://snap.stanford.edu/class/cs224w-readings/travers69smallworld.pdf"> 'The Small World Problem'.</a> <i>You can meet the challenge!</i> </p>
						<p> Remember the challenge!  50 calls in 50 states.  Multiplied by all of us.</p>
					</div>
					<div>
						<Link to={'/'}>
							<button className={'pt-button pt-intent-primary pt-fill pt-large'}>
								Join Now
							</button>
						</Link>
					</div>

					<div id="hints">
						<h3 style={styles.title}> 
							Hints and a guide
						</h3>
						<p> To play, sign up, make calls, and pass the ball to friends by sending them the invitation link. You should tell them what to expect when they follow the link, and suggest that they do it on their mobile phone. We have presented two issues we think is important, but you are welcome to encourage your friends to call about any issue they care about.</p>
						<p> When you sign up we will text you a verification code on your mobile phone or call you on a land line and read the code to you. This insures that your number is correct.</p>
						<p> When you hit the call button on your phone, we will call your congressperson and ring you right back. You will see an incoming call from a number you won't recognize. That's just us making the connection. We do this to keep score by verifying that you really did make the call.</p>
						<p> Call a senator or representative is intimidating. That’s why calls matter. Your call will be answered by a staffer who is there to talk to you and  we are making it as easy as possible. It helps to have some plan for what to say:</p>
						<ul>
							<li> Tell your Congressperson your name, and that you are a constituent.</li>
							<li> Say that you'd like to comment on an issue, or ask the Congressperson's stance.</li>
							<li> Present what you think your Congressperson should do, be it have a hearing, make a public statement, or support a law. </li>
							<li> If you know his or her stance, you can express your agreement or disagreement.</li>
						</ul>
						<p> Feel free to ask for the congressperson’s opinion. The staffer may ask for your email so that the senator or representative can respond directly. They may ask for your address to verify that you live in their district or state.</p>
					</div>

					<div id="legal">
						<h3 style={styles.title}>Who we are</h3>
						<p> This is an MIT Media Lab research experiment being run by Andrew Lippman in the Viral Communications Group to understand and encourage the propagation of social activities through personal networks. Your participation is voluntary and there is no compensation for joining. Normal phone charges may apply. We will not use any personally identifiable information in our research. Anything you enter will be encrypted before storage. We ask that you use a name or nickname so that people you invite can see who it came from. We also use your name so you can track the progress of your network on the map. You have the option of suppressing that information. We will never present results of our research in a way that allows you to be identified and and we will never sell or reveal your phone number or zipcode. You must be 18 to join the challenge. </p>
						<p> Remember the challenge!  50 calls in 50 states.  Multiplied by all of us.</p>
					</div>
				</div>
			</div>);
	}
});


export default About;

styles = {
	more: {
		backgroundColor: '#003d59',
		color: 'white',
		fontWeight: 'lighter',
	},
	container: {
		padding: 'calc(115px + 2em) 2em 3em',
		maxWidth: '1024px',
		margin: '0 auto',
		zIndex: 2,
		position: 'relative',
		display: 'block'
	},
	link: {
		color: '#ff6f70'
	},
	title: {
		fontSize: '2em',
		fontWeight: 'lighter',
		padding: '1em 0',
		color: 'white',
		letterSpacing: '0.1em',
	},
};
