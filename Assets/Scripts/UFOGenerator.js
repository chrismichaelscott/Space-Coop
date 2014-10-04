#pragma strict

class WaveProperties {
	var xRangeMin : float = -3;
	var xRangeMax : float = 3;
	
	var minWavePeriod : float = 10;
	var maxWavePeriod : float = 10;
	
	var shipsPerSecond : float = 1;
	
	var waveSize: int = 8;
}

enum WaveType {
	CONSTANT_LEFT,
	CONSTANT_RIGHT,
	ALTERNATE,
	RANDOM
}

var ufoPrefab : GameObject;
var waveProperties : WaveProperties;

function Start() {
	StartCoroutine(Factory());
}

function Factory() {
	while (true) {
		yield WaitForSeconds(Random.Range(waveProperties.minWavePeriod, waveProperties.maxWavePeriod));
		
		var startPosition = new Vector3(
			Random.Range(waveProperties.xRangeMin, waveProperties.xRangeMax),
			0,
			5
		);
		
		generateWave(startPosition);
	}
}

function generateWave(startPosition : Vector3) {
	var waveType : WaveType;

	var waveTypeSelection: float = Random.value;
	Debug.Log(waveTypeSelection);
	
	if (waveTypeSelection < 1.0/4) {
		waveType = WaveType.CONSTANT_LEFT;
	} else if (waveTypeSelection < 1.0/2) {
		waveType = WaveType.CONSTANT_RIGHT;
	} else if (waveTypeSelection < 3.0/4) {
		waveType = WaveType.ALTERNATE;
	} else {
		waveType = WaveType.RANDOM;
	}
	
	Debug.Log("Wave type: " + waveType);
	
	for (var ufoNumber = 0; ufoNumber < waveProperties.waveSize; ufoNumber++) {
		if (waveType == WaveType.CONSTANT_LEFT) {
			UFOBehaviour.direction = Direction.LEFT;
		} else if (waveType == WaveType.CONSTANT_RIGHT) {
			UFOBehaviour.direction = Direction.RIGHT;
		} else if (waveType == WaveType.ALTERNATE) {
			UFOBehaviour.direction = (UFOBehaviour.direction == Direction.RIGHT) ? Direction.LEFT : Direction.RIGHT;
		} else if (waveType == WaveType.RANDOM) {
			UFOBehaviour.direction = (Random.value > 0.5) ? Direction.LEFT : Direction.RIGHT;
		}
		
		var ufo : GameObject = Instantiate(ufoPrefab, startPosition, Quaternion.identity);
		ufo.transform.parent = transform;
		ufo.layer = gameObject.layer;
		
		yield WaitForSeconds(1 / waveProperties.shipsPerSecond);
	}
}