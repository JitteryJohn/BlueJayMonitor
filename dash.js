var baseUrl = 'http://52.53.183.113:5678';

// TODO: Let user supply this from the dashboard?
var deviceId = '48406556-4ca3-4a10-b61c-e0b1c473b498';
var shoeShopBeaconId = 'f45da0c4ee13';
var oracleArenaBeaconId = 'e232b4ffd4a2';

// TODO: Pull this from the /beacons endpoint?
var beacons = [shoeShopBeaconId, oracleArenaBeaconId];

var titleCase = function(s) {
  return s.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$(document).ready(function() {
  var loadBeacons = function() {
    $('#beacons').empty();
    beacons.forEach(function(beaconId, index) {
      $('#beacons').append('<details open />');
      $.getJSON(baseUrl + '/beacon/' + beaconId, function(beacon) {
        var details = $('#beacons details').eq(index);
        var summary = $('<summary />');
        summary.html(titleCase(beacon.name));
        details.append(summary);
        var info = $('<table>');
        info.append('<tr><td>ID</td><td>' + beacon.id + '</td></tr>');
        info.append('<tr><td>Location</td><td>' + beacon.storeId + '</td></tr>');
        info.append('<tr><td>Keywords</td><td>' + beacon.keywords.join(', ') + '</td></tr>');
        details.append(info);
        console.log(beacon);
      });
    });
  };
  loadBeacons();

  var loadEvents = function() {
    $.getJSON(baseUrl + '/suggest/' + deviceId, function(events) {
      $('#events').empty();
      events.forEach(function(e, index) {
        var eDets = $('<details open />');
        eDets.append('<summary>' + e.timestamp + '</summary>');
        var eInfo = $('<table>');
        eInfo.append('<tr><td>Beacon ID</td><td>' + e.beacon.id + '</td></tr>');
        eDets.append(eInfo);
        $('#events').append(eDets);
      });
    });
  };
  setInterval(loadEvents, 1000);
  loadEvents();
});
