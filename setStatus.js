module.exports = function setStatus(user, repo, revision, context, state, description, url){
	return this.github.repos.createStatus({
				user: user,
				repo:repo,
				sha: revision,
				state:state,
				context:context,
				description:description,
				target_url: url
	});
}