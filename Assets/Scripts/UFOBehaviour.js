#pragma strict

var speed = 2.5;
var destroyPastZ : float = -6;
var xMovement : float = 3;
var waveLength : float = 10;
var tiltAngle : float = 20;

static var speedMultiplier : float = 1;

private var initialVelocity : Vector3;
private var turnInAdvance : float = 4; // This angle will be added to the sine wave causing the UFO to rotate before moving
private var waveLengthCoefficient : float;

enum Direction {
	LEFT,
	RIGHT
}

static var direction : Direction = Direction.LEFT;

private var directionCoefficient : float;

function Start () {
	rigidbody.velocity = new Vector3(0, 0, -(speed * speedMultiplier));
	
	directionCoefficient = (direction == Direction.LEFT) ? -1 : 1;
	waveLengthCoefficient = 2 * Mathf.PI / waveLength;
}

function Update() {
	var xPosition = (Mathf.Sin(transform.position.z * waveLengthCoefficient) - 0.5) * xMovement * directionCoefficient;
	var zRotation = (Mathf.Sin(transform.position.z * waveLengthCoefficient - turnInAdvance) - 0.5) * -tiltAngle * directionCoefficient;
	
	rigidbody.transform.position.x = xPosition;
	
	transform.localRotation = Quaternion.Euler(0, 0, zRotation);
	
	if (rigidbody.position.z < destroyPastZ) {
		Destroy(gameObject);
	}
}