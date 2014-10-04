#pragma strict

private static var gameover : boolean = false;
private static var lives : int = 3;

private static var invunerable : boolean = false;

var lifeLogo : Texture;
var lifeLogoSize : int = 20;

static var LoseALife = function() {
	Debug.Log("Collision");
	
	if (invunerable === true) {
		return;
	}
	
	invunerable = true;
	lives--;
	
	if (lives <= 0) {
		gameover = true;
	}
	
	yield WaitForSeconds(1);
	invunerable = false;
};

function OnGUI() {
	if (gameover) {
		GUI.Box(Rect(50, 50, Screen.width - 100, Screen.height - 100), "Game Over (yeah)!");
	}
	
	var allLifeLogosWidth = (lives * 2 - 1) * lifeLogoSize;
	for (var life = 0; life < lives; life ++) {
		var x = (Screen.width / 2) - (allLifeLogosWidth / 2) + (life * 2 * lifeLogoSize);
		GUI.DrawTexture(Rect(x, lifeLogoSize, lifeLogoSize, lifeLogoSize), lifeLogo, ScaleMode.ScaleToFit);
	}
}