import { Octokit } from 'octokit'

export const fetchPRs = async (): Promise<string> => {
  const octokit = process.env.GITHUB_TOKEN
    ? new Octokit({ auth: process.env.GITHUB_TOKEN })
    : undefined

  if (!octokit) {
    throw new Error('Octokit is uninitialized')
  }

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
  )

  return login
}
