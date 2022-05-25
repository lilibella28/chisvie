import { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import PageHeader from '../../components/Header/Header';
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import HomeGallery from "../../components/HomeGallery/HomeGallery";
import userService from '../../utils/userService';
import * as likesAPI from '../../utils/likeApi';
import Loading from "../../components/Loader/Loader";
import { useParams } from 'react-router-dom';

export default function ProfilePage(props) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const { username } = useParams();

	async function addLike(postId) {
		try {
			const data = await likesAPI.create(postId);
			getProfile();
		} catch (err) {
			setError(err.message);
		}
	}

	async function removeLike(likeId) {
		try {
			const data = await likesAPI.removeLike(likeId);
			getProfile();
		} catch (err) {
			setError(err.message);
		}
	}

	async function getProfile() {
		try {
			const data = await userService.getProfile(username);
			setLoading(() => false);
			setUser(() => data.user);
			setPosts(() => data.posts);
		} catch (err) {
			console.log(err)
			setError("Profile Doesn't exists,!");
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	if (error) {
		return (
			<>
				<PageHeader handleLogout={props.handleLogout} user={props.user} />
				<ErrorMessage error={error} />;
			</>
		);
	}

	if (loading) {
		return (
			<>
				<PageHeader handleLogout={props.handleLogout} user={props.user} />
				<Loading />
			</>
		);
	}

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column>
					<PageHeader handleLogout={props.handleLogout} user={props.user} />
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<ProfileBio user={user} />
				</Grid.Column>
			</Grid.Row>
			<Grid.Row centered>
				<Grid.Column style={{ maxWidth: 750 }}>
					<HomeGallery
						isProfile={true}
						posts={posts}
						numPhotosCol={3}
						user={props.user}
						addLike={addLike}
						removeLike={removeLike}
					/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}
