#pragma strict

var worldSpeed : float = 10;

function Start() {
	rigidbody.velocity = new Vector3(0, 0, -worldSpeed);
}