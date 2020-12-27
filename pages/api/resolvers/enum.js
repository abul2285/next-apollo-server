export const enumQuery = {
  users: (_record, args, _context) => {
    // args.authType will always be 'google-auth' or  'github-auth' or 'outlook-auth'
    // ...
  },
};

export const enumMutation = {};
export const enumShare = {
  // Enum internal values
  AuthType: {
    GOOGLE: "google-auth",
    GITHUB: "github-auth",
    OUTLOOK: "outlook-auth",
  },
};
