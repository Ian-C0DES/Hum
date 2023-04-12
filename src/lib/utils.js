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

export const abbrNum = (n,d) => {
	let x=(''+n).length;
	let p=Math.pow;
	d=p(10,d);
	x-=x%3
return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]
}
export const timeSince = (date) => {
	var seconds = Math.floor((new Date() - date) / 1000);
  
	var interval = seconds / 31536000;
  
	if (interval > 1) {
	  return Math.floor(interval) + " years";
	}
	interval = seconds / 2592000;
	if (interval > 1) {
	  return Math.floor(interval) + " months";
	}
	interval = seconds / 86400;
	if (interval > 1) {
	  return Math.floor(interval) + " days";
	}
	interval = seconds / 3600;
	if (interval > 1) {
	  return Math.floor(interval) + " hours";
	}
	interval = seconds / 60;
	if (interval > 1) {
	  return Math.floor(interval) + " minutes";
	}
	return Math.floor(seconds) + " seconds";
  }


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
