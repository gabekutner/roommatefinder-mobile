/** Model of user profile */
type Profile = {
  /** UUID of the current profile */
  id?: string;

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

  /** Whether the current profile has confirmed their otp code */
  otp_verified?: boolean;

  /** The sex of the current profile */
  sex?: string;

  /** The profile picture of the current profile */
  thumbnail?: File;
};

export default Profile;