#pragma strict

class ComboBarConfiguration {
	var comboTimeout : float = 2;
	var fullCharge : int = 10;
	var lowChargeColor : Color = Color.blue;
	var highChargeColor : Color = Color.red;
	var barWidth : float = 10;
}

var explosionPrefab : GameObject;

var ship1 : Collider;
var ship2 : Collider;

var comboBarConfiguration : ComboBarConfiguration;

private var combo : int = 0;

function Start() {
	Physics.IgnoreCollision(collider, ship1);
	Physics.IgnoreCollision(collider, ship2);
}

function OnTriggerEnter(thingToZap : Collider) {
	var explosion : GameObject = Instantiate(explosionPrefab, Vector3.zero, Quaternion.identity);
	explosion.transform.parent = thingToZap.transform.parent;
	explosion.transform.position = thingToZap.transform.position;
	
	Destroy(thingToZap.gameObject);
	
	StartCoroutine(TrackCombo());
}

function TrackCombo() {
	var currentCount = ++combo;
	yield WaitForSeconds(comboBarConfiguration.comboTimeout);
	
	if (currentCount == combo) {
		combo = 0;
	}
}

function OnGUI() {
	if (combo > 0) {
		var chargeProportion : float = parseFloat(combo) / comboBarConfiguration.fullCharge;

		var texture : Texture2D = new Texture2D(1, 1);
		texture.SetPixel(0, 0, Color.Lerp(comboBarConfiguration.lowChargeColor, comboBarConfiguration.highChargeColor, chargeProportion));
		texture.Apply();
		
		GUI.DrawTexture(
			Rect(
				comboBarConfiguration.barWidth,
				Screen.height - (comboBarConfiguration.barWidth * 2),
				(Screen.width - (comboBarConfiguration.barWidth * 2)) * chargeProportion,
				comboBarConfiguration.barWidth
			),
			texture,
			ScaleMode.StretchToFill,
			true,
			1.0
		);
	}
}