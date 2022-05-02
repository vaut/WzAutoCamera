queue("slide", 500);
queue("changeActor", 400);
cameraZoom(5000, 300);
var actor;
var cameraPosition = {x: mapWidth/2, y: mapHeight/2};

const lifetime = 2*60*1000;
const dispersionLifetime = 40*1000;


function slide()
{
	let lead = leadPos();
	let r = dist(lead, cameraPosition);
	if (r >= 4)
	{
		cameraPosition = lead;
		cameraSlide(cameraPosition.x*128, cameraPosition.y*128);
		queue("slide", 100*r);
	}
	else
	{
		queue("slide", 200);
	}
}

function leadPos()
{
	let droids = enumDroid(actor);
	let lead = droids.shift();
	let minARG = dist(lead, startPositions[actor]);
	droids.forEach((droid) =>
	{
		if (dist(droid, startPositions[actor]) >= minARG)
		{
			lead = droid;
			minARG = dist(droid, startPositions[actor]);
		}
	});
	return lead;
}

function dist(a,b)
{
	if (!(a.x && b.x && a.y && b.y)) {return Infinity;}
	return (Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2));
}

function changeActor()
{
	let time = lifetime + dispersionLifetime*(Math.random() - 0.5 );
	let newActor = Math.floor(Math.random() * (maxPlayers + 1));
	if (newActor != actor && typeof playersTeam[newActor] != "undefined" && playersTeam[newActor].isContender)
	{
		queue("changeActor", time);
		actor = newActor;
		return;
	}
	else
	{
		changeActor();
	}
}

