const { randomBytes } = await import('node:crypto');
// import { VITE_POCKETBASE_URL } from '$env/static/private'

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const generateUsername = (name) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `http://143.42.138.135:80/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const EmptyBadge = {
	Login_Goal: {
		tier: 0,
		progress: 0
	},
	Weight_Goal: {
		tier: 0,
		progress: 0
	}
};
