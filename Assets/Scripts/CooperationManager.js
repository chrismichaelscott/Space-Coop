#pragma strict

var ball1 : GameObject;
var ball2 : GameObject;

static var distance : float;
static var middlePoint : Vector3;
static var eulerRotation : Vector3;

function Start() {
	Update();
}

function Update () {
	var position1 = ball1.transform.position;
	var position2 = ball2.transform.position;
	
	distance = Vector3.Distance(position1, position2);
	middlePoint = Vector3.Lerp(position1, position2, 0.5);
	
	var xOffset = position1.x - position2.x;
	var yOffset = position1.y - position2.y;
	var zOffset = position1.z - position2.z;
	
	if (xOffset < 0.05 && xOffset > -0.05) {
		eulerRotation = new Vector3(
			0,
			(zOffset > 0) ? 90 : -90,
			Mathf.Atan(yOffset / zOffset) * Mathf.Rad2Deg
		);
	} else {
		eulerRotation = new Vector3(
			0,
			Mathf.Atan(-zOffset / xOffset) * Mathf.Rad2Deg,
			Mathf.Atan(yOffset / xOffset) * Mathf.Rad2Deg
		);
	}
}