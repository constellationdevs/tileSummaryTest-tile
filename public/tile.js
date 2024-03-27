/* eslint-disable no-var */
var localHost = location.hostname === "localhost";

var tile = {
  data: {},
  str: {},
  tileConfig: {},

  getNav: function () {
    return document.getElementById("AppNavigator");
  },
  popPanel: function () {
    consolelog("popPanel");
    tile.getNav().popPage();
  },
  resetStack: function () {
    tile.getNav().resetPage();
  },
  dollarify: function (price) {
    if (price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      }).format(price);
    } else {
      return null;
    }
  },
  mockMemberTile: {
      "tileCode": "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
      "tileVersion": "1.0",
      "tileIcon": "",
      "tileColorCss": "",
      "overrideTileCss": false,
      "canReorder": true,
      "canResize": true,
      "canRemove": true,
      "connectorName": "",
      "connectorMethod": "",
      "connectorVersion": "",
      "hasTileSummaryMethod": true,
      "removed": false,
      "isAuthenticated": true,
      "previewID": 1,
      "sortOrder": 1
  },
  mockContainerTile: {
      "TileStatus": "Development",
      "TileVersion": "1.0",
      "TileCode": "834F9DDB-7666-40E5-AB9E-387EC2D7FF6C",
      "TileDescription": "",
      "Title": "Test Tile Summary",
      "Connectors": [],
      "Categories": [],
      "TileImages": [],
      "Icon": "https://static.adp.cdp-cdn.com/tiles/C42C0224-BCD7-4926-97CD-166A9843901F/1.0/tileicon.png"
  }
}