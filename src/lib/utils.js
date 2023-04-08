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

	export const getBadgeimage = (name,tier,page) =>{
		let src="";
		let filename="";
		switch (tier) {
			case 1:
				filename += "I_";
				break;
			case 2:
				filename += "II_";
				break;
			case 3:
				filename += "III_";
				break;
			case 4:
				filename += "IIII_";
				break;
			case 5:
				filename += "IIIII_";
				break;
			default:
				break;
		}
		for (let index = 0; index < (page.route.id.match(/\//g) || []).length; index++) {
			src += "../"
		}
		filename+=name;
		src += "src/lib/assets/images/badges/"+filename+".png";
		// let image = import(src);
		// console.log(image);
		return src;
	};

export const BadgeData = {
	Login_Goal: {
		tier: 0,
		progress: 0,
		hint:"Earn points by",
		threshold:{
			1:3,
			2:7,
			3:14,
		},
	},
	Weight_Goal: {
		tier: 0,
		progress: 0
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
