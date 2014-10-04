#pragma strict

class MeteorProperties {
	var xRangeMin : float = -7;
	var xRangeMax : float = 7;

	var smallestMeteor : float = 0.1;
	var largestMeteor : float = 0.5;
}

var meteorPrefab : GameObject;
var meteorProperties : MeteorProperties;

function Start() {
	StartCoroutine(Factory());
}

function Factory() {
	while (true) {
		yield WaitForSeconds(Random.Range(0.5, 3));
		
		var startPosition = new Vector3(
			Random.Range(meteorProperties.xRangeMin, meteorProperties.xRangeMax),
			0,
			5
		);
		var meteor : GameObject = Instantiate(meteorPrefab, startPosition, Quaternion.identity);
		meteor.transform.localScale = new Vector3(1, 1, 1) * Random.Range(meteorProperties.smallestMeteor, meteorProperties.largestMeteor);
		meteor.transform.parent = transform;
		meteor.layer = gameObject.layer;
	}
}