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

function formatTime(date) {
	if (date === null)  {
		return '-'
	}
	const now = new Date()
	const s = Math.abs(now - new Date(date)) / 1000
	// Seconds
	if (s < 60) {
		return 'now'
	}
	// Minutes
	if (s < 60*60) {
		const m = Math.floor(s / 60)
		return `${m}m ago`
	}
	// Hours
	if (s < 60*60*24)  {
		const h = Math.floor(s / (60*60))
		return `${h}h ago`
	}
	// Days
	if (s < 60*60*24*7)  {
		const d = Math.floor(s / (60*60*24))
		return `${d}d ago`
	}
	// Weeks
	if (s < 60*60*24*7*4)  {
		const w = Math.floor(s / (60*60*24*7))
		return `${w}w ago`
	}
	// Years
	const y = Math.floor(s / (60*60*24*365))
	return `${y}y ago`
}


export default {
  thumbnail,
	formatTime,
}