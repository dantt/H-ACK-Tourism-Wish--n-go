var Middle = null;

!(function() {

    var token = undefined;

    function toRad(n) {
        return n * Math.PI / 180; ///
    }

    function getDistance(lat1,lon1,lat2,lon2) {
        var R = 6371; // km
        var dLat = toRad((lat2-lat1));
        var dLon = toRad((lon2-lon1));
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return Math.abs(R * c);
    }

    function getAuth(callback) {
        if (token) {
            callback();
        } else {
            var xhr = new XMLHttpRequest();
            xhr.onload = function (e) {
                if (xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        var response = JSON.parse(xhr.responseText);
                        //console.debug(response);
                        token = response;
                        callback()
                    } else {
                        console.error("XHR Error");
                    }
                }
            };
            xhr.open('POST', 'http://h-ack-wd.azurewebsites.net/Token');
            var par = 'grant_type=password&username=Mario.Abeti@pin.it&password=password123';
            xhr.send(par);
        }
    }

    function getProviders(callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            if (xhr.readyState == 4) {
                if(xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    callback(response);
                } else {
                    console.error("XHR Error");
                }
            }
        };
        xhr.open('GET', 'http://h-ack-wd.azurewebsites.net/api/suppliers');
        xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
        xhr.send();
    }

    function getProvidersByDistance(curLat, curLong, callback) {
        getAuth(function() {
            getProviders(function(arr) {
                arr.forEach(function (v) {
                    v.Distance = getDistance(v.Lat, v.Lng, curLat, curLong);
                });
                var sorted = arr.sort(function(a, b) {
                    return (a.Distance - b.Distance);
                });
                callback(sorted);
            });
        });
    }
    
    
    function addDays(date, days) {
        var dat = new Date(date.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }
    
    function getDatesBetween(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = addDays(currentDate, 1);
        }
        return dateArray;
    }
    
    function formatDate(date) {
        var dat = new Date(date.valueOf());
        var dd = dat.getDate();
        var mm = dat.getMonth()+1; //January is 0!

        var yyyy = dat.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var dat = dd+'/'+mm+'/'+yyyy;
        
        return dat;
    }
    
    function freeRooms(id, fromDate, toDate, callback) {
        var days = getDatesBetween(fromDate, toDate);
        var remaining = days.length;
        var freeMin = Infinity;
    
        function freeLoaded(num) {
            freeMin = Math.min(freeMin, num);
            remaining--;
            if (!remaining) {
                callback(freeMin);
            }
        }
        
        getAuth(function() {
            days.forEach(function (v) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function (e) {
                    if (xhr.readyState == 4) {
                        if(xhr.status == 200) {
                            var response = JSON.parse(xhr.responseText);
                            var free = response.AvailableRooms || 0;
                            freeLoaded(free);
                        } else {
                            console.error("XHR Error");
                        }
                    }
                };
                xhr.open('POST', 'http://h-ack-wd.azurewebsites.net/api/prenotations/isfree');
                xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
                
                var o = {
                    Date: formatDate(v),
                    SupplierId: id
                }
                
                xhr.send(JSON.stringify(o));
            });
        });
    }
    
    function book(type, obj) {
        booked = JSON.parse(localStorage['booked' + type] || '[]');
        booked.push(obj);
        localStorage['booked' + type] = JSON.stringify(booked);
    }
    
    function getAllBooked(type) {
        return JSON.parse(localStorage['booked' + type] || '[]');
    }
    
    function resetBooked(type) {
        delete localStorage['booked' + type];
    }
    
    function setUser(obj) {
        localStorage.localUser = JSON.stringify(obj);
    }
    
    function getUser(obj) {
        return JSON.parse(localStorage.localUser || '{}');
    }

    Middle = {
        getProvidersByDistance: getProvidersByDistance,
        freeRooms: freeRooms,
        book: book,
        getAllBooked: getAllBooked,
        resetBooked: resetBooked,
        setUser: setUser,
        getUser: getUser
    }
    

}());