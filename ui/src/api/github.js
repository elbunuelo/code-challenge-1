import { Octokit } from '@octokit/rest';

import { BACKEND_URL } from '../constants';

const USER_AGENT = 'MatterSupplyBlog v0.0.1';
//Anonymous client
let octokit = new Octokit({
  userAgent: USER_AGENT,
})

export const initialize = async (config) =>{
  if (!config.user) {
    return
  }

  octokit = new Octokit({
    userAgent: USER_AGENT,
    auth: config.user.credentials.token
  });
}

export const tryLogin = (config) => {
  return new Promise((resolve, reject) => {
    const popup = window.open(config.links.auth, '_blank', 'width=500,height=500')
    window.addEventListener('message', ({ origin, data }) =>{
      if (origin === BACKEND_URL && data === 'AuthDone') {
        popup.close();
        return resolve(true);
      }
    });

    setTimeout(reject, 5 * 60 * 1000);
  });
}

export const getGist = async (id) => {
    const { data } = await octokit.rest.gists.get({gist_id: id});
    return data;
}

export const getUser = async (username) => {
  const { data } = await octokit.rest.users.getByUsername({username});
  return data;
}

export const getUserGists = async (username) => {
  const { data }  = await octokit.rest.gists.listForUser({ username, per_page: 10 });
  const gistsPromises = data.map(async gist => await getGist(gist.id));

  return await Promise.all(gistsPromises);
}

export const searchUsers = async (q) => {
  const users = await octokit.rest.search.users({ q, per_page: 5 });
  return users.data.items;
}

export const createGist = async ({title, text}) => {
  const { data } = await octokit.rest.gists.create({
    description: title,
    files: { 'msco-gist.md': { content: text }},
    public: true
  })
  return data;
}
