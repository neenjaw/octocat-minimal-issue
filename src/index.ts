import { Octokit } from "octokit";

export const fetchPRs = async (): Promise<string> => {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("Octokit is uninitialized");
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const {
    viewer: { login },
  } = await octokit.graphql(
    `
      {
        viewer {
          login
        }
      }
    `
  );

  return login;
};
