#pragma strict

var destroyPastZ : float = -6;

function Start () {
	rigidbody.velocity = new Vector3(Random.Range(0, 0.5), 0, Random.Range(-2, 0));
}

function Update() {
	transform.Rotate(new Vector3(Random.Range(0, 1), Random.Range(0, 1), Random.Range(0, 1)));
	
	if (rigidbody.position.z < destroyPastZ) {
		Destroy(gameObject);
	}
}