class Boundary {
    var xMin : float;
    var xMax : float;
    var yMin : float;
    var yMax : float;
    var zMin : float;
    var zMax : float;
}

class InputMapping {
    var left : KeyCode = KeyCode.LeftArrow;
    var right : KeyCode = KeyCode.RightArrow;
    var forward : KeyCode = KeyCode.UpArrow;
    var backward : KeyCode = KeyCode.DownArrow;
    var dive : KeyCode = KeyCode.P;
}

var acceleration : float;
var deceleration : float;
var maxVelocity : float;
var sideTilt : float;
var frontTilt : float;
var turnRotation : float;
var boundary : Boundary;
var diveSpeed : float;

var inputs : InputMapping;

private var initialRotation : Quaternion;

function Start() {
	initialRotation = rigidbody.rotation;
}

function FixedUpdate () {
	var left : int = (Input.GetKey(inputs.left)) ? 1 : 0;
	var right : int = (Input.GetKey(inputs.right)) ? 1 : 0;
	var moveHorizontal : float = right - left;

	var forward : int = (Input.GetKey(inputs.forward)) ? 1 : 0;
	var backward : int = (Input.GetKey(inputs.backward)) ? 1 : 0;
	var moveVertical : float = forward - backward;
	
	if (moveHorizontal == 0) {
		moveHorizontal = rigidbody.velocity.x * -deceleration;
	}
	
	if (moveVertical == 0) {
		moveVertical = rigidbody.velocity.z * -deceleration;
	}

	var dive = Input.GetKey(inputs.dive);

	var riseForce = 0;
	if (rigidbody.position.y < 0) {
		riseForce = 1;
	}
	var force : Vector3 = new Vector3(moveHorizontal, (dive) ? -1 : riseForce, moveVertical);
	
    rigidbody.velocity = Vector3.ClampMagnitude(rigidbody.velocity + (force * acceleration), maxVelocity);

    rigidbody.position = new Vector3(
        Mathf.Clamp(rigidbody.position.x, boundary.xMin, boundary.xMax), 
        Mathf.Clamp(rigidbody.position.y, boundary.yMin, boundary.yMax), 
        Mathf.Clamp(rigidbody.position.z, boundary.zMin, boundary.zMax)
    );

    rigidbody.rotation = Quaternion.Euler(
    	(rigidbody.velocity.z + force.z - rigidbody.velocity.y - force.y)  * frontTilt / 2,
    	(rigidbody.velocity.x + force.x) * turnRotation,
    	(rigidbody.velocity.x + force.x)  * -sideTilt / 2
    ) * initialRotation;

}

function OnCollisionEnter(message) {
	StartCoroutine(GameOverBehaviour.LoseALife());
}