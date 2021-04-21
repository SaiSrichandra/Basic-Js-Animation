let canv = document.getElementById("mycanvas");
let ctx = canv.getContext("2d");


let loadImage = (imgpath, callback) => {
	let img = document.createElement("img")
	img.onload = () => callback(img)
	img.src = imgpath
}

let imagePath = (framenum, animation) => {
	return animation +"/"+ framenum + ".png"

}

let frames = {
	idle : [1,2,3,4,5,6,7,8],
	kick:  [1,2,3,4,5,6,7],
	punch: [1,2,3,4,5,6,7],
	forward:[1,2,3,4,5,6],
	backward:[1,2,3,4,5,6],
	block:[1,2,3,4,5,6,7,8,9]
};

let pos = 0;

let loadImages = (callback) => {
let imgarr = {idle:[], kick:[], punch:[], forward:[], backward:[], block:[]};
let tot = 0;

	["idle", "kick", "punch", "forward","backward","block"].forEach( (animation) => {
		let animationFrames = frames[animation];
		tot = tot + animationFrames.length

		animationFrames.forEach( (framenum) => {
			loadImage(imagePath(framenum, animation), (image) => {
				imgarr[animation][framenum-1] = image
				tot = tot-1
				
			if(tot == 0) {
				callback(imgarr)
			}
	
			});

		})

		
	});

};

let animate = (ctx,imgarr,animation,callback) => {

	imgarr[animation].forEach((imgele, index) => {
		setTimeout(() => {
			if (animation === "forward") {
				pos = pos + 15
			}
			if(animation=== "backward") {
				pos = pos-15
			}
			if(pos<0){
				pos = 0
			}
			if(pos>1100){
				pos=1100
			}
			ctx.clearRect(0, 0,5000,5000)
			ctx.drawImage(imgele,pos,0,500,500)

		}, 100*index)
	});

	setTimeout(callback, imgarr[animation].length*100)

}



loadImages((images) => {
	let selectedanim = []

	let aux = () => {
	let queueanim;
		if (selectedanim.length === 0) {
			queueanim = "idle"
		}
		else {
			queueanim = selectedanim.shift();
		}
		animate(ctx,images,queueanim, aux)
	}

	aux();
	
	document.addEventListener("keyup", (event)=>{
		let key = event.keyCode;
		if(key === 87) selectedanim.push("kick")
		if(key === 83) selectedanim.push("punch")
		if(key === 68) selectedanim.push("forward")
		if(key === 65) selectedanim.push("backward")
		if(key === 32) selectedanim.push("block")
	})

})

