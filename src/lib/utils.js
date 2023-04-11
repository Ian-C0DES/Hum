const { randomBytes } = await import('node:crypto');
import { PUBLIC_VITE_POCKETBASE_URL } from '$env/static/public';

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const generateUsername = (name) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `${PUBLIC_VITE_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};




export const BadgeData = {
	Login_Goal: {
		tier: 0,
		progress: 0,
		hint:"Earn points by logging data",
		threshold:{
			1:3,
			2:7,
			3:14,
		},
	},
	Weight_Goal: {
		tier: 0,
		progress: 0,
		hint:"Earn points by hitting your weight goal and staying in good standing BMI range",
		threshold:{
			1:3,
			2:7,
			3:14,
		},
	}
};

export const EmptyBadge = {
	Login_Goal: {
		tier: 0,
		progress: 0,
	},
	Weight_Goal: {
		tier: 0,
		progress: 0
	}
};
