// Google Earth Engine JavaScript API example.
// Purpose: calculate NDVI for a selected region and estimate vegetation state.

var region = ee.Geometry.Rectangle([36.0, 49.7, 36.5, 50.1]);

var collection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterBounds(region)
    .filterDate('2024-06-01', '2024-08-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var image = collection.median();
var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');

var visualization = {
    min: -1,
    max: 1,
    palette: ['blue', 'white', 'green']
};

Map.centerObject(region, 10);
Map.addLayer(ndvi, visualization, 'NDVI');

var meanNdvi = ndvi.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: region,
    scale: 10,
    maxPixels: 100000000
});

print('Mean NDVI:', meanNdvi);
