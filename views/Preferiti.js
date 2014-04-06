//An object passed to the dataSource configuration option of the list
listDataSource = new DevExpress.data.DataSource([]);
 
//Loads json data and passes it to the DataSource

Middle.getProvidersByDistance(45.564, 12.428, function (providers) {
    var pref = Middle.getAllPreferences();
    
    pref.forEach(function(o) {
        pr = providers.filter(function(p) {
            return (p.Id == o.id);
        })[0];
    
        listDataSource.store().insert({
            name: pr.Name,
            location: pr.Location,
            date: o.addDate,
            dateText: o.addDate.toLocaleDateString()
        });
    });  

    listDataSource.sort('date');
    listDataSource.load();
});
