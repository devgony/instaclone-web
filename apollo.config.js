module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "instaclone-backend",
      url:
        process.env.NODE_ENV === "production"
          ? "https://instaclone-backend-henry.herokuapp.com/graphql"
          : "http://localhost:4001/graphql",
    },
  },
};
