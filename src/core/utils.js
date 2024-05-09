import ProfileImage from '../assets/images/profile.png';
import { ADDRESS } from './api';


function thumbnail(url) {
	if (!url) {
		return ProfileImage
	}
	return {
		uri: 'http://' + ADDRESS + url
	}
}


export default {
  thumbnail,
}