import cftool from "./index"


export default function setGitHubStatus(user: String, repo: String, revision: String, context: String, state: String, description: String, url: String){
	if(description.length>140)
	{
		description = description.slice(140);
	}

	return cftool.gitHub.repos.createStatus({
				user: user,
				repo:repo,
				sha: revision,
				state:state,
				context:context,
				description:description,
				target_url: url
	});
}