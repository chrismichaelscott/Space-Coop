#pragma strict

var endPoint : Vector3;
var duration : float;

private var startPoint : Vector3;
private var startTime : float;

function Start() {
	startPoint = gameObject.transform.position;
	startTime = Time.time;
}

function FixedUpdate () {
	gameObject.transform.position = Vector3.Lerp(startPoint, endPoint, (Time.time - startTime) / duration);
}