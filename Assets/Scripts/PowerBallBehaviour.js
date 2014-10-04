#pragma strict

var ballSizeCoeffecient : float = 1.5;

private var originalScale : Vector3;

function Start() {
	originalScale = gameObject.transform.localScale;
}

function Update () {
	gameObject.transform.Rotate(new Vector3(2, 2, 2));
	
	gameObject.transform.localScale = originalScale * (ballSizeCoeffecient / CooperationManager.distance);
}