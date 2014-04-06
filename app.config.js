window.KitchenSink = $.extend(true, window.KitchenSink, {
  "config": {
    "navigationType": "slideout",
    "commandMapping": {
      "ios-header-toolbar": {
        "commands": [
          {
            "id": "menu-add",
            "location": "menu"
          },
          {
              "id": "menu-edit",
              "location": "menu"
          },
          {
              "id": "menu-remove",
              "location": "menu"
          }
        ]
      },
      "android-header-toolbar": {
        "commands": [
          {
              "id": "menu-add",
              "location": "menu"
          },
          {
              "id": "menu-edit",
              "location": "menu"
          },
          {
              "id": "menu-remove",
              "location": "menu"
          }
        ]
      },
      "win8-phone-appbar": {
        "commands": [
          {
              "id": "menu-add",
              "location": "menu"
          },
          {
              "id": "menu-edit",
              "location": "menu"
          },
          {
              "id": "menu-remove",
              "location": "menu"
          }
        ]
      },
      "tizen-header-toolbar": {
        "commands": [
          {
              "id": "menu-add",
              "location": "menu"
          },
          {
              "id": "menu-edit",
              "location": "menu"
          },
          {
              "id": "menu-remove",
              "location": "menu"
          }
        ]
      },
      "generic-header-toolbar": {
          "commands": [
            {
                "id": "menu-add",
                "location": "menu"
            },
            {
                "id": "menu-edit",
                "location": "menu"
            },
            {
                "id": "menu-remove",
                "location": "menu"
            }
          ]
      }
    },

    "navigation": [
      {
        "title": "Home",
        "action": "#Home",
        "icon": "home"
      },
      {
        "title": "Le mie prenotazioni",
        "action": "#Bookings",
        "icon": "booking"
      },
      {
        "title": "I miei punti Fuel",
        "action": "#fuel",
        "icon": "recharge"
      },
      {
        "title": "Agenda",
        "action": "#Agenda",
        "icon": "agenda"
      },
      {
        "title": "Impostazioni",
        "action": "#Settings",
        "icon": "settings"
      },
      
      {
	"title": "Giulio",
	"action": "#CustomEvents",
	"icon": "settings"
      },
      {
	"title": "Dan",
	"action": "#Details",
	"icon": "settings"
      },
      {
	"title": "Sliders",
	"action": "#Sliders",
	"icon": "settings"
      },
      {
	"title": "TF",
	"action": "#Maps",
	"icon": "settings"
      },
      {
	"title": "Fucker",
	"action": "#EndBooking",
	"icon": "settings"
      },
      
      {
	"title": "GalleryGiulio",
	"action": "#Gallery",
	"icon": "settings"
      },
    ]
  }
});