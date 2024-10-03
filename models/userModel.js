import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [
      true,
      'A user with this name already exists.'
    ],
    required: [
      true,
      'A user name is needed.'
    ]
  },
  email: {
    type: String,
    unique: [
      true,
      'A user with this email address already exists.'
    ],
    required: [
      true,
      'An email address is needed.'
    ]
  },
  passwordHash: {
    type: String,
    required: [
      true,
      'A password is needed.'
    ]
  },
  roles: {
    type: [String],
    enum: [
      'administrator',
      'developer',
      'moderator',
      'user'
    ],
    required: [
      true,
      'At least one role is required.'
    ],
    default: ['user']
  },
  actorId: {
    type: String,
    unique: [
      true,
      'This Actor ID is already associated with a user.'
    ],
    required: [
      true,
      'An Actor ID is needed.'
    ]
  },
  publicKey: {
    type: String,
    required: [
      true,
      'A public GPG key is needed.'
    ]
  },
  privateKey: {
    type: String,
    required: [
      true,
      'A private GPG key is needed.'
    ],
    select: false
  },
  mfaEnabled: {
    type: Boolean,
    default: false
  },
  mfaSecret: {
    type: String
  },
  mfaRecoveryCodes: {
    type: [String]
  }
}, {
  timestamps: true
})
const userModel = mongoose.models.user ?? mongoose.model(
  'user',
  userSchema
)
export default userModel