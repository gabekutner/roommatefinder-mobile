/**
 * @description
 * Most /api/v1/profiles endpoints return a BaseProfileSerializer object
 * with all the following fields. These endpoints are: 
 *  - GET api/v1/profiles/
 *  - GET api/v1/profiles/<id>/
 *  - POST api/v1/profiles/
 *  - POST api/v1/profiles/actions/verify-otp/
 *  - POST api/v1/profiles/actions/create-password/
 *  - PUT api/v1/profiles/<id>/
 *  - POST api/v1/profiles/actions/create-profile/
 */ 

/** Model of user profile */
type Profile = {
  /** UUID of the current profile */
  id?: string;

  /** The last login of the current profile. */
  last_login?: Date;

  /** If the current profile is a superuser. */
  is_superuser?: boolean;

  /** Creation date of the current profile. */
  created?: Date;

  /** Modified date of the current profile. */
  modified?: Date;

  /** The identifier for the current profile - email, phone number, uid */
  identifier?: string;

  /** The name of the current profile */
  name?: string;

  /** The age of the current profile */
  age?: number;

  /** The major of the current profile */
  major?: string;
  
  /** The city of the current profile */
  city?: string;

  /** The state of the current profile */
  state?: string;

  /** The description of the current profile */
  description?: string;

  /** The chosen dorm of the current profile */
  dorm_building?: string;

  /** The interests of the current profile */
  interests?: string[];

  /** The graduation year of the current profile */
  graduation_year?: number;

  /** The otp verification code of the current profile */
  otp?: number | null;

  /** The otp expiration date of the current profile */
  otp_expiry?: Date;

  /** The amount of times the current profile has tried to enter an invalid otp code */
  max_otp_try?: string;

  /** When the otp code maxes out. */
  otp_max_out?: Date;

  /** Whether the current profile has confirmed their otp code */
  otp_verified?: boolean;

  /** Whether the current profile is a staff member. */
  is_staff?: boolean;

  /** Whether the current profile is online. */
  is_active?: boolean;

  /** Whether the current profile has finished setting up their profile and is on the swipe deck.  */
  has_account?: boolean;

  /** Whether the current profile is removed from the swipe deck.  */
  pause_profile?: boolean;

  /** What groups the current profile is in. */
  groups?: string[];

  /** The permissions for the current profile. */
  user_permissions?: string[];

  /** The profiles blocked by the current profile. */
  block_profiles?: string[];

  /** The sex of the current profile */
  sex?: string;

  /** The profile picture of the current profile */
  thumbnail?: File;
};

export default Profile;