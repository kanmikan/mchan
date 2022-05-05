var HOST = "";

function getHost(req){
	if (req && req.headers){
		const protocol = req.headers['x-forwarded-proto'] || 'http';
		HOST = req ? `${protocol}://${req.headers.host}` : "";
		return HOST;
	} else {
		return HOST;
	}
}

async function getData(req, path){	
	const result = await fetch(`${getHost(req)}${path}`);
	return await result.json();
}

module.exports = {HOST, getHost, getData}