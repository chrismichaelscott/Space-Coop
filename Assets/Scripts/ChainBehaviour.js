#pragma strict

var chain : GameObject;
var ignitionDistance : float = 2;
var chainThicknessCoeffecient : float = 0.2;

static var power : float;

/*
function Start() {
	// TODO : I should create the chain cylinder in the script
}
*/

function Update () {
	if (CooperationManager.distance < ignitionDistance) {
		power = (ignitionDistance - CooperationManager.distance) / ignitionDistance;
	
		// TODO : This ia hack as I'm on a plane and cannot work out how to disable a GameObject temporarily
		gameObject.transform.position.z = 0;
		
		chain.transform.localScale = new Vector3(chainThicknessCoeffecient * power, CooperationManager.distance / 2, chainThicknessCoeffecient * power);
		chain.renderer.material.mainTextureOffset += Vector2(0.01, 0);
		
		gameObject.transform.position = CooperationManager.middlePoint;
		gameObject.transform.localRotation = Quaternion.Euler(CooperationManager.eulerRotation.x, CooperationManager.eulerRotation.y, CooperationManager.eulerRotation.z);
	} else {
		power = 0;
		// TODO : This ia hack as I'm on a plane and cannot work out how to disable a GameObject temporarily
		gameObject.transform.position.z = -1000;
	}
}