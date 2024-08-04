/** Model of swipe profile */
type Profile = {
  /** UUID of the current profile */
  id?: string;

  photos?: object[];

  /** Roommate matching quiz of the profile */
  roommate_quiz?: object | null;

  /** The last login of the profile. */
  last_login?: Date | null;

  /** If the profile is a superuser. */
  is_superuser?: boolean;

  /** Creation date of the profile. */
  created?: Date;

  /** Modified date of the profile. */
  modified?: Date;

  /** The identifier for the profile - email, phone number, uid */
  identifier?: string;

  /** The name of the profile */
  name?: string;

  /** The age of the profile */
  age?: number;

  /** The major of the profile */
  major?: string;

  /** The city of the profile */
  city?: string | null;

  /** The state of the profile */
  state?: string | null;

  /** The description of the profile */
  description?: string;

  /** The chosen dorm of the profile */
  dorm_building: string;

  /** The interests of the profile */
  interests?: string[];

  /** The graduation year of the profile */
  graduation_year?: number;

  /** Whether the profile is a staff member. */
  is_staff: boolean;

  /** Whether the profile is online. */
  is_active: boolean;

  /** Whether the profile has finished setting up their profile and is on the swipe deck.  */
  has_account: boolean;

  /** The sex of the profile */
  sex: string;

  /** The profile picture of the profile */
  thumbnail: string;

  /** The profiles blocked by the profile. */
  block_profiles: string[];

  /** What groups the  profile is in. */
  groups: string[];
};

export default Profile;